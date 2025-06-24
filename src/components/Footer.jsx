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
              <motion.li variants={fadeInUp}>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  About
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="#projects"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Projects
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="#blog"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Blog
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
              <motion.li variants={fadeInUp}>
                <a
                  href="mailto:abhay744das@gmail.com"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Email: abhay744das@gmail.com
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="tel:+918169805273"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Phone: +91 8169805273
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="none md:fixed bottom-6 right-6 z-50 p-2 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
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
