import { FiUser } from "react-icons/fi";
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
          className="text-4xl font-bold text-primary flex items-center justify-center mb-4 gap-4"
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-background/5 rounded-xl overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1526925539332-aa3b66e35444?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile"
              className="w-full h-full object-cover "
              variants={fadeInUp}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
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
              <span className="text-primary">📍</span>
              <span className="text-text">Mumbai, India</span>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              <span className="text-primary">📧</span>
              <span className="text-text">abhay744das@gmail.com</span>
            </motion.div>
            <motion.div className="flex items-center gap-4" variants={fadeInUp}>
              <span className="text-primary">📞</span>
              <span className="text-text">+91 8169805273</span>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.p className="text-text mb-8" variants={fadeInUp}>
            I am a passionate Full Stack Developer with a keen interest in
            creating innovative web applications. With over 5 years of
            experience in the tech industry, I specialize in building scalable
            and maintainable applications using modern technologies.
          </motion.p>

          {/* Services */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={fadeIn}
          >
            <motion.div
              className="bg-white/5 p-6 rounded-lg"
              variants={fadeInUp}
            >
              <motion.h4
                className="text-xl font-semibold text-primary mb-4"
                variants={fadeInUp}
              >
                Web Development
              </motion.h4>
              <motion.ul className="space-y-2 text-text" variants={fadeIn}>
                <motion.li variants={fadeInUp}>
                  • Modern web applications using React, Vue, and Angular
                </motion.li>
                <motion.li variants={fadeInUp}>
                  • Responsive design and mobile-first approach
                </motion.li>
                <motion.li variants={fadeInUp}>
                  • Performance optimization and SEO
                </motion.li>
              </motion.ul>
            </motion.div>
            <motion.div
              className="bg-white/5 p-6 rounded-lg"
              variants={fadeInUp}
            >
              <motion.h4
                className="text-xl font-semibold text-primary mb-4"
                variants={fadeInUp}
              >
                Backend Development
              </motion.h4>
              <motion.ul className="space-y-2 text-text" variants={fadeIn}>
                <motion.li variants={fadeInUp}>
                  • RESTful API development
                </motion.li>
                <motion.li variants={fadeInUp}>
                  • Database design and optimization
                </motion.li>
                <motion.li variants={fadeInUp}>
                  • Security implementation
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

export default About;
