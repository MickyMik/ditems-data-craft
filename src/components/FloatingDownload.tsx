import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";

const BASE_URL = "https://raw.githubusercontent.com/MickyMik/ditems-data-craft/main/resume/";

const getCvUrl = () => {
  const isFrench = navigator.language.startsWith("fr");
  return isFrench
    ? `${BASE_URL}CV_METINHOUE_FR.pdf`
    : `${BASE_URL}CV_METINHOUE_EN.pdf`;
};

const FloatingDownload = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = getCvUrl();
    link.download = navigator.language.startsWith("fr")
      ? "CV_METINHOUE_FR.pdf"
      : "CV_METINHOUE_EN.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={handleDownload}
        variant="download"
        size="lg"
        className="rounded-full shadow-glow hover:shadow-glow animate-float"
      >
        <Download className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">Resume</span>
      </Button>
    </div>
  );
};

export default FloatingDownload;
