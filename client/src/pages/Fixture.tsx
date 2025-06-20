import React, { useState } from "react";
import { FaClock, FaMapMarkerAlt, FaCalendarDay, FaList } from "react-icons/fa";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetMatchesQuery } from "../services/match";
import { useNavigate } from "react-router-dom";
import {
  format,
  isToday as isDateToday,
  parseISO,
  isAfter,
  startOfDay,
  endOfDay,
} from "date-fns";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
import { Match, Team } from "../types/match";

interface EnhancedMatch extends Match {
  matchDate: Date;
  homeTeam: Team & { team_logo: string };
  awayTeam: Team & { team_logo: string };
}

interface MatchCardProps {
  match: EnhancedMatch;
  navigate: ReturnType<typeof useNavigate>;
  isToday: boolean;
}

interface NoMatchesMessageProps {
  activeFilter: "all" | "today" | "upcoming";
}

const Matches = () => {
  const navigate = useNavigate();
  const { data: matchesData, isLoading, isError } = useGetMatchesQuery();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "today" | "upcoming"
  >("all");

  if (isLoading) return <Loader />;
  if (isError || !matchesData?.docs) {
    return <ErrorMessage message="Failed to load matches. Please try again." />;
  }

  // Enhance matches with image URLs and date objects
  const matches = matchesData.docs.map((match) => {
    // Parse the match date and time
    const matchDateTime = parseISO(match.match_date);
    const timeMatch = match.time.match(/(\d+):(\d+)\s*(AM|PM)/i);

    let matchDate = new Date(matchDateTime);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const isPM = timeMatch[3].toUpperCase() === "PM";

      if (isPM && hours < 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;

      matchDate.setHours(hours, minutes, 0, 0);
    }

    return {
      ...match,
      matchDate,
      homeTeam: {
        ...match.homeTeam,
        team_logo: match.homeTeam.team_logo.url
          ? `${BASE_URL}${match.homeTeam.team_logo.url}`
          : "/images/default-logo.png",
      },
      awayTeam: {
        ...match.awayTeam,
        team_logo: match.awayTeam.team_logo.url
          ? `${BASE_URL}${match.awayTeam.team_logo.url}`
          : "/images/default-logo.png",
      },
    } as EnhancedMatch;
  });

  const filterMatches = () => {
    const now = new Date();
    const today = startOfDay(now);
    const tomorrow = endOfDay(now);

    switch (activeFilter) {
      case "today":
        return matches.filter((match) => {
          const matchDate = match.matchDate;
          return (
            matchDate >= today &&
            matchDate <= tomorrow &&
            (match.status === "upcoming" || match.status === "running")
          );
        });

      case "upcoming":
        return matches.filter((match) => {
          const matchDate = match.matchDate;
          return (
            isAfter(matchDate, tomorrow) &&
            (match.status === "upcoming" || match.status === "running")
          );
        });

      case "all":
      default:
        return [...matches]
          .filter((match) => match.status !== "completed")
          .sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime());
    }
  };

  const groupMatchesByWeek = (matches: typeof filteredMatches) => {
    const grouped = matches.reduce((acc, match) => {
      const week = match.week;
      if (!acc[week]) acc[week] = [];
      acc[week].push(match);
      return acc;
    }, {} as Record<number, typeof matches>);

    // Sort weeks in ascending order
    return Object.keys(grouped)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .reduce((acc, week) => {
        acc[parseInt(week)] = grouped[parseInt(week)];
        return acc;
      }, {} as Record<number, typeof matches>);
  };

  const filteredMatches = filterMatches();
  const groupedMatches = groupMatchesByWeek(filteredMatches);

  const isToday = (date: Date) => {
    const today = startOfDay(new Date());
    const matchDate = startOfDay(date);
    return today.getTime() === matchDate.getTime();
  };

  return (
    <>
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NSFL Matches
          </h1>
          <div className="text-white flex justify-center items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-red-500">League Fixtures</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Fixture Schedule
          </h1>
          <div className="flex space-x-2">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              Season {new Date().getFullYear()}
            </span>
            <span className="text-sm bg-blue-50 text-green-800 px-3 py-1 rounded-full font-medium">
              Total Matches:{" "}
              {matches.filter((match) => match.status !== "completed").length}
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaList className="mr-2 inline" />
            All Matches
          </button>
          <button
            onClick={() => setActiveFilter("today")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === "today"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaCalendarDay className="mr-2 inline" />
            Today's Matches
          </button>
          <button
            onClick={() => setActiveFilter("upcoming")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === "upcoming"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaClock className="mr-2 inline" />
            Upcoming
          </button>
        </div>

        {/* Matches List */}
        <div className="space-y-8">
          {Object.keys(groupedMatches).length > 0 ? (
            Object.entries(groupedMatches).map(([week, matches]) => (
              <div key={week} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <h2 className="text-3xl font-bold text-blue-800">
                    Week {week}
                  </h2>
                </div>
                {matches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    navigate={navigate}
                    isToday={isToday(match.matchDate)}
                  />
                ))}
              </div>
            ))
          ) : (
            <NoMatchesMessage activeFilter={activeFilter} />
          )}
        </div>
      </div>
    </>
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ match, navigate, isToday }) => (
  <div
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 overflow-hidden hover:to-[#f013ac] hover:from-[#000000] bg-gradient-to-r hover:text-white"
    onClick={() => navigate(`/fixture/${match.id}`)}
  >
    <div className="p-2">
      {isToday && match.status === "upcoming" && (
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
          Today's Match
        </div>
      )}
      {isToday && match.status === "running" && (
        <div className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
          Live Now
        </div>
      )}

      {!isToday && match.status === "upcoming" && (
        <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
          Upcoming Match
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Home Team */}
        <div className="flex-1 flex flex-col items-center md:items-end mb-4 md:mb-0">
          <div className="flex items-center">
            <img
              src={match.homeTeam.team_logo}
              alt={match.homeTeam.team_name}
              className="w-16 h-16 object-contain mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/default-logo.png";
              }}
            />
            <h3 className="text-xl font-bold text-right">
              {match.homeTeam.team_name}
            </h3>
          </div>
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1" />
            <span>{match.venue}</span>
          </div>
        </div>

        {/* Match Info */}
        <div className="mx-4 text-center py-4 px-6 shadow-lg bg-gray-50 rounded-lg min-w-[180px]">
          {match.status === "completed" ? (
            <>
              <div className="text-3xl font-bold flex items-center justify-center">
                <span className="text-blue-800">{match.scoreHome}</span>
                <span className="mx-2">-</span>
                <span className="text-blue-800">{match.scoreAway}</span>
              </div>
              <div className="text-xs uppercase font-semibold text-red-600 mt-1">
                Completed
              </div>
            </>
          ) : match.status === "running" ? (
            <>
              <div className="text-3xl font-bold flex items-center justify-center">
                <span className="text-blue-800">{match.scoreHome || 0}</span>
                <span className="mx-2">-</span>
                <span className="text-blue-800">{match.scoreAway || 0}</span>
              </div>
              <div className="text-xs uppercase font-semibold text-red-600 mt-1 animate-pulse">
                Live Now
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-blue-800">
                {format(match.matchDate, "hh:mm a")}
              </div>
              <div className="text-xs uppercase font-semibold text-green-600 mt-1">
                {isToday ? "Today" : format(match.matchDate, "dd MMM yyyy")}
              </div>
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 flex flex-col items-center md:items-start mt-4 md:mt-0">
          <div className="flex items-center">
            <h3 className="text-xl font-bold text-left">
              {match.awayTeam.team_name}
            </h3>
            <img
              src={match.awayTeam.team_logo}
              alt={match.awayTeam.team_name}
              className="w-16 h-16 object-contain ml-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/default-logo.png";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NoMatchesMessage: React.FC<NoMatchesMessageProps> = ({
  activeFilter,
}) => (
  <div className="bg-white rounded-xl shadow-md p-8 text-center">
    <p className="text-gray-600">
      No {activeFilter === "all" ? "" : activeFilter} matches found.
    </p>
  </div>
);

export default Matches;
