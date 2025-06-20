import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = process.env.YOUTUBE_API_KEY;

// Extract video ID from various YouTube URL formats
export const extractVideoId = (url) => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /^([^"&?\/\s]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
};

export const fetchYouTubeStats = async (videoId) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoId,
        key: API_KEY,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      return null;
    }

    const video = response.data.items[0];
    return {
      views: video.statistics?.viewCount || 0,
      duration: video.contentDetails?.duration || "PT0S",
      publishedDate: video.snippet?.publishedAt || "null",
    };
  } catch (error) {
    console.error("Failed to fetch YouTube data:", error);
    return null;
  }
};

// Convert ISO 8601 duration to readable format
export const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return (
    [
      hours ? `${hours}:` : "",
      `${minutes.toString().padStart(hours ? 2 : 1, "0")}:`,
      seconds.toString().padStart(2, "0"),
    ]
      .join("")
      .replace(/^0+/, "") || "0:00"
  );
};
