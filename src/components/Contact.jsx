import { MdOutlineEmojiEmotions } from "react-icons/md";
import {
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "c6e95106-1ee1-48e9-8b15-646fdb1f4402",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: `Subject: ${formData.subject}\n\n Message: ${formData.message}`,
          from_name: formData.name,
          reply_to: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/Innocent-Alive",
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com/in/abhay744das",
    },
    {
      id: 3,
      name: "Reddit",
      icon: FaReddit,
      url: "https://www.reddit.com/user/Effective-Arrival335/",
    },
    {
      id: 4,
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/abhay744das",
    },
    {
      id: 5,
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/TheInnocentAlive",
    },
    {
      id: 6,
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/abhay744das",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-background/5 to-primary/5"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl flex items-center justify-center gap-4 font-header text-primary mb-4">
            <MdOutlineEmojiEmotions className="w-10 h-10 text-primary" />{" "}
            <span className="hidden sm:inline">Let's</span> Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaEnvelope className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-medium">Email</h4>
                    <p className="text-gray-600">abhay744das@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-medium">Phone</h4>
                    <p className="text-gray-600">+91 8169805273</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-medium">Location</h4>
                    <p className="text-gray-600">
                      Kandivali West, Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Social Links
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-primary hover:text-secondary transition-colors duration-300 group relative"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <link.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-all duration-300 group-hover:scale-110" />
                    <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-gray-600 whitespace-nowrap transition-opacity duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            {/* WhatsApp Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                WhatsApp Me
              </h3>
              <motion.div
                className="flex items-center justify-center gap-4"
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.a
                  href="https://wa.me/918169805273?text=Hi%20Abhay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  className="flex justify-center w-full items-center gap-2 px-8 py-3 text-base font-medium text-white bg-primary hover:bg-secondary transition-all duration-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 5px 15px -5px rgba(99, 102, 241, 0.5)",
                  }}
                  whileTap={{
                    scale: 0.98,
                    boxShadow: "0 2px 5px -2px rgba(99, 102, 241, 0.5)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="hidden sm:inline">Message on WhatsApp</span>
                  <span className="inline sm:hidden">WhatsApp</span>
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 focus:outline-none shadow-sm hover:border-gray-300"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 shadow-sm hover:border-gray-300"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  className="flex justify-end"
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex justify-center w-full items-center gap-2 px-8 py-3 text-base font-medium text-white ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary hover:bg-secondary"
                    } transition-all duration-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 5px 15px -5px rgba(99, 102, 241, 0.5)",
                    }}
                    whileTap={{
                      scale: 0.98,
                      boxShadow: "0 2px 5px -2px rgba(99, 102, 241, 0.5)",
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                        <span>Sending</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center gap-2">
                        <FaCheck className="w-4 h-4 text-white" />
                        <span>Message Sent!</span>
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
