import { Link, useParams } from "react-router-dom";
import { useMemo, memo } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetMatchByIdQuery } from "../services/match";
import { format, isToday } from "date-fns";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Memoized player card component to prevent unnecessary re-renders
const PlayerCard = memo(({ player }: { player: any }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-2">
    <div className="flex items-center space-x-3">
      <img
        src={
          player.img?.url
            ? `${BASE_URL}${player.img.url}`
            : "/images/default-player.png"
        }
        alt={player.name}
        className="w-10 h-10 rounded-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/default-player.png";
        }}
      />
      <div className="flex items-start flex-col">
        <h4 className="font-semibold text-gray-800">{player.name}</h4>
        <p className="text-sm text-gray-600">{player.position}</p>
      </div>
    </div>
  </div>
));

const FixtureDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch match data
  const {
    data: match,
    isLoading,
    isError,
  } = useGetMatchByIdQuery(id || "", {
    skip: !id,
  });

  // Parse and memoize match date
  const matchDate = useMemo(() => {
    if (!match) return null;

    try {
      // Parse the date part
      const datePart = match.match_date;
      const timePart = match.time;

      // Parse hours and minutes from time string (e.g., "2:30 PM")
      const timeMatch = timePart.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) {
        throw new Error("Invalid time format");
      }

      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const isPM = timeMatch[3].toUpperCase() === "PM";

      // Convert to 24-hour format
      if (isPM && hours < 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;

      // Create date object
      const dateObj = new Date(datePart);
      dateObj.setHours(hours, minutes, 0, 0);

      // Validate date
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }

      return dateObj;
    } catch (e) {
      console.error("Date parsing error:", e);
      return null;
    }
  }, [match]);

  // Memoize status display to prevent recalculations
  const [statusDisplay, statusClass] = useMemo(() => {
    if (!match || !matchDate) return ["", ""];

    if (isToday(matchDate)) return ["TODAY", "bg-yellow-100 text-yellow-800"];
    if (match.status === "running")
      return ["RUNNING", "bg-red-100 text-red-800"];
    if (match.status === "completed")
      return ["COMPLETED", "bg-green-100 text-green-800"];
    return ["UPCOMING", "bg-blue-100 text-blue-800"];
  }, [match, matchDate]);

  // Memoize team logos
  const [homeLogo, awayLogo] = useMemo(() => {
    if (!match) return ["", ""];
    return [
      match.homeTeam.team_logo?.url
        ? `${BASE_URL}${match.homeTeam.team_logo.url}`
        : "/images/default-logo.png",
      match.awayTeam.team_logo?.url
        ? `${BASE_URL}${match.awayTeam.team_logo.url}`
        : "/images/default-logo.png",
    ];
  }, [match]);

  // Handle loading and error states
  if (!id) {
    return <ErrorMessage message="Match ID is missing" />;
  }

  if (isLoading) return <Loader />;

  if (isError || !match || !matchDate) {
    return <ErrorMessage message="Failed to load match. Please try again." />;
  }

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
            Match Center
          </h1>
          <nav className="text-white flex justify-center items-center space-x-2">
            <span className="text-xl font-semibold text-white">
              {match.homeTeam.team_name}
            </span>
            <span className="text-3xl font-bold text-red-500">VS</span>
            <span className="text-xl font-semibold text-white">
              {match.awayTeam.team_name}
            </span>{" "}
          </nav>
        </div>
      </div>
      {/* Match Details Card */}
      <div className="container mx-auto px-4 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 transition-all duration-300">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <span
              className={`px-5 py-2 rounded-full font-semibold ${statusClass}`}
            >
              {statusDisplay}
            </span>
          </div>

          {/* Match Header - Mobile View */}
          <div className="md:hidden flex justify-between items-center mb-8">
            <div className="text-center w-1/3">
              <img
                src={homeLogo}
                alt={match.homeTeam.team_name}
                className="w-16 h-16 mx-auto object-contain"
                loading="lazy"
              />
              <h3 className="mt-2 font-bold">{match.homeTeam.team_name}</h3>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold flex items-center justify-center">
                <span>{match.scoreHome ?? "-"}</span>
                <span className="mx-2">:</span>
                <span>{match.scoreAway ?? "-"}</span>
              </div>
            </div>

            <div className="text-center w-1/3">
              <img
                src={awayLogo}
                alt={match.awayTeam.team_name}
                className="w-16 h-16 mx-auto object-contain"
                loading="lazy"
              />
              <h3 className="mt-2 font-bold">{match.awayTeam.team_name}</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Home Team - Desktop View */}
            <div className="hidden md:block text-center space-y-6">
              <div className="inline-block p-3 bg-gray-100 rounded-full">
                <img
                  src={homeLogo}
                  alt={match.homeTeam.team_name}
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {match.homeTeam.team_name}
              </h2>

              <div className="max-h-[400px] overflow-y-auto pr-2">
                <h3 className="text-lg font-semibold mb-3 text-left">
                  Players
                </h3>
                {match.homePlayers?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>

            {/* Match Info */}
            <div className="space-y-6 md:border-l md:border-r md:px-6 border-gray-200">
              <div className="space-y-3 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {format(matchDate, "EEEE, MMMM d, yyyy")}
                </div>
                <div className="text-xl md:text-2xl text-gray-600 font-medium">
                  {format(matchDate, "h:mm a")}
                </div>
              </div>

              {/* Score - Desktop View */}
              <div className="hidden md:flex justify-center items-center my-6">
                <div className="text-5xl font-bold">
                  {match.scoreHome ?? "-"}
                </div>
                <div className="text-3xl font-semibold mx-8">-</div>
                <div className="text-5xl font-bold">
                  {match.scoreAway ?? "-"}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-semibold text-gray-800">
                    {match.venue}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">
                    Referee
                  </h3>
                  <p className="text-gray-800">{match.referee}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">
                    Assistants
                  </h3>
                  <p className="text-gray-800">
                    {match.assistantReferee1}, {match.assistantReferee2}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">
                    Fourth Official
                  </h3>
                  <p className="text-gray-800">{match.fourthOfficial}</p>
                </div>
              </div>
            </div>

            {/* Away Team - Desktop View */}
            <div className="hidden md:block text-center space-y-6">
              <div className="inline-block p-3 bg-gray-100 rounded-full">
                <img
                  src={awayLogo}
                  alt={match.awayTeam.team_name}
                  className="w-32 h-32 object-contain"
                  loading="lazy"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {match.awayTeam.team_name}
              </h2>

              <div className="max-h-[400px] overflow-y-auto pr-2">
                <h3 className="text-lg font-semibold mb-3 text-left">
                  Players
                </h3>
                {match.awayPlayers?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Player Lists */}
          <div className="mt-10 md:hidden grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {match.homeTeam.team_name} Players
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {match.homePlayers?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                {match.awayTeam.team_name} Players
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {match.awayPlayers?.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FixtureDetails;
