import React, { useState, useRef } from "react";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    phone: "",
    email: "",
    location: "",
    coachLeaderName: "",
    teamPlayersNumber: "",
    agreeToTerms: false,
  });
  
  const [teamImage, setTeamImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    
    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      teamImage: teamImage || null,
    };
    console.log("Form submitted:", submissionData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <>
      {/* breadcrumb */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Team Registration
          </h1>
          <div className="text-white flex justify-center items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span>Register</span>
            <span>/</span>
            <span className="text-pink-700">Team Application</span>
          </div>
        </div>
      </div>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-800 text-white text-center">
              <h2 className="text-2xl font-bold">
                NSFL Team Registration Form
              </h2>
              <small className="text-blue-200">Register your team for Nepal School Football League</small>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Team Name */}
                <div className="md:col-span-2">
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Team Image */}
                <div className="md:col-span-2">
                  <label htmlFor="teamImage" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Logo/Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        id="teamImage"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {teamImage ? "Change Image" : "Upload Image"}
                      </button>
                    </div>
                    {teamImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                        <img 
                          src={teamImage} 
                          alt="Team preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Number of Players */}
                <div>
                  <label htmlFor="teamPlayersNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Players <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="teamPlayersNumber"
                    name="teamPlayersNumber"
                    value={formData.teamPlayersNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  >
                    <option value="">Select Number</option>
                    {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(num => (
                      <option key={num} value={num}>{num} players</option>
                    ))}
                  </select>
                </div>

                {/* Coach/Leader Name */}
                <div>
                  <label htmlFor="coachLeaderName" className="block text-sm font-medium text-gray-700 mb-1">
                    Coach/Leader Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="coachLeaderName"
                    name="coachLeaderName"
                    value={formData.coachLeaderName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location (City/District) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="md:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      />
                    </div>
                    <label
                      htmlFor="agreeToTerms"
                      className="ml-3 block text-sm text-gray-700"
                    >
                      I agree to the terms and conditions and privacy policy *
                    </label>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <Button title="Register Team" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;