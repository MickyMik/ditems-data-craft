import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
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
            <a href="https://www.linkedin.com/in/john-michael-m-87177793/" className="text-blue-light/70 hover:text-white transition-all transform hover:scale-125 duration-200" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/MickyMik" className="text-blue-light/70 hover:text-white transition-all transform hover:scale-125 duration-200" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 6.6a11.52 11.52 0 0 1 3.006.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"/></svg>
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
