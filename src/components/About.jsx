import {
  FiUser,
  FiDownload,
  FiGlobe,
  FiSmartphone,
  FiServer,
  FiDatabase,
  FiLayers,
  FiCode,
  FiCloud,
  FiCheck,
  FiMapPin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import profileImage from "../assets/abhay.jpg";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

const About = () => (
  <motion.section
    id="about"
    className="py-20 bg-background"
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
  >
    <div className="container mx-auto px-4">
      {/* Section Title */}
      <motion.div className="text-center mb-16" variants={fadeIn}>
        <motion.h2
          className="text-4xl font-header text-primary flex items-center justify-center mb-4 gap-4"
          variants={fadeInUp}
        >
          <FiUser className="w-10 h-10 text-primary" /> About Me
        </motion.h2>
        <motion.p className="text-text max-w-2xl mx-auto" variants={fadeInUp}>
          Get to know me better
        </motion.p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={fadeIn}
      >
        {/* Profile Image */}
        <motion.div className="relative h-[500px] w-full" variants={fadeInUp}>
          <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/5 rounded-xl overflow-hidden">
            <motion.img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover saturate-0"
              variants={fadeInUp}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        </motion.div>

        {/* Profile Content */}
        <motion.div className="space-y-6" variants={fadeIn}>
          <motion.h3
            className="text-3xl font-bold text-primary mb-6"
            variants={fadeInUp}
          >
            Abhay Kumar Das
          </motion.h3>
          <motion.p className="text-xl text-text mb-8" variants={fadeInUp}>
            Full Stack Developer & Tech Enthusiast
          </motion.p>

          {/* Contact Info */}
          <motion.div className="space-y-6 mb-8" variants={fadeIn}>
            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              <FiMapPin className="w-5 h-5 text-primary" />
              <span className="text-text">Mumbai, India</span>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              <FiMail className="w-5 h-5 text-primary" />
              <span className="text-text">abhay744das@gmail.com</span>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              <FiPhone className="w-5 h-5 text-primary" />
              <span className="text-text">+91 8169805273</span>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-text">
              I am a passionate Full Stack Developer with a keen interest in
              creating innovative web applications. With over 5 years of
              experience in the tech industry, I specialize in building scalable
              and maintainable applications using modern technologies.
            </p>

            {/* View Resume Button */}
            <motion.a
              href="/Abhay_Kumar_Das_Resume.pdf"
              download="Abhay_Kumar_Das_Resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px -5px rgba(99, 102, 241, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload className="mr-2" />
              Checkout My Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Services */}
      <motion.div className="mt-10 space-y-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={fadeIn}
        >
          {/* Web Development */}
          <motion.div
            className="bg-white/5 md:p-6 p-2 rounded-xl hover:shadow-lg transition-all duration-300 border border-white/5 hover:border-primary/20"
            whileHover={{ y: -5, scale: 1.02 }}
            variants={fadeInUp}
          >
            <motion.div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <FiGlobe className="text-primary text-xl" />
            </motion.div>
            <motion.h4
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              Web Development
            </motion.h4>
            <motion.ul className="space-y-3 text-text" variants={fadeIn}>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Full-stack web applications with modern frameworks</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Progressive Web Apps (PWAs) & Responsive Design</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Server-side rendering & SEO optimization</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Mobile Development */}
          <motion.div
            className="bg-white/5 md:p-6 p-2 rounded-xl hover:shadow-lg transition-all duration-300 border border-white/5 hover:border-primary/20"
            whileHover={{ y: -5, scale: 1.02 }}
            variants={fadeInUp}
          >
            <motion.div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <FiSmartphone className="text-primary text-xl" />
            </motion.div>
            <motion.h4
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              Mobile Development
            </motion.h4>
            <motion.ul className="space-y-3 text-text" variants={fadeIn}>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Cross-platform apps with React Native</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Native Android development with Kotlin</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Mobile UI/UX design & optimization</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Backend Development */}
          <motion.div
            className="bg-white/5 md:p-6 p-2 rounded-xl hover:shadow-lg transition-all duration-300 border border-white/5 hover:border-primary/20"
            whileHover={{ y: -5, scale: 1.02 }}
            variants={fadeInUp}
          >
            <motion.div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <FiServer className="text-primary text-xl" />
            </motion.div>
            <motion.h4
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              Backend Development
            </motion.h4>
            <motion.ul className="space-y-3 text-text" variants={fadeIn}>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>RESTful & GraphQL API development</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Microservices architecture & Serverless</span>
              </motion.li>
              <motion.li className="flex items-start" variants={fadeInUp}>
                <FiCheck className="text-secondary mt-1 mr-2 flex-shrink-0" />
                <span>Authentication & Authorization systems</span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

export default About;
