import React, { useEffect, memo, useMemo } from "react";
import {
  FaFutbol,
  FaTrophy,
  FaShieldAlt,
  FaHeart,
  FaLightbulb,
  FaHandsHelping,
  FaStar,
} from "react-icons/fa";

const About = memo(() => {
  // Optimized scroll to top with cleanup
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Fallback for non-smooth scrolling
      timer = setTimeout(() => {
        if (window.pageYOffset > 0) {
          window.scrollTo(0, 0);
        }
      }, 500);
    } catch (e) {
      window.scrollTo(0, 0);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <BreadcrumbSection />

      <LeagueIntroduction />

      <MissionVisionSection />

      <CoreValuesSection />
    </div>
  );
});

// Extracted components for better performance and readability

const BreadcrumbSection = memo(() => (
  <div
    className="relative py-24 bg-cover bg-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
    }}
  >
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        About NSFL
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span className="text-red-500">About Us</span>
      </div>
    </div>
  </div>
));

const LeagueIntroduction = memo(() => (
  <section className="py-10 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-start">
        <div className="inline-block mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
            Since 2025
          </span>
        </div>
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f013ac] to-pink-800">
            Nepal School Football League
          </span>
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Football has always been a sport that unites communities, fosters
          teamwork, and promotes physical fitness. To further cultivate these
          values among students, we are thrilled to propose the Nepal School
          Football League. This league is designed to bring together schools
          under their unique club names, creating a competitive yet friendly
          environment where young talents can showcase their skills. By adhering
          to professional standards and FIFA rules, this event aims to inspire
          the next generation of footballers while celebrating the spirit of
          sportsmanship.
        </p>
      </div>
    </div>
  </section>
));

const MissionVisionSection = memo(() => (
  <section className="py-20 bg-[url('/image/breadcrum.jpg')] bg-cover bg-fixed relative">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <MissionCard />
        <VisionCard />
      </div>
    </div>
  </section>
));

const MissionCard = memo(() => (
  <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-white/20">
    <div className="flex items-center mb-8">
      <div className="mr-6">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white">
          <FaFutbol className="text-2xl" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
    </div>
    <p className="text-lg text-gray-700 mb-6">
      The Nepal School Football League (NSFL) is dedicated to fostering young
      football talent by providing a competitive and inclusive platform for
      school students across Nepal. Initially organized in the Kathmandu Valley,
      the league will expand nationwide in the coming years, ensuring equal
      opportunities for students from every region to showcase their skills. Our
      mission is to promote grassroots football, encourage sportsmanship, and
      nurture future stars by offering structured league matches where students
      proudly represent their schools. Through professional scouting and
      development programs, we identify exceptional players to join the
      Thunderbolts Development Center, preparing them for national and
      international football careers while instilling discipline, teamwork, and
      a passion for the game.
    </p>
  </div>
));

const VisionCard = memo(() => (
  <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-white/20">
    <div className="flex items-center mb-8">
      <div className="mr-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white">
          <FaTrophy className="text-2xl" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
    </div>
    <p className="text-lg text-gray-700 mb-6">
      Our vision is to revolutionize youth football in Nepal by establishing the
      Nepal School Football League as the nation's premier school-level
      competition. Starting in the Kathmandu Valley, we will gradually expand to
      all provinces, creating a truly national league where young talents from
      every corner of Nepal get equal opportunities to shine. We aim to build a
      sustainable football ecosystem where school players receive top-tier
      training, exposure, and pathways to professional academies. By bridging
      the gap between grassroots and elite football, we aspire to produce future
      national team stars and international players, elevating Nepal's standing
      in global football while promoting education, fitness, and fair play among
      the youth.
    </p>
  </div>
));

const CoreValuesSection = memo(() => {
  const coreValues = useMemo(
    () => [
      {
        title: "Promote Football & Inclusivity",
        description:
          "Encourage widespread participation among youth from diverse backgrounds, fostering a passion for football.",
        icon: <FaShieldAlt className="text-2xl text-red-600" />,
      },
      {
        title: "Nurture Talent & Development:",
        description:
          "Provide opportunities for skill-building, mentorship, and pathways for young players to excel in the sport.",
        icon: <FaHeart className="text-2xl text-red-600" />,
      },
      {
        title: "Foster Character & Teamwork:",
        description:
          "Instill values like discipline, teamwork, resilience, and leadership through sportsmanship.",
        icon: <FaLightbulb className="text-2xl text-red-600" />,
      },
      {
        title: "Enhance Well-being:",
        description:
          "Promote physical fitness and mental health through active participation in football.",
        icon: <FaHandsHelping className="text-2xl text-red-600" />,
      },
      {
        title: "Strengthen Community Spirit: ",
        description:
          "Unite schools and communities while raising the profile of youth football.",
        icon: <FaStar className="text-2xl text-red-600" />,
      },
    ],
    []
  );

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight relative text-center">
            Our Objectives
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((item, index) => (
            <CoreValueCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
});

const CoreValueCard = memo(({ item }: { item: any }) => (
  <div className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden hover:border-transparent hover:-translate-y-1">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-100 to-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mb-6 transition-all duration-500 group-hover:from-pink-500 group-hover:to-pink-600 group-hover:shadow-lg group-hover:-translate-y-1">
        {React.cloneElement(item.icon, {
          className:
            "w-6 h-6 text-pink-600 transition-colors duration-500 group-hover:text-white",
        })}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-gray-800">
        {item.title}
      </h3>
      <p className="text-gray-600 transition-colors duration-500 group-hover:text-gray-700">
        {item.description}
      </p>
    </div>

    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-200/50 pointer-events-none transition-all duration-700"></div>
  </div>
));

export default About;
