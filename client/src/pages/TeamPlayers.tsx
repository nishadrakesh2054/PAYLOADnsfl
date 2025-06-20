import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { parseISO, format, isToday } from "date-fns";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetTeamByIdQuery } from "../services/team";
import { useGetMatchesQuery } from "../services/match";
import { Team } from "../types/team";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const positionOrder = ["goalkeeper", "defender", "midfielder", "forward"];

const TeamPlayers = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"squad" | "matches">("squad");

  // Fetch team data
  const {
    data: teamResponse,
    isLoading: isTeamLoading,
    isError: isTeamError,
  } = useGetTeamByIdQuery(id || "", { skip: !id });

  const {
    data: matchesResponse,
    isLoading: isMatchesLoading,
    isError: isMatchesError,
  } = useGetMatchesQuery();

  const team = teamResponse as Team;
  const players = useMemo(() => team?.players || [], [team]);
  const groupedPlayers = useMemo(
    () =>
      positionOrder.map((position) => ({
        position,
        players: players.filter((player) => player.position === position),
      })),
    [players]
  );

  const matches = matchesResponse?.docs || [];
  const teamMatches = useMemo(
    () =>
      matches.filter(
        (match) =>
          match.homeTeam.id === team?.id || match.awayTeam.id === team?.id
      ),
    [matches, team]
  );

  if (isTeamLoading || isMatchesLoading) return <Loader />;
  if (isTeamError || !team) {
    return <ErrorMessage message="Failed to load team. Please try again." />;
  }

  return (
    <>
      <Header team={team} />
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <button
                onClick={() => navigate("/teams")}
                className="mr-4 text-blue-700 hover:text-blue-900 sm:block hidden"
              >
                <FaArrowLeft size={20} />
              </button>
              <div className="flex items-center">
                <img
                  src={
                    team.team_logo.url
                      ? `${BASE_URL}/${team.team_logo.url}`
                      : "/default-team.png"
                  }
                  alt={`${team.team_name} logo`}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {team.team_name}
                  </h1>
                  <p>{team.team_details}</p>
                  <p className="text-gray-600">Stadium: {team.stadium}</p>
                  {team.foundedYear && (
                    <p className="text-gray-600">
                      Established: {format(new Date(team.foundedYear), " yyyy")}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-black px-3 py-1 rounded-full shadow-sm inline-flex items-center whitespace-nowrap">
              <p className="text-gray-50 text-sm font-medium">
                {activeTab === "squad"
                  ? `${players.length} Players`
                  : `${teamMatches.length} Matches`}
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "squad" ? (
            players.length === 0 ? (
              <NoData />
            ) : (
              <div className="rounded-xl space-y-8">
                {groupedPlayers.map(
                  (group) =>
                    group.players.length > 0 && (
                      <PlayerGroup
                        key={group.position}
                        group={group}
                        teamId={team.id}
                        navigate={navigate}
                      />
                    )
                )}
              </div>
            )
          ) : teamMatches.length === 0 ? (
            <NoData />
          ) : (
            <MatchesTable
              teamMatches={teamMatches}
              team={team}
              navigate={navigate}
            />
          )}
        </div>
      </div>
    </>
  );
};

const Header = ({ team }: { team: Team }) => (
  <div
    className="relative py-24 bg-cover bg-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
    }}
  >
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {team.team_name}
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span>Teams</span>
        <span>/</span>
        <span className="text-pink-600">{team.team_name}</span>
      </div>
    </div>
  </div>
);

const TabButtons = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: "squad" | "matches";
  setActiveTab: (tab: "squad" | "matches") => void;
}) => (
  <div className="flex mb-6 border-b border-gray-200">
    <button
      className={`py-2 px-4 font-medium uppercase ${
        activeTab === "squad"
          ? "text-pink-700 border-b-2 border-pink-700"
          : "text-gray-500 hover:text-gray-700 "
      }`}
      onClick={() => setActiveTab("squad")}
    >
      Squad
    </button>
    <button
      className={`py-2 px-4 font-medium uppercase ${
        activeTab === "matches"
          ? "text-pink-700 border-b-2 border-pink-700 "
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setActiveTab("matches")}
    >
      Matches
    </button>
  </div>
);

const NoData = () => (
  <div className="text-center text-gray-500 py12 flex flex-col items-center justify-center">
    <p className="text-xl font-semibold text-gray-600">No data available</p>
    <p className="text-sm text-gray-400 mt-1">Please check back later.</p>
  </div>
);

const PlayerGroup = ({
  group,
  teamId,
  navigate,
}: {
  group: { position: string; players: any[] };
  teamId: string;
  navigate: any;
}) => (
  <div>
    <h2 className="text-2xl font-bold text-black mb-4">{group.position}s</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {group.players.map((player) => (
        <div
          key={player.id}
          className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            {/* Player Image */}
            <div className="relative mb-4">
              <img
                src={
                  player.img.url
                    ? `${BASE_URL}/${player.img.url}`
                    : "/default-player.png"
                }
                alt={player.name}
                className="w-full h-52 object-cover rounded-lg"
              />
            </div>
            {/* Player Details */}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">{player.name}</h3>
            </div>
            {/* View Details Button */}
            <button
              onClick={() => navigate(`/teams/${teamId}/players/${player.id}`)}
              className="mt-2 w-fit bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-pink-600 text-white py-1 px-6 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center group"
            >
              <span>View Details</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MatchesTable = ({
  teamMatches,
  team,
  navigate,
}: {
  teamMatches: any[];
  team: Team;
  navigate: any;
}) => (
  <div className="bg-black rounded-xl shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Match
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Venue
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teamMatches
            .sort((a, b) => {
              const dateA = new Date(`${a.match_date} ${a.time}`);
              const dateB = new Date(`${b.match_date} ${b.time}`);
              const isTodayA = isToday(dateA);
              const isTodayB = isToday(dateB);
              if (isTodayA && !isTodayB) return -1;
              if (!isTodayA && isTodayB) return 1;
              return dateB.getTime() - dateA.getTime();
            })
            .map((match) => (
              <MatchRow
                key={match.id}
                match={match}
                team={team}
                navigate={navigate}
              />
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MatchRow = ({
  match,
  team,
  navigate,
}: {
  match: any;
  team: Team;
  navigate: any;
}) => {
  const isTeamHome = match.homeTeam.id === team.id;
  const homeTeam = isTeamHome ? match.homeTeam : match.awayTeam;
  const awayTeam = isTeamHome ? match.awayTeam : match.homeTeam;
  const scoreHome = isTeamHome ? match.scoreHome : match.scoreAway;
  const scoreAway = isTeamHome ? match.scoreAway : match.scoreHome;
  const matchDate = new Date(`${match.match_date} ${match.time}`);
  const now = new Date();
  const isTodayMatch = isToday(matchDate);

  const getStatusBadge = (status: string) => {
    if (isTodayMatch && status === "upcoming") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Today's Match
        </span>
      );
    }
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "running":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 animate-pulse">
            Live
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            Upcoming
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <tr className={`hover:bg-gray-50 ${isTodayMatch ? "bg-yellow-50" : ""}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <FaCalendarAlt
            className={`mr-2 ${
              isTodayMatch ? "text-yellow-500" : "text-gray-400"
            }`}
          />
          <div>
            <div
              className={`font-medium ${isTodayMatch ? "text-yellow-700" : ""}`}
            >
              {isTodayMatch
                ? "Today"
                : match.match_date
                ? format(parseISO(match.match_date.trim()), "MMMM d, yyyy")
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500">{match.time}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <img
              onClick={() => navigate(`/teams/${homeTeam.id}`)}
              src={
                homeTeam?.team_logo.url
                  ? `${BASE_URL}/${homeTeam.team_logo.url}`
                  : "/default-team.png"
              }
              alt={homeTeam?.team_name}
              className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-600">VS</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <img
              onClick={() => navigate(`/teams/${awayTeam.id}`)}
              src={
                awayTeam?.team_logo.url
                  ? `${BASE_URL}/${awayTeam.team_logo.url}`
                  : "/default-team.png"
              }
              alt={awayTeam?.team_name}
              className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
            <small className="text-sm font-medium mt-1">
              {awayTeam?.team_name}
            </small>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          {match.venue}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(match.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {match.status === "completed" ? (
          <div className="flex flex-col">
            <span className="font-semibold text-green-700">
              {scoreHome} - {scoreAway}
            </span>
            <span className="text-xs text-gray-500">{match.status}</span>
          </div>
        ) : match.status === "running" ? (
          <span className="text-red-600 font-semibold animate-pulse">Live</span>
        ) : (
          <span className="text-gray-500">
            {matchDate > now ? "Not Started" : "Pending"}
          </span>
        )}
      </td>
    </tr>
  );
};

export default TeamPlayers;
