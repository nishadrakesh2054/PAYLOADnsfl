import React, { useCallback, useMemo } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useGetSponsersQuery } from "../services/sponser";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Sponsors: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const {
    data: sponsorsData,
    isLoading,
    isError,
  } = useGetSponsersQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });

  const handleBecomeSponsor = useCallback(() => {
    navigate("/sponsers");
  }, [navigate]);

  // Memoize sponsors data processing
  const sponsors = useMemo(() => {
    if (!sponsorsData?.docs?.length) return [];

    return sponsorsData.docs.map((sponsor) => ({
      ...sponsor,
      website: sponsor.website || "#",
      logoUrl: sponsor.logo?.url
        ? `${BASE_URL}${sponsor.logo.url}`
        : "/default-sponsor.png",
    }));
  }, [sponsorsData]);

  // Handle image errors
  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = "/default-sponsor.png";
      target.onerror = null; // Prevent infinite loop
    },
    []
  );

  if (isLoading) return <Loader />;

  if (isError || !sponsorsData) {
    return (
      <ErrorMessage message="Failed to load sponsors. Please try again." />
    );
  }

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative">
              VALUABLE SPONSORS
              <div className="absolute -bottom-4 transform w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
            </h2>
            <p className="text-md md:text-md text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-8">
              Join our growing family of sponsors and be part of the future of
              football in Nepal
            </p>
          </div>

          <Button title="Become a Sponsor" onClick={handleBecomeSponsor} />
        </div>

        {/* Sponsors Grid */}
        <div className="bg-white rounded-xl p-8">
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
              {sponsors.map(({ id, name, logoUrl, website }) => (
                <a
                  key={id}
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group"
                >
                  <div className="bg-white shadow-lg p-4 rounded-lg w-full h-32 flex items-center justify-center mb-3">
                    <img
                      src={logoUrl}
                      alt={name}
                      className="max-h-24 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm text-center text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-md font-medium">
              No sponsors available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Sponsors;
