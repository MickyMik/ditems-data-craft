import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingDownload = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past hero section
      setIsVisible(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = () => {
    // In a real application, this would trigger the actual file download
    // For now, we'll create a dummy PDF download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume PDF URL
    link.download = 'Ditems_Data_Engineer_Resume.pdf';
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