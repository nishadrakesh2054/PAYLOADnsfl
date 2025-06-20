import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFutbol, FaUser, FaRegCreditCard } from "react-icons/fa";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetTeamByIdQuery } from "../services/team";
import { MdSportsSoccer, MdEmojiEvents } from "react-icons/md";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { format } from "date-fns";
import { Team } from "../types/team";

const statCards = [
  {
    title: "Appearances",
    key: "appearance",
    icon: FaUser,
    color: "bg-gradient-to-r from-blue-500 to-blue-400",
  },
  {
    title: "Goals",
    key: "goals",
    icon: FaFutbol,
    color: "bg-gradient-to-r from-green-500 to-green-400",
  },
  {
    title: "Cleansheets",
    key: "cleansheet",
    icon: MdEmojiEvents,
    color: "bg-gradient-to-r from-purple-500 to-purple-400",
  },
  {
    title: "Yellow Cards",
    key: "yellowcards",
    icon: FaRegCreditCard,
    color: "bg-gradient-to-r from-yellow-500 to-yellow-400",
  },
  {
    title: "Red Cards",
    key: "redcards",
    icon: FaRegCreditCard,
    color: "bg-gradient-to-r from-red-500 to-red-400",
  },
] as const;

type PlayerStatKey = (typeof statCards)[number]["key"];

const personalInfo = [
  {
    label: "Date of Birth",
    value: (player: any) => format(new Date(player.dateofbirth), " yyyy"),
  },
  {
    label: "Nationality",
    value: (player: any) => player.nationality,
  },
  {
    label: "Position",
    value: (player: any) => player.position,
  },
];

const physicalInfo = [
  {
    label: "Height",
    value: (player: any) =>
      `${player.height?.feet} ft ${player.height?.inches} in`,
  },
  {
    label: "Weight",
    value: (player: any) => player.weight.value,
  },
];

type StatCardProps = {
  title: string;
  value: number | string;
  icon: IconType;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-4 rounded-xl ${color} text-white flex items-center justify-between shadow-lg`}
  >
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <Icon className="w-8 h-8 opacity-80" />
  </motion.div>
);

const PlayerDetails = () => {
  const { teamId, playerId } = useParams<{
    teamId: string;
    playerId: string;
  }>();
  const navigate = useNavigate();

  const {
    data: teamResponse,
    isLoading,
    isError,
  } = useGetTeamByIdQuery(teamId || "", { skip: !teamId });

  const team = teamResponse as Team;
  const player = team?.players?.find((p) => p.id === playerId);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load player details" />;

  if (!team || !player) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Player not found</h1>
          <button
            onClick={() => navigate("/teams")}
            className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg border"
          >
            Back to Teams
          </button>
        </div>
      </div>
    );
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
            Players
          </h1>
          <div className="text-white flex justify-center items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span>Teams</span>
            <span>/</span>
            <span className="text-pink-700">{player.name}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 ">
        <div className="container mx-auto px-4 py-10">
          <button
            onClick={() => navigate(`/teams/${team.id}`)}
            className="flex items-center text-blue-700 hover:text-blue-900 mb-6 shadow-lg rounded-lg px-4 py-2"
          >
            <FaArrowLeft className="mr-2" /> Back to Team
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Player Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-600 p-6 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-40 h-40 rounded-full bg-[#ffffff] p-2 mb-6 md:mb-0 md:mr-8">
                  <img
                    src={`${BASE_URL}/${player.img.url}`}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
                  <div className="flex items-center">
                    <img
                      src={`${BASE_URL}/${team.team_logo.url}`}
                      alt={team.team_name}
                      className="w-8 h-8 mr-2"
                    />
                    <span>{team.team_name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Content */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: NSFL Records */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <MdSportsSoccer className="mr-2 text-blue-700" /> NSFL
                    Records
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {statCards.map((stat) => (
                      <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={player[stat.key as PlayerStatKey]}
                        icon={stat.icon}
                        color={stat.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaUser className="mr-2 text-blue-700" /> Personal Info
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {personalInfo.map((info) => (
                        <div key={info.label}>
                          <h3 className="text-sm font-medium text-gray-500">
                            {info.label}
                          </h3>
                          <p className="text-base text-gray-800 capitalize">
                            {info.value(player)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {physicalInfo.map((info) => (
                        <div key={info.label}>
                          <h3 className="text-sm font-medium text-gray-500">
                            {info.label}
                          </h3>
                          <p className="text-base text-gray-800">
                            {info.value(player)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerDetails;
