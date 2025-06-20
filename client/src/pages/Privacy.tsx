import React from "react";
import {
  FaShieldAlt,
  FaUserShield,
  FaDatabase,
  FaCookieBite,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Privacy = () => {
  return (
    <>
      {/* Hero Section with Breadcrumb */}
      <div
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('/image/parallex.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Privacy Policy
          </h1>
          <div className="flex justify-center items-center text-white/90">
            <span className="hover:text-white transition-colors">Home</span>
            <FiChevronRight className="mx-2" />
            <span className="text-red-400 font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto py-16">
      
            {/* Introduction */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 inline-flex items-center">
                <FaShieldAlt className="text-red-600 mr-4" />
                <span>Introduction</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
                At <span className="font-semibold text-blue-800">NSFL</span>, we
                take your privacy seriously. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our services.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Information Collection */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center text-white shadow-lg mr-4">
                    <FaDatabase className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Information We Collect
                    </h3>
                    <p className="text-gray-500 text-sm">
                      What data we gather and why
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Personal information (name, email, contact details)",
                    "Account credentials",
                    "Usage data and analytics",
                    "Device and browser information",
                    "Location data (when permitted)",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-red-600 rounded-full group-hover:scale-150 transition-transform"></div>
                      </div>
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg mr-4">
                    <FaUserShield className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      How We Use Your Information
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Our responsible data practices
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {[
                    {
                      icon: "🚀",
                      text: "To provide and maintain our services",
                    },
                    { icon: "✨", text: "To improve user experience" },
                    {
                      icon: "✉️",
                      text: "To communicate about updates and news",
                    },
                    {
                      icon: "📊",
                      text: "To analyze usage patterns and optimize",
                    },
                    {
                      icon: "🛡️",
                      text: "To ensure security and prevent fraud",
                    },
                    {
                      icon: "🔍",
                      text: "For internal research and development",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center group">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cookies Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-amber-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center text-white shadow-lg mr-4">
                    <FaCookieBite className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Cookies and Tracking
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Our website tracking policy
                    </p>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-amber-100">
                  <p className="text-gray-700 mb-4">
                    We use cookies and similar tracking technologies to track
                    activity on our website and store certain information. These
                    help us:
                  </p>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white">
                        <span className="text-xs">i</span>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-600">
                      You can instruct your browser to refuse all cookies or to
                      indicate when a cookie is being sent. However, some
                      features may not function properly without cookies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-green-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white shadow-lg mr-4">
                    <FaLock className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Data Security
                    </h3>
                    <p className="text-gray-500 text-sm">
                      How we protect your information
                    </p>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-green-100">
                  <p className="text-gray-700 mb-4">
                    We implement industry-standard security measures including
                    encryption, access controls, and regular security audits to
                    protect your personal information.
                  </p>
                  <p className="text-gray-600">
                    However, please be aware that no method of transmission over
                    the Internet or electronic storage is 100% secure. We cannot
                    guarantee absolute security but we continuously work to
                    maintain the highest standards of protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaShieldAlt className="mr-4" />
                  <span>Contact Us</span>
                </h2>
                <p className="mb-8 text-blue-100">
                  If you have any questions about this Privacy Policy or your
                  data, please reach out to our privacy team:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <a
                    href="mailto:privacy@nsfl.com"
                    className="flex items-center group"
                  >
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-700 transition-colors">
                      <FaEnvelope className="text-blue-200" />
                    </div>
                    <span className="group-hover:text-white transition-colors">
                      privacy@nsfl.com
                    </span>
                  </a>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mr-4">
                      <FaPhone className="text-blue-200" />
                    </div>
                    <span>+977-1-XXXXXXX</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-blue-200" />
                    </div>
                    <span>Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
      </div>
    </>
  );
};

export default Privacy;
