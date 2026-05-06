import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import useTypewriter from "@/hooks/use-typewriter";
import useCounter from "@/hooks/use-counter";
import useIntersection from "@/hooks/use-intersection";

const StatItem = ({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) => {
  const count = useCounter(value, 1600, trigger);
  return (
    <div className="text-center animate-count-up">
      <div className="text-3xl md:text-4xl font-bold text-white">
        {count}<span className="text-blue-light">{suffix}</span>
      </div>
      <div className="text-sm text-blue-light/70 mt-1">{label}</div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const subtitle = t("hero.subtitle");
  const { displayed, done } = useTypewriter(subtitle, 70, 900);
  const [statsRef, statsVisible] = useIntersection({ threshold: 0.5 });

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-hero-animated relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-bright/15 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-light/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t("hero.title")}
            <span className="block text-blue-light min-h-[1.2em]">
              {displayed}
              {!done && <span className="animate-blink border-r-2 border-blue-light ml-0.5">&nbsp;</span>}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-light/80 mb-10 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button variant="hero" size="lg" onClick={scrollToAbout} className="animate-pulse-glow">
              {t("hero.exploreWork")}
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/70 text-white hover:bg-white hover:text-navy backdrop-blur-sm"
              onClick={scrollToContact}
            >
              <Mail className="w-5 h-5" />
              {t("hero.getInTouch")}
            </Button>
          </div>

          {/* Animated stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 max-w-sm mx-auto mb-12 border border-white/10 rounded-2xl py-6 px-4 backdrop-blur-sm bg-white/5"
          >
            <StatItem value={10} suffix="+" label="Years exp." trigger={statsVisible} />
            <StatItem value={4} suffix="" label="Certifications" trigger={statsVisible} />
            <StatItem value={6} suffix="" label="Companies" trigger={statsVisible} />
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center space-x-6">
            <a href="https://www.linkedin.com/in/michael-m-87177793/" className="text-blue-light/70 hover:text-white transition-all transform hover:scale-125 duration-200" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/MickyMik" className="text-blue-light/70 hover:text-white transition-all transform hover:scale-125 duration-200" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="mailto:contact@ditems.fr" className="text-blue-light/70 hover:text-white transition-all transform hover:scale-125 duration-200" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToAbout}>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
