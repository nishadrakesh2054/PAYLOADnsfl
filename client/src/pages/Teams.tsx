import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaUserTie } from "react-icons/fa";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetTeamsQuery } from "../services/team";
import { format } from "date-fns";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Teams: React.FC = () => {
  const navigate = useNavigate();
  const { data: teamsData, isLoading, isError } = useGetTeamsQuery();

  const teams = useMemo(() => teamsData?.docs || [], [teamsData]);

  if (isLoading) return <Loader />;
  if (isError || !teamsData?.docs) {
    return <ErrorMessage message="Failed to load teams. Please try again." />;
  }

  return (
    <>
      <HeaderSection />
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <SectionHeader />
          {/* Teams Grid */}
          {teams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} navigate={navigate} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg py-12">
              No teams available at the moment. Please check back later.
            </div>
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
        NSFL Teams
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span className="text-[#f013ac]">Teams</span>
      </div>
    </div>
  </div>
);

const SectionHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
    <div className="mb-6 md:mb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative  uppercase">
        Explore Teams
        <div className="absolute -bottom-4  transform  w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
      </h2>
      <p className="text-md md:text-md text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-8 ">
        Join our growing family of sponsors and be part of the future of
        football in Nepal
      </p>
    </div>
  </div>
);

const TeamCard = ({ team, navigate }: { team: any; navigate: any }) => (
  <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    {/* Team Header with Gradient */}
    <div className="bg-gradient-to-r from-gray-500 to-gray-900 p-4 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
      <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/20 rounded-full"></div>
      <div className="flex justify-center mb-4 relative z-10">
        <img
          src={
            team.team_logo?.url
              ? `${BASE_URL}${team.team_logo.url}`
              : "/default-sponsor.png"
          }
          alt={team.team_logo?.alt || team.team_name}
          className="w-28 h-28 object-contain drop-shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-bold text-white text-center relative z-10">
        {team.team_name}
      </h2>
    </div>
    {/* Team Details */}
    <div className="p-6">
      <div className="space-y-3">
        {/* Founded */}
        <DetailRow
          icon={<FaCalendarAlt className="text-blue-500 mt-1 flex-shrink-0" />}
          label="Established"
          value={team.foundedYear ? format(new Date(team.foundedYear), "MMMM d, yyyy"): "N/A"
          }
        />
        {/* Stadium */}
        <DetailRow
          icon={<FaHome className="text-blue-500 mt-1 flex-shrink-0" />}
          label="Stadium"
          value={team.stadium || "N/A"}
        />
        {/* Coach */}
        <DetailRow
          icon={<FaUserTie className="text-blue-500 mt-1 flex-shrink-0" />}
          label="Team Manager"
          value={team.team_manager || "N/A"}
        />
      </div>
      {/* Button */}
      <button
        onClick={() => navigate(`/teams/${team.id}`)}
        className="mt-8 w-fit bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-pink-600 text-white py-2 px-6 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center group"
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
);

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start">
    {icon}
    <div className="ml-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-700 font-medium">{value}</p>
    </div>
  </div>
);

export default Teams;
