import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";

const BASE_URL = "https://raw.githubusercontent.com/MickyMik/ditems-data-craft/main/resume/";

const getCvUrl = () => {
  const isFrench = navigator.language.startsWith("fr");
  return isFrench
    ? `${BASE_URL}CV_METINHOUE_FR.pdf`
    : `${BASE_URL}CV_METINHOUE_EN.pdf`;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Certifications", id: "certifications" },
    { label: "Work", id: "work" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative p-2 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30">
              <img 
                src="/lovable-uploads/daa6a904-2dd3-483e-865a-6cc892381a2c.png" 
                alt="Ditems Logo" 
                className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-6"
              />
            </div>
            <span className="text-2xl font-bold text-primary transition-colors duration-300 group-hover:text-primary/80">
              Ditems
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a href={getCvUrl()} download target="_blank" rel="noopener noreferrer">
            <Button variant="download" size="sm" className="hidden md:flex">
              <Download className="w-4 h-4" />
              Resume
            </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a href={getCvUrl()} download target="_blank" rel="noopener noreferrer">
            <Button variant="download" size="lg">
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
