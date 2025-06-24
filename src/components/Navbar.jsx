import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
  FiCode,
  FiMenu,
} from "react-icons/fi";

const isActive = (currentPath, linkPath) => {
  return currentPath === linkPath;
};

const Navbar = () => {
  const navLinks = [
    { id: 1, text: "Home", href: "#", icon: FiHome },
    { id: 2, text: "About", href: "#about", icon: FiUser },
    { id: 3, text: "Experience", href: "#experience", icon: FiBriefcase },
    { id: 4, text: "Skills", href: "#skills", icon: FiCode },
    { id: 5, text: "Projects", href: "#projects", icon: FiBriefcase },
    { id: 6, text: "Contact", href: "#contact", icon: FiMessageSquare },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed w-full bg-background/90 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className="text-2xl font-bold text-primary text-center flex items-center gap-2"
              >
                Abhay Kumar Das
              </a>
            </div>

            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-2 group relative ${
                    isActive(window.location.hash, link.href)
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-primary"
                  } transition-all duration-300`}
                >
                  <link.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative">
                    {link.text}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 ${
                        isActive(window.location.hash, link.href)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-md shadow-lg z-50 md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`flex flex-col items-center justify-center ${
                  isActive(window.location.hash, link.href)
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                } transition-all duration-300`}
              >
                <link.icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs relative">
                  {link.text}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 ${
                      isActive(window.location.hash, link.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
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
