import React, { useMemo } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetMatchesQuery } from "../services/match";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Match } from "../types/match";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Define enhanced match type with computed properties
interface EnhancedMatch extends Match {
  matchDate: Date;
  homeTeamLogo: string;
  awayTeamLogo: string;
}

const Results = () => {
  const navigate = useNavigate();
  const { data: matchesData, isLoading, isError } = useGetMatchesQuery();

  const { matchesByWeek, sortedWeeks } = useMemo(() => {
    if (!matchesData?.docs) return { matchesByWeek: {}, sortedWeeks: [] };
    const completedMatches: EnhancedMatch[] = matchesData.docs
      .filter((match) => match.status === "completed")
      .map((match) => {
        let dateObj = new Date(match.match_date);
        if (match.time) {
          const [hours, minutes] = match.time.split(":").map(Number);
          if (!isNaN(hours)) dateObj.setHours(hours);
          if (!isNaN(minutes)) dateObj.setMinutes(minutes);
        }
        return {
          ...match,
          matchDate: dateObj,
          homeTeamLogo: match.homeTeam.team_logo?.url
            ? `${BASE_URL}${match.homeTeam.team_logo.url}`
            : "/images/default-logo.png",
          awayTeamLogo: match.awayTeam.team_logo?.url
            ? `${BASE_URL}${match.awayTeam.team_logo.url}`
            : "/images/default-logo.png",
        };
      })
      .sort((a, b) => b.matchDate.getTime() - a.matchDate.getTime());
    const matchesByWeek = completedMatches.reduce(
      (acc: Record<number, EnhancedMatch[]>, match) => {
        const week = match.week;
        if (!acc[week]) acc[week] = [];
        acc[week].push(match);
        return acc;
      },
      {}
    );
    const sortedWeeks = Object.keys(matchesByWeek)
      .map(Number)
      .sort((a, b) => b - a);
    return { matchesByWeek, sortedWeeks };
  }, [matchesData]);

  if (isLoading) return <Loader />;
  if (isError || !matchesData?.docs) {
    return <ErrorMessage message="Failed to load results. Please try again." />;
  }

  return (
    <>
      <HeaderSection />
      <div className="container mx-auto px-4 py-10">
        <div className="space-y-8">
          {sortedWeeks.length > 0 ? (
            sortedWeeks.map((week) => (
              <WeekSection
                key={week}
                week={week}
                matches={matchesByWeek[week]}
                navigate={navigate}
              />
            ))
          ) : (
            <NoData message="No Completed Match data available" />
          )}
        </div>
      </div>
    </>
  );
};

const HeaderSection = () => (
  <div
    className="relative py-24 bg-cover bg-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
    }}
  >
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Match Results
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span className="text-red-500">Completed Matches</span>
      </div>
    </div>
  </div>
);

const WeekSection = ({
  week,
  matches,
  navigate,
}: {
  week: number;
  matches: EnhancedMatch[];
  navigate: any;
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between pb-2 border-b border-gray-300">
      <h2 className="text-3xl font-bold text-blue-800">Week {week}</h2>
    </div>
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} navigate={navigate} />
      ))}
    </div>
  </div>
);

const MatchCard = ({
  match,
  navigate,
}: {
  match: EnhancedMatch;
  navigate: any;
}) => (
  <div
    className="group relative bg-white rounded-xl shadow-md transition-shadow cursor-pointer border border-gray-100 overflow-hidden bg-gradient-to-r hover:from-black hover:to-[#f013ac] hover:text-white"
    onClick={() => navigate(`/fixture/${match.id}`)}
  >
    <div className="absolute top-1 right-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
      COMPLETED
    </div>
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <TeamInfo
          logo={match.homeTeamLogo}
          name={match.homeTeam.team_name}
          align="end"
        />
        <MatchScore match={match} />
        <TeamInfo
          logo={match.awayTeamLogo}
          name={match.awayTeam.team_name}
          align="start"
        />
      </div>
    </div>
  </div>
);

const TeamInfo = ({
  logo,
  name,
  align,
}: {
  logo: string;
  name: string;
  align: "start" | "end";
}) => (
  <div
    className={`flex-1 flex flex-col items-center md:items-${align} mb-4 md:mb-0`}
  >
    <div className="flex items-center">
      {align === "end" && (
        <img
          src={logo}
          alt={name}
          className="w-16 h-16 object-contain mr-3"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/default-logo.png";
          }}
        />
      )}
      <h3 className="text-xl font-bold group-hover:text-white">{name}</h3>
      {align === "start" && (
        <img
          src={logo}
          alt={name}
          className="w-16 h-16 object-contain ml-3"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/default-logo.png";
          }}
        />
      )}
    </div>
  </div>
);

const MatchScore = ({ match }: { match: EnhancedMatch }) => (
  <div className="mx-4 text-center py-2 px-6 min-w-[180px] shadow bg-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
    <div className="text-3xl font-bold flex items-center justify-center">
      <span className="text-blue-800">{match.scoreHome ?? "-"}</span>
      <span className="mx-2">-</span>
      <span className="text-blue-800">{match.scoreAway ?? "-"}</span>
    </div>
    <div className="mt-2 text-sm text-gray-600">
      {format(match.matchDate, "dd MMM yyyy")}
    </div>
    <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
      <FaMapMarkerAlt className="mr-1" />
      <span>{match.venue}</span>
    </div>
  </div>
);

const NoData = ({ message }: { message: string }) => (
  <div className="text-center text-gray-500 py12 flex flex-col items-center justify-center">
    <p className="text-xl font-semibold text-gray-600">{message}</p>
    <p className="text-sm text-gray-400 mt-1">Please check back later.</p>
  </div>
);

export default Results;
