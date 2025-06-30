import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useGetMatchesQuery } from "../services/match";
import { useNavigate } from "react-router-dom";
import { format, isToday, isAfter, parseISO } from "date-fns";
import { Match } from "../types/match";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Helper to parse time strings (supports 12h and 24h formats)
const parseTimeString = (timeStr: string): { hours: number; minutes: number } => {
  timeStr = timeStr.trim().toUpperCase();
  
  // Try 12-hour format (e.g., "5:00 PM")
  let match12 = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
  if (match12) {
    let hours = parseInt(match12[1]);
    const minutes = parseInt(match12[2]);
    const period = match12[3] || '';

    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return { hours, minutes };
  }
  
  // Try 24-hour format (e.g., "17:00")
  let match24 = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (match24) {
    return {
      hours: parseInt(match24[1]),
      minutes: parseInt(match24[2])
    };
  }
  
  throw new Error(`Invalid time format: ${timeStr}`);
};

const TeamFixture = () => {
  const navigate = useNavigate();
  const { data: matchesData, isLoading, isError } = useGetMatchesQuery();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  type ProcessedMatch = Omit<Match, "homeTeam" | "awayTeam" | "matchDate"> & {
    matchDate: Date;
    homeTeam: Omit<Match["homeTeam"], "team_logo"> & { team_logo: string };
    awayTeam: Omit<Match["awayTeam"], "team_logo"> & { team_logo: string };
  };

  let matches: ProcessedMatch[] = [];
  let currentMatch: ProcessedMatch | null = null;
  let upcomingMatch: ProcessedMatch | null = null;

  if (matchesData?.docs) {
    matches = matchesData.docs
      .map((match: any) => {
        try {
          // Get date components from UTC date (year/month/day only)
          const utcDate = new Date(match.match_date);
          const year = utcDate.getUTCFullYear();
          const month = utcDate.getUTCMonth();
          const day = utcDate.getUTCDate();
          
          // Parse time string to local hours/minutes
          const { hours, minutes } = parseTimeString(match.time);
          
          // Create LOCAL datetime (combines UTC date with local time)
          const matchDateLocal = new Date(year, month, day, hours, minutes);
          
          return {
            ...match,
            matchDate: matchDateLocal,
            homeTeam: {
              ...match.homeTeam,
              team_logo: match.homeTeam.team_logo?.url
                ? `${BASE_URL}/${match.homeTeam.team_logo.url}`
                : "/images/default-logo.png",
            },
            awayTeam: {
              ...match.awayTeam,
              team_logo: match.awayTeam.team_logo?.url
                ? `${BASE_URL}/${match.awayTeam.team_logo.url}`
                : "/images/default-logo.png",
            },
          };
        } catch (error) {
          console.error(`Error processing match ${match.id}:`, error);
          return null;
        }
      })
      .filter((match): match is ProcessedMatch => match !== null)
      .filter((match: ProcessedMatch) => match.status !== "completed")
      .sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime());

    const now = new Date();
    
    // Find currently running match
    currentMatch = matches.find(m => m.status === "running") || null;
    
    // If no live match, find next upcoming match
    if (!currentMatch) {
      currentMatch = matches.find(m => m.matchDate && isAfter(m.matchDate, now)) || null;
    }
    
    // Set upcoming match (next after current)
    if (currentMatch) {
      const currentIndex = matches.findIndex(m => m.id === currentMatch!.id);
      upcomingMatch = matches[currentIndex + 1] || null;
    } else {
      upcomingMatch = matches[0] || null;
    }
  }

  // Countdown effect
  useEffect(() => {
    if (!upcomingMatch) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const matchTime = upcomingMatch.matchDate;
      const distance = matchTime.getTime() - now.getTime();

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // You might want to refetch matches here
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingMatch]);

  if (isLoading) return <Loader />;
  if (isError || !matchesData?.docs)
    return <ErrorMessage message="Error fetching matches" />;

  const getMatchStatusLabel = (match: ProcessedMatch) => {
    if (!match.matchDate) return "UPCOMING MATCH";
    if (match.status === "running") return "LIVE NOW";
    if (isToday(match.matchDate)) return "TODAY'S MATCH";
    return "UPCOMING MATCH";
  };


  return (
    <div className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left: Current Match Card */}
          <div className="w-full lg:w-1/2 bg-black/80 rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 min-h-[300px] flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-center text-gray-100 font-semibold mb-6 uppercase tracking-wider">
                {currentMatch
                  ? getMatchStatusLabel(currentMatch)
                  : "No Current Match"}
              </h3>

              {currentMatch ? (
                <>
                  <div className="flex justify-center mb-6">
                    <div
                      className={`rounded-full py-1 px-6 shadow-lg ${
                        currentMatch.status === "running"
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-white text-black"
                      }`}
                    >
                      <span className="text-lg font-semibold uppercase tracking-wide">
                        {currentMatch.matchDate
                          ? format(
                              currentMatch.matchDate,
                              "MM/dd/yyyy - hh:mm a"
                            )
                          : "TBD"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-white rounded-full p-2 flex items-center justify-center">
                        <img
                          src={currentMatch.homeTeam.team_logo}
                          alt={currentMatch.homeTeam.team_name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/default-logo.png";
                          }}
                        />
                      </div>
                      <span className="mt-3 font-bold text-gray-50 text-lg">
                        {currentMatch.homeTeam.team_name}
                      </span>
                      {currentMatch.status === "running" && (
                        <span className="text-2xl font-bold text-red-500">
                          {currentMatch.scoreHome ?? 0}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-center mx-4">
                      <div
                        className={`rounded-full w-10 h-10 flex items-center justify-center shadow-lg ${
                          currentMatch.status === "running"
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-[#f013ac] text-white"
                        }`}
                      >
                        <span className="text-sm font-semibold">VS</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-white rounded-full p-2 flex items-center justify-center">
                        <img
                          src={currentMatch.awayTeam.team_logo}
                          alt={currentMatch.awayTeam.team_name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/default-logo.png";
                          }}
                        />
                      </div>
                      <span className="mt-3 font-bold text-gray-50 text-lg">
                        {currentMatch.awayTeam.team_name}
                      </span>
                      {currentMatch.status === "running" && (
                        <span className="text-2xl font-bold text-red-500">
                          {currentMatch.scoreAway ?? 0}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-300">
                  No current match available
                </p>
              )}
            </div>
          </div>

          {/* Right: Next Match Countdown Card */}
          <div className="w-full lg:w-1/2 rounded-xl shadow-xl overflow-hidden relative min-h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
              style={{ backgroundImage: "url('/image/stadium.png')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/10"></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              {upcomingMatch ? (
                <>
                  <div>
                    <p className="text-blue-200 text-sm text-center">
                      Next Match Countdown
                    </p>
                    <p className="text-xl sm:text-3xl md:text-xl font-extrabold tracking-wide text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg mb-4">
                      {upcomingMatch.homeTeam.team_name}
                      <span className="mx-2 text-white">vs</span>
                      {upcomingMatch.awayTeam.team_name}
                    </p>
                    <p className="text-center text-white font-medium">
                      {upcomingMatch.matchDate
                        ? format(upcomingMatch.matchDate, "EEEE, MMMM do yyyy")
                        : "TBD"}
                    </p>
                  </div>

                  <div className="mt-6">
                    <ul className="flex justify-between max-w-md mx-auto">
                      {[
                        { value: countdown.days, label: "Days" },
                        { value: countdown.hours, label: "Hours" },
                        { value: countdown.minutes, label: "Minutes" },
                        { value: countdown.seconds, label: "Seconds" },
                      ].map((item, index) => (
                        <li key={index} className="flex flex-col items-center">
                          <div className="bg-white/20 backdrop-blur-md rounded-lg w-16 h-16 flex items-center justify-center mb-1">
                            <span className="block text-2xl font-bold text-white">
                              {item.value.toString().padStart(2, "0")}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-blue-100">
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-white font-medium">
                      Kickoff at:{" "}
                      <span className="text-blue-200">
                        {upcomingMatch.matchDate
                          ? format(upcomingMatch.matchDate, "hh:mm a")
                          : "TBD"}
                      </span>
                    </p>
                    <p className="text-sm text-blue-100 mt-2">
                      {upcomingMatch.venue}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-white text-xl mb-2">No upcoming matches</p>
                  <p className="text-blue-200">
                    Check back later for schedule updates
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFixture;
