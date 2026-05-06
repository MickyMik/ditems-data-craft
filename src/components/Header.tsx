import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import useActiveSection from "@/hooks/use-active-section";

const BASE_URL = "https://raw.githubusercontent.com/MickyMik/ditems-data-craft/main/resume/";

const getCvUrl = (lang: string) =>
  lang.startsWith("fr") ? `${BASE_URL}CV_METINHOUE_FR.pdf` : `${BASE_URL}CV_METINHOUE_EN.pdf`;

const NAV_IDS = ["about", "experience", "certifications", "work", "contact"];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language.startsWith("fr") ? "en" : "fr");

  const navItems = [
    { labelKey: "nav.about", id: "about" },
    { labelKey: "nav.experience", id: "experience" },
    { labelKey: "nav.certifications", id: "certifications" },
    { labelKey: "nav.work", id: "work" },
    { labelKey: "nav.contact", id: "contact" },
  ];

  const cvUrl = getCvUrl(i18n.language);
  const currentLang = i18n.language.startsWith("fr") ? "FR" : "EN";
  const otherLang = currentLang === "FR" ? "EN" : "FR";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/85 backdrop-blur-md shadow-card" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative p-2 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/40">
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors border border-border hover:border-primary rounded-md px-2.5 py-1.5"
              aria-label={`Switch to ${otherLang}`}
            >
              {currentLang}
            </button>
            <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
              <Button variant="download" size="sm" className="hidden md:flex">
                <Download className="w-4 h-4" />
                {t("nav.resume")}
              </Button>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/97 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-2xl font-medium transition-colors ${
                  activeSection === item.id ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
            <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
              <Button variant="download" size="lg">
                <Download className="w-5 h-5" />
                {t("nav.resume")}
              </Button>
            </a>
            <button
              onClick={toggleLanguage}
              className="text-base font-semibold text-foreground hover:text-primary transition-colors border border-border rounded-md px-4 py-2"
            >
              {otherLang}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
