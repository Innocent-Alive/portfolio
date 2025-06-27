import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
  FiCode,
  FiMenu,
  FiLayers,
  FiSend,
} from "react-icons/fi";
import logo from "../assets/logoBlack.png";

const Navbar = () => {
  const navLinks = [
    { id: 1, text: "Home", href: "#", icon: FiHome },
    { id: 2, text: "About", href: "#about", icon: FiUser },
    { id: 3, text: "Experience", href: "#experience", icon: FiBriefcase },
    { id: 4, text: "Skills", href: "#skills", icon: FiCode },
    { id: 5, text: "Projects", href: "#projects", icon: FiLayers },
    { id: 6, text: "Contact", href: "#contact", icon: FiMessageSquare },
  ];

  return (
    <>
      {/* Desktop Navbar - Only show on lg screens and above */}
      <nav className=" fixed w-full bg-background/90 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className="text-2xl font-header outline-none text-primary text-center flex items-center gap-2"
              >
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <span>Abhay Kumar Das</span>
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, -1).map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="flex items-center gap-2 group relative outline-none text-gray-600 hover:text-primary transition-all duration-300"
                >
                  <link.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    {link.text}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                  </span>
                </a>
              ))}
              <a
                href="#contact"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300 font-medium flex items-center gap-2 group"
              >
                <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Hire Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-primary transition-all duration-300"
              >
                <link.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs relative">
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
