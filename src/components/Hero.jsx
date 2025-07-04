import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import heroImage from "../assets/heroImage.png";

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

const Hero = () => {
  return (
    <motion.section
      className="relative h-screen flex items-center justify-center bg-background/5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <motion.div className="relative text-center px-4" variants={fadeIn}>
        <motion.h1
          className="text-5xl md:text-7xl text-primary mb-6 font-header font-light"
          variants={fadeInUp}
        >
          Hi, I'm Abhay Kumar Das
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl text-text mb-8"
          variants={fadeInUp}
        >
          Software Developer & Tech Enthusiast
        </motion.p>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-6" variants={fadeIn}>
          <motion.a
            href="https://github.com/Innocent-Alive"
            className="text-primary hover:text-secondary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub"
          >
            <FaGithub className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/innocent-alive/"
            className="text-primary hover:text-secondary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-8 h-8" />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/TheInnocentAlive"
            className="text-primary hover:text-secondary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Facebook"
          >
            <FaFacebook className="w-8 h-8" />
          </motion.a>
        </motion.div>

        {/* Hire Now Button - Only visible on tablet and mobile */}
        <motion.div className="block lg:hidden mt-16" variants={fadeIn}>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors duration-300 font-medium text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSend className="w-5 h-5" />
            <span>Hire Now</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
