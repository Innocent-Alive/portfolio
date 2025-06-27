import { FiBriefcase } from "react-icons/fi";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: "Inkstall Edutech Pvt. Ltd.",
      position: "Full Stack Developer",
      duration: "2025 - Present",
      location: "Goregaon West, Mumbai, India",
      description:
        "Lead developer in building scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
      highlights: [
        "Developed a real-time analytics dashboard with React and Chart.js",
        "Implemented microservices architecture using Docker and Kubernetes",
        "Optimized application performance by 40% through code optimization and caching strategies",
      ],
    },
    {
      id: 2,
      company: "Shree Kalam Academy",
      position: "Full Stack Developer",
      duration: "2024 - 2025",
      location: "Kandivali West, Mumbai, India",
      description:
        "Worked on developing and maintaining web applications using modern JavaScript frameworks.",
      highlights: [
        "Built a responsive e-commerce platform using React and Redux",
        "Implemented RESTful APIs with Node.js and Express",
        "Created automated testing suites using Jest and Cypress",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-header text-primary flex items-center justify-center gap-4 mb-4">
            <FiBriefcase className="w-10 h-10 text-primary" />{" "}
            <span className="hidden sm:inline">Work</span> Experience
          </h2>
          <p className="text-text max-w-2xl mx-auto">
            A journey of growth and learning through various roles and
            responsibilities
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {exp.position}
                  </h3>
                  <p className="text-text">{exp.company}</p>
                </div>
                <p className="text-text">{exp.duration}</p>
              </div>

              <p className="text-text mb-6">{exp.description}</p>

              <div className="space-y-2">
                {exp.highlights.map((highlight, index) => (
                  <p key={index} className="text-text flex items-center">
                    <span className="text-primary mr-2">•</span>
                    {highlight}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
