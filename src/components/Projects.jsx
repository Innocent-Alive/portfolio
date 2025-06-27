import { MdOutlineWorkspaces } from "react-icons/md";
import project1 from "../assets/ecostore.png";
import project2 from "../assets/microsoft.png";
import project3 from "../assets/calculator.png";
const Projects = () => {
  const projects = [
    {
      title: "EcoStore Web App",
      description:
        "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      image: project1,
      link: "https://ecostoreonline.onrender.com/",
    },
    {
      title: "Microsoft Clone",
      description:
        "A modern portfolio website built with React and Tailwind CSS, featuring a responsive design and smooth animations.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: project2,
      link: "https://microsoft-clone-steel-delta.vercel.app/",
    },
    {
      title: "Android Calculator App",
      description:
        "A real-time task management application with drag-and-drop functionality and team collaboration features.",
      tech: ["Java", "Android", "XML"],
      image: project3,
      link: "https://github.com/Innocent-Alive/Android_Calculator",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-header text-primary flex items-center justify-center mb-4 gap-4">
            <MdOutlineWorkspaces className="w-10 h-10 text-primary" />
            <span className="hidden sm:inline">My</span> Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Project Image */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300 saturate-0 group-hover:saturate-100"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200"
                >
                  View Project
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
