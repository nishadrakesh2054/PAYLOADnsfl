import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { useGetTablesQuery } from "../services/table";
import { useGetMatchesQuery } from "../services/match";
import { parseISO, isAfter, format } from "date-fns"; // Added imports

const MatchFixture = () => {
  const navigate = useNavigate();

  const {
    data: tablesData,
    isLoading: isTablesLoading,
    isError: isTablesError,
  } = useGetTablesQuery();
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    isError: isMatchesError,
  } = useGetMatchesQuery();

  if (isTablesLoading || isMatchesLoading) return <Loader />;

  if (
    isTablesError ||
    isMatchesError ||
    !tablesData?.docs ||
    !matchesData?.docs
  ) {
    return <ErrorMessage message="Failed to load data. Please try again." />;
  }

  const tables = tablesData.docs
    .map((table) => ({
      ...table,
      form: table.form
        ?.replace(/'/g, "") // Remove all single quotes
        .split(",") // Split by commas
        .map((f) => f.trim()) // Trim any extra whitespace
        .filter((f) => f.length > 0), // Remove empty strings
    }))
    .sort((a, b) => b.points - a.points)
    .map((table, index) => ({
      ...table,
      position: index + 1, // assign position after sorting
    }));
  // Updated match processing with proper date handling
  const matches = matchesData.docs
    .map((match) => {
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
        matchDate, // Add parsed date object
        homeTeam: {
          ...match.homeTeam,
          team_logo: match.homeTeam.team_logo?.url
            ? `${BASE_URL}/${match.homeTeam.team_logo.url}`
            : "/images/default-logo.png",
        },
        awayTeam: {
          ...match.awayTeam,
          team_logo: match.awayTeam.team_logo.url
            ? `${BASE_URL}/${match.awayTeam.team_logo.url}`
            : "/images/default-logo.png",
        },
      };
    })
    .filter((match) => {
      const now = new Date();
      return (
        (match.status === "upcoming" || match.status === "running") &&
        isAfter(match.matchDate, now) // Use isAfter for reliable comparison
      );
    })
    .sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
    .slice(0, 4);

  const getPositionBadge = (position: number) => {
    if (position === 1)
      return (
        <span className="w-5 h-5 bg-yellow-400 rounded-full  flex items-center justify-center text-white ">
          {position}
        </span>
      );
    if (position <= 3)
      return (
        <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white   ">
          {position}
        </span>
      );
    if (position >= 6)
      return (
        <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white  ">
          {position}
        </span>
      );
    return (
      <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center   ">
        {position}
      </span>
    );
  };

  const renderFormIndicator = (form: string[]) => {
    return (
      <div className="flex space-x-1">
        {form.map((result, i) => (
          <span
            key={i}
            className={`w-5 h-5  flex items-center justify-center text-xs font-bold rounded-full
              ${
                result === "W"
                  ? "bg-green-500 text-white"
                  : result === "D"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
          >
            {result}
          </span>
        ))}
      </div>
    );
  };
  const handleRowClick = (id: string) => {
    navigate(`/teams/${id}`);
  };
  return (
    <>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Points Table */}
            <div className="lg:col-span-2" data-aos="fade-right">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <div className="px-6 py-4 bg-gradient-to-r from-black/100 to-black/80">
                  <h2 className="text-2xl font-bold text-white uppercase">
                    League Standings
                  </h2>
                  <small className="text-blue-100 ">
                    Current season points table
                  </small>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr className="text-left text-sm font-medium text-gray-700">
                        <th className="p-4 w-12">Position</th>
                        <th className="p-4">Team</th>
                        <th className="p-4 text-center w-16">P</th>
                        <th className="p-4 text-center w-16">W</th>
                        <th className="p-4 text-center w-16">D</th>
                        <th className="p-4 text-center w-16">L</th>
                        <th className="p-4 text-center w-16">GF</th>
                        <th className="p-4 text-center w-16">GA</th>
                        <th className="p-4 text-center w-16">GD</th>
                        <th className="p-4 text-center w-20 font-bold">PTS</th>
                        <th className="p-4 text-center w-20">Form</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tables.length > 0 ? (
                        tables.map((team) => (
                          <tr
                            key={team.id}
                            onClick={() => handleRowClick(team.team.id)}
                            className="hover:bg-blue-50 transition-colors"
                            data-aos="fade-up"
                            data-aos-delay={50}
                          >
                            <td className="pl-8 pr-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {getPositionBadge(team.position)}
                                {/* Icons removed */}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={`${BASE_URL}/${team.team.team_logo?.url}`}
                                  alt={team.team.team_name}
                                  className="w-8 h-8 object-contain"
                                />
                                <span className="font-medium text-gray-800 text-xs sm:text-base">
                                  {team.team.team_name}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.played}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.won}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.drawn}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.lost}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.lost}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.lost}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                              {team.lost}
                            </td>
                            <td className="p-4 text-center font-bold text-blue-700">
                              {team.points}
                            </td>
                            <td className="pr-8 pl-4 py-5 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {team.form && renderFormIndicator(team.form)}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={11}
                            className="text-center text-gray-500 py-8"
                          >
                            No league standings available yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Upcoming Matches */}

            <div data-aos="fade-left">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <div className="px-6 py-4 bg-gradient-to-r from-black/100 to-black/80">
                  <h2 className="text-2xl font-bold text-white uppercase">
                    Upcoming Matches
                  </h2>
                  <small className="text-blue-100 ">
                    Current week's fixtures
                  </small>
                </div>

                <div className="divide-y divide-gray-200">
                  {matches.length > 0 ? (
                    matches.map((match, index) => (
                      <div
                        key={match.id}
                        className="p-6 hover:bg-blue-50 transition-colors"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => navigate(`/fixture/${match.id}`)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                          {/* Left Section: Date & Time */}
                          <div className="flex items-center gap-4 text-blue-600 text-sm">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-sm" />
                              <span className="font-medium">
                                {format(match.matchDate, "dd MMM yyyy")}{" "}
                                {/* Shows 19 Jun 2025 */}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaClock className="text-sm" />
                              <span className="font-medium">{match.time}</span>
                            </div>
                          </div>

                          {/* Right Section: Venue & Status */}
                          <div className="flex items-center gap-2 text-blue-600 text-sm">
                            <FaMapMarkerAlt className="text-base" />
                            <span>{match.venue}</span>
                            <span className="text-gray-500 font-medium capitalize">
                              ({match.status})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={match.homeTeam.team_logo}
                              alt={match.homeTeam.team_name}
                              className="w-10 h-10 object-contain"
                            />
                            <span className="font-medium text-gray-800 text-xs sm:text-base">
                              {match.homeTeam.team_name}
                            </span>
                          </div>

                          <span className="text-gray-400 font-bold mx-2">
                            VS
                          </span>
                          <div className="flex items-center gap-3">
                            <img
                              src={match.awayTeam.team_logo}
                              alt={match.awayTeam.team_name}
                              className="w-10 h-10 object-contain"
                            />
                            <span className="font-medium text-gray-800 text-xs sm:text-base">
                              {match.awayTeam.team_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No upcoming matches scheduled.
                    </div>
                  )}
                </div>
                <div className="p-5 text-center border-t border-gray-200">
                  <button
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    onClick={() => navigate("/fixture")}
                  >
                    View All Fixtures <FaChevronRight className="inline ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchFixture;
