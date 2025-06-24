import {
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayout,
  FiServer,
} from "react-icons/fi";

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: FiLayout,
      skills: [
        "React.js",
        "Next.js",
        "Vue.js",
        "Angular",
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Bootstrap",
        "Material-UI",
      ],
    },
    {
      id: 2,
      title: "Backend Development",
      icon: FiServer,
      skills: [
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Flask",
        "Java",
        "Spring Boot",
        "Ruby on Rails",
        "PHP",
        "Laravel",
      ],
    },
    {
      id: 3,
      title: "Databases",
      icon: FiDatabase,
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Firebase",
        "Oracle",
        "SQL Server",
      ],
    },
    {
      id: 4,
      title: "Version Control",
      icon: FiGitBranch,
      skills: ["Git", "GitHub", "GitLab", "Bitbucket"],
    },
    {
      id: 5,
      title: "Tools & Technologies",
      icon: FiCode,
      skills: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "Jenkins",
        "CI/CD",
        "RESTful APIs",
        "GraphQL",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary flex items-center gap-4 justify-center mb-4">
            <FiCode className="w-10 h-10 text-primary" />
            Technical Skills
          </h2>
          <p className="text-text max-w-2xl mx-auto">
            A comprehensive set of technical skills and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white/5 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <category.icon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold text-primary">
                    {category.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
