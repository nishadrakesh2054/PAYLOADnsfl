
import React, { useState, useCallback, memo } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaWhatsapp,
  FaPhoneVolume,
  FaEnvelope,
  FaArrowRight,
  FaYoutube,
  FaTiktok
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCreateContactMutation } from "../services/contact";
import { useCreateSubscribeMutation } from "../services/subscribe";

// Form data interface for type safety
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

const Contact = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreeToTerms: false,
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const [createContact, { isLoading: contactLoading }] = useCreateContactMutation();
  const [createSubscribe, { isLoading: subscribeLoading }] = useCreateSubscribeMutation();

  // Memoized handlers
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : undefined;
      
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createContact(formData).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        agreeToTerms: false,
      });
    } catch (error: any) {
      toast.error(error.data?.message || "Error sending message");
    }
  }, [formData, createContact]);

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createSubscribe({ email: newsletterEmail }).unwrap();
      toast.success("Successfully subscribed to newsletter!");
      setNewsletterEmail("");
    } catch (error: any) {
      toast.error(error.data?.message || "Error subscribing to newsletter");
    }
  }, [newsletterEmail, createSubscribe]);

  return (
    <div>
      <HeroSection />
      
      <ContactCardsSection />
      
      <ContactFormSection 
        formData={formData} 
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={contactLoading}
      />
      
      <NewsletterSection 
        email={newsletterEmail} 
        setEmail={setNewsletterEmail}
        onSubmit={handleNewsletterSubmit}
        isLoading={subscribeLoading}
      />
    </div>
  );
});

// Extracted components
const HeroSection = memo(() => (
  <div 
    className="relative py-24 bg-cover bg-center"
    style={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')"
    }}
  >
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Get in Touch
      </h1>
      <div className="text-white flex justify-center items-center space-x-2">
        <span>Home</span>
        <span>/</span>
        <span className="text-pink-700">Contact Us</span>
      </div>
    </div>
  </div>
));

const ContactCardsSection = memo(() => (
  <section className="relative py-10 bg-gray-50 overflow-hidden">
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-400 to-pink-500 rounded-full filter blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full filter blur-[150px] animate-pulse-slow animation-delay-2000"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <LocationCard />
        <ContactCard />
      </div>
    </div>
  </section>
));

const LocationCard = memo(() => (
  <div className="bg-white rounded-3xl shadow-lg p-10 text-center transition-all duration-500 border border-gray-100 relative overflow-hidden group hover:scale-105 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    <div className="relative z-10">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
        <FaMapMarkerAlt className="text-4xl text-pink-600 group-hover:text-pink-700 transition-colors duration-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
        Our Locations
      </h3>
      <address className="not-italic text-gray-700 space-y-2 text-lg">
        <p className="group-hover:text-gray-900 transition-colors duration-300">
          Dhapakhel
        </p>
        <p className="group-hover:text-gray-900 transition-colors duration-300">
          Lalitpur, Nepal
        </p>
      </address>
      <div className="mt-8">
        <a
          href="#directions"
          className="inline-flex items-center px-6 py-2 bg-gray-700 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-colors duration-300"
        >
          Get Directions
          <FaArrowRight className="ml-2" />
        </a>
      </div>
    </div>
  </div>
));

const ContactCard = memo(() => (
  <div className="bg-white rounded-3xl shadow-lg p-10 text-center transition-all duration-500 border border-gray-100 relative overflow-hidden group hover:scale-105 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    <div className="relative z-10">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
        <FaPhone className="text-4xl text-blue-600 group-hover:text-blue-700 transition-colors duration-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
        Contact Us
      </h3>
      <div className="text-gray-700 space-y-4 text-lg">
        <p>
          <a
            href="tel:+9779801973975"
            className="hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaPhoneVolume className="text-blue-500" />
            +977 9801973975
          </a>
        </p>
        <p>
          <a
            href="mailto:nsfl@footballleague.com"
            className="hover:text-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <FaEnvelope className="text-blue-500" />
            nsfl@footballleague.com
          </a>
        </p>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <SocialIcon href="#" bg="bg-green-100" hoverBg="hover:bg-green-200">
          <FaWhatsapp className="text-2xl text-green-500" />
        </SocialIcon>
        <SocialIcon href="#" bg="bg-pink-100" hoverBg="hover:bg-pink-200">
          <FaInstagram className="text-2xl text-pink-600" />
        </SocialIcon>
        <SocialIcon href="#" bg="bg-black" hoverBg="hover:bg-gray-800">
          <FaTiktok className="text-2xl text-white" />
        </SocialIcon>
        <SocialIcon href="#" bg="bg-pink-100" hoverBg="hover:bg-red-200">
          <FaYoutube className="text-2xl text-red-600" />
        </SocialIcon>
      </div>
    </div>
  </div>
));

const SocialIcon: React.FC<{ 
  href: string; 
  bg: string; 
  hoverBg: string; 
  children: React.ReactNode;
}> = memo(({ href, bg, hoverBg, children }) => (
  <a
    href={href}
    className={`p-3 ${bg} rounded-full ${hoverBg} transition-colors duration-300`}
  >
    {children}
  </a>
));

const ContactFormSection: React.FC<{
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}> = memo(({ formData, onChange, onSubmit, isLoading }) => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Have questions? Fill out the form below and we'll get back
                to you within 24 hours.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  placeholder="Your name"
                  type="text"
                />
                <FormField
                  id="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  placeholder="your@email.com"
                  type="email"
                />
              </div>

              <FormField
                id="phone"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="Phone Number"
                type="text"
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={onChange}
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend className="mr-3 text-lg" />
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-8">
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132873!2d-73.9878449242395!3d40.74844097138996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623251157714!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              className="filter grayscale-20 hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
));

const FormField: React.FC<{
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}> = memo(({ 
  id, 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  required = false 
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
      placeholder={placeholder}
    />
  </div>
));

const NewsletterSection: React.FC<{
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}> = memo(({ email, setEmail, onSubmit, isLoading }) => (
  <section className="relative py-10 bg-gradient-to-r from-gray-700 to-gray-500 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-30 bg-[url('/image/parallex.jpg')] bg-cover bg-center"></div>
    <div className="relative z-10 container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-wide">
          Stay Updated with NSFL
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Subscribe to our newsletter for{" "}
          <span className="text-white font-medium">exclusive updates</span>,
          ticket pre-sales, and behind-the-scenes content.
        </p>

        <form
          onSubmit={onSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow px-6 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/20 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 italic">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  </section>
));

export default Contact;