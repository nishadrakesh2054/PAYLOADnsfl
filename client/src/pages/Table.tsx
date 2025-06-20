import React, { useMemo } from "react";
import { FaCrown, FaMedal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useGetTablesQuery } from "../services/table";

const Table = () => {
  const navigate = useNavigate();
  const { data: tablesData, isLoading, isError } = useGetTablesQuery();

  const tables = useMemo(() => {
    if (!tablesData?.docs) return [];
    return tablesData.docs
      .map((table) => ({
        ...table,
        form: table.form
          ?.replace(/'/g, "")
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
      }))
      .sort((a, b) => b.points - a.points)
      .map((table, index) => ({
        ...table,
        position: index + 1,
      }));
  }, [tablesData]);

  if (isLoading) return <Loader />;
  if (isError || !tablesData?.docs) {
    return <ErrorMessage message="Failed to load tables. Please try again." />;
  }

  const handleRowClick = (id: string) => {
    navigate(`/teams/${id}`);
  };

  return (
    <>
      <HeaderSection />
      <div className="container mx-auto px-4 py-10">
        <SectionHeader />
        <div className="container mx-auto px-4 pb-10 ">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <LeagueTable tables={tables} handleRowClick={handleRowClick} />
            </div>
          </div>
        </div>
        <FormGuide />
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
        NSFL League Standings
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span className="text-red-500">League Table</span>
      </div>
    </div>
  </div>
);

const SectionHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative uppercase">
      League Table
      <div className="absolute -bottom-4  transform  w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
    </h2>
    <div className="flex space-x-2 mt-8 sm:pt-0">
      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
        Season 2025
      </span>
      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
        Matchday 14
      </span>
    </div>
  </div>
);

const LeagueTable = ({
  tables,
  handleRowClick,
}: {
  tables: any[];
  handleRowClick: (id: string) => void;
}) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-black">
      <tr>
        <th className="pl-8 pr-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">
          Position
        </th>
        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-white">
          Team
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Played
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Won
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Drawn
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Lost
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          GF
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          GA
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          GD
        </th>
        <th className="px-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Points
        </th>
        <th className="pr-8 pl-4 py-4 text-center text-xs font-medium uppercase tracking-wider text-white">
          Form
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {tables.length > 0 ? (
        tables.map((team) => (
          <TableRow key={team.id} team={team} handleRowClick={handleRowClick} />
        ))
      ) : (
        <tr>
          <td colSpan={11} className="text-center text-gray-500 py-8">
            No league standings available yet.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

const TableRow = ({
  team,
  handleRowClick,
}: {
  team: any;
  handleRowClick: (id: string) => void;
}) => (
  <tr
    onClick={() => handleRowClick(team.team.id)}
    className="transition-all duration-150 cursor-pointer hover:bg-blue-50/60 active:bg-blue-100/30"
  >
    <td className="pl-8 pr-6 py-5 whitespace-nowrap">
      <div className="flex items-center gap-2">
        {getPositionBadge(team.position)}
        {team.position === 1 && (
          <FaCrown className="text-yellow-400/90 text-lg" />
        )}
        {team.position === 2 && <FaMedal className="text-gray-300 text-lg" />}
        {team.position === 3 && (
          <FaMedal className="text-amber-600/90 text-lg" />
        )}
      </div>
    </td>
    <td className="px-6 py-5 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <img
          src={
            team.team?.team_logo?.url
              ? `${BASE_URL}${team.team.team_logo.url}`
              : "/default-team.png"
          }
          alt={team.team?.team_name || "Unknown Team"}
          className="w-12 h-12 rounded-full object-contain border border-gray-200 bg-white p-0.5"
        />
        <span className="font-medium text-gray-800 text-xs sm:text-base">
          {team.team.team_name}
        </span>
      </div>
    </td>
    <td className="px-4 py-5 text-center text-gray-600">{team.played}</td>
    <td className="px-4 py-5 text-center font-semibold text-gray-900">
      {team.won}
    </td>
    <td className="px-4 py-5 text-center text-gray-600">{team.drawn}</td>
    <td className="px-4 py-5 text-center text-gray-600">{team.lost}</td>
    <td className="px-4 py-5 text-center font-semibold text-gray-900">
      {team.goalsFor}
    </td>
    <td className="px-4 py-5 text-center text-gray-600">{team.goalsAgainst}</td>
    <td className="px-4 py-5 text-center font-semibold">
      <span
        className={`inline-flex items-center justify-center w-12 px-2 py-1 rounded-full text-sm ${
          team.goalDifference >= 0
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {team.goalDifference >= 0
          ? `+${team.goalDifference}`
          : team.goalDifference}
      </span>
    </td>
    <td className="px-4 py-5 text-center">
      <span className="font-bold text-gray-900 bg-blue-100/60 px-3 py-1.5 rounded-lg">
        {team.points}
      </span>
    </td>
    <td className="pr-8 pl-4 py-5 text-center">
      <div className="flex items-center justify-center gap-1">
        {team.form && renderFormIndicator(team.form)}
      </div>
    </td>
  </tr>
);

function getPositionBadge(position: number) {
  if (position === 1)
    return (
      <span className="w-6 h-6 bg-yellow-400 rounded-full  flex items-center justify-center text-white font-bold">
        {position}
      </span>
    );
  if (position <= 3)
    return (
      <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {position}
      </span>
    );
  if (position >= 6)
    return (
      <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
        {position}
      </span>
    );
  return (
    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center font-bold">
      {position}
    </span>
  );
}

function renderFormIndicator(form: string[]) {
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
}

const FormGuide = () => (
  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
    <h3 className="font-semibold text-gray-800 mb-3">Form Guide</h3>
    <div className="flex space-x-6">
      <div className="flex items-center">
        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
        <span className="text-sm">Win</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
        <span className="text-sm">Draw</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
        <span className="text-sm">Loss</span>
      </div>
    </div>
  </div>
);

export default Table;
