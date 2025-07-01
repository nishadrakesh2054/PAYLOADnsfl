import React, { useMemo, useCallback, memo } from "react";
import { useGetPlayersQuery } from "../services/players";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const TopScorer: React.FC = memo(() => {
  const {
    data: playersData,
    isLoading,
    isError,
  } = useGetPlayersQuery(
    { page: 1, limit: 1000 },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    }
  );

  // Memoized data processing
  const topScorers = useMemo(() => {
    if (!playersData?.docs?.length) return [];

    return [...playersData.docs]
      .sort((a, b) => (b.goals || 0) - (a.goals || 0))
      .slice(0, 5)
      .map((player) => ({
        ...player,
        playerImg: player.img?.url
          ? `${BASE_URL}${player.img.url}`
          : "/default-player.png",
        teamLogo: player.team?.team_logo?.url
          ? `${BASE_URL}${player.team.team_logo.url}`
          : "/default-team.png",
      }));
  }, [playersData]);

  // Shared image error handler
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = target.dataset.fallback || "/default-image.png";
      target.onerror = null; // Prevent infinite loop
    },
    []
  );

  if (isLoading) return <Loader />;

  if (isError || !playersData) {
    return (
      <ErrorMessage message="Failed to load top scorers. Please try again." />
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative uppercase">
              Top Scorers
              <div className="absolute -bottom-4 transform w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
            </h2>
            <p className="text-md md:text-md text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-8">
              These names are just getting started.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto  shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-white">
            {/* Simplified Table Header */}
            <thead className="bg-gradient-to-r bg-black shadow-md">
              <tr>
                {[
                  "Rank",
                  "Player",
                  "Team",
                  "Position",
                  "Goals",
                  "Yellow Cards",
                  "Red Cards",
                  "Appearance",
                  "Clean Sheets",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-sm font-semibold tracking-wider text-left uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {topScorers.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No top scorers available.
                  </td>
                </tr>
              ) : (
                topScorers.map((player, index) => (
                  <TableRow
                    key={player.id}
                    player={player}
                    index={index}
                    onImageError={handleImageError}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
});

// Extracted Table Row Component for better performance
const TableRow: React.FC<{
  player: any;
  index: number;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = memo(({ player, index, onImageError }) => {
  const stats = useMemo(
    () => ({
      goals: player.goals ?? 0,
      yellowCards: player.yellowcards ?? 0,
      redCards: player.redcards ?? 0,
      appearance: player.appearance ?? 0,
      cleanSheets: player.cleansheet ?? 0,
    }),
    [player]
  );

  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } hover:bg-blue-50 transition-colors duration-300 shadow-sm border-b border-gray-200`}
    >
      <td className="px-6 py-2 font-semibold text-gray-800">{index + 1}</td>

      <PlayerCell player={player} onImageError={onImageError} />
      <TeamCell player={player} onImageError={onImageError} />

      <td className="px-6  py-2 text-gray-700 font-normal hover:underline text-sm sm:text-base md:text-md break-words  capitalize">
        {player.position || "-"}
      </td>

      <StatCell value={stats.goals} className="text-green-700 font-bold" />
      <StatCell
        value={stats.yellowCards}
        className="text-yellow-600 font-semibold"
      />
      <StatCell value={stats.redCards} className="text-red-600 font-semibold" />
      <StatCell
        value={stats.appearance}
        className="text-gray-800 font-medium"
      />
      <StatCell
        value={stats.cleanSheets}
        className="text-indigo-700 font-semibold"
      />
    </tr>
  );
});

// Player Cell Component
const PlayerCell: React.FC<{
  player: any;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = memo(({ player, onImageError }) => (
  <td className=" py-2 ">
    <Link
      to={`/teams/${player.team?.id}/players/${player.id}`}
      className="flex items-center gap-1"
    >
      <img
        src={player.playerImg}
        alt={player.name}
        data-fallback="/default-player.png"
        className="w-16 h-16  object-contain "
        onError={onImageError}
        loading="lazy"
      />
      <span className="text-gray-700 font-normal hover:underline text-sm sm:text-base md:text-md break-words max-w-[100px] sm:max-w-[160px] md:max-w-[220px] ">
        {player.name}
      </span>
    </Link>
  </td>
));

// Team Cell Component
const TeamCell: React.FC<{
  player: any;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = memo(({ player, onImageError }) => (
  <td className="px-8 py-2 ">
    <div className="flex items-center ">
      <Link
        to={`/teams/${player.team?.id}`}
        className="flex items-center gap-1"
      >
        <img
          src={player.teamLogo}
          alt={player.team?.team_name || "Unknown Team"}
          data-fallback="/default-team.png"
          className="w-12 h-12 object-contain"
          onError={onImageError}
          loading="lazy"
        />
       <span className="text-gray-800 font-normal uppercase hover:underline text-xs sm:text-base md:text-md break-words max-w-[100px] sm:max-w-[160px] md:max-w-[220px] ">
  {player.team?.team_name || "UNKNOWN TEAM"}
</span>

      </Link>
    </div>
  </td>
));

// Stat Cell Component
const StatCell: React.FC<{ value: number | string; className?: string }> = memo(
  ({ value, className = "" }) => (
    <td className={`px-6 py-2 text-center  ${className}`}>{value}</td>
  )
);

export default TopScorer;
