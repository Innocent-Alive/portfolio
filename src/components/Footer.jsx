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

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.footer
      className="bg-background/5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div className="space-y-4" variants={fadeIn}>
            <motion.h3
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              About Me
            </motion.h3>
            <motion.p className="text-gray-600" variants={fadeInUp}>
              Passionate Full Stack Developer with expertise in building
              scalable and efficient web applications.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={fadeIn}>
            <motion.h3
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              Quick Links
            </motion.h3>
            <motion.ul className="space-y-2" variants={fadeIn}>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="#about"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    About
                  </span>
                </a>
              </motion.li>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="#projects"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Projects
                  </span>
                </a>
              </motion.li>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="#skills"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Skills
                  </span>
                </a>
              </motion.li>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="#contact"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Contact
                  </span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-4" variants={fadeIn}>
            <motion.h3
              className="text-xl font-semibold text-primary mb-4"
              variants={fadeInUp}
            >
              Contact
            </motion.h3>
            <motion.ul className="space-y-2" variants={fadeIn}>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="mailto:abhay744das@gmail.com"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Email: abhay744das@gmail.com
                  </span>
                </a>
              </motion.li>
              <motion.li
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href="tel:+918169805273"
                  className="relative text-gray-600 hover:text-primary transition-all duration-300 group"
                >
                  <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    Phone: +91 8169805273
                  </span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="hidden lg:block lg:fixed bottom-6 right-6 z-50 p-2 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
        title="Scroll to Top"
        variants={fadeInUp}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
