import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, BarChart3, Cpu, Code, Zap, Laptop } from "lucide-react";
import { useTranslation } from "react-i18next";
import useIntersection from "@/hooks/use-intersection";
import SectionTitle from "@/components/SectionTitle";

const About = () => {
  const { t } = useTranslation();
  const [skillsRef, skillsVisible] = useIntersection();
  const [strengthsRef, strengthsVisible] = useIntersection();

  const skills = [
    { name: "Azure", level: 90, icon: Cloud },
    { name: "Data Visualization", level: 80, icon: BarChart3 },
    { name: "DataOps", level: 90, icon: Cpu },
    { name: "Docker", level: 90, icon: Laptop },
    { name: "MS Fabrics", level: 70, icon: Zap },
    { name: "Python", level: 75, icon: Code },
    { name: "SQL", level: 95, icon: Database },
  ];

  const strengths = [
    { icon: Database, titleKey: "about.strengthArchitectureTitle", textKey: "about.strengthArchitectureText" },
    { icon: Zap, titleKey: "about.strengthRealtimeTitle", textKey: "about.strengthRealtimeText" },
    { icon: BarChart3, titleKey: "about.strengthBiTitle", textKey: "about.strengthBiText" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle text={t("about.title")} />

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-navy">{t("about.journeyTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("about.journey1")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("about.journey2")}</p>
            </div>

            <div ref={skillsRef} className="bg-white rounded-2xl p-8 shadow-card border border-border/50">
              <h3 className="text-xl font-bold text-navy mb-6">{t("about.skillsTitle")}</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-navy text-sm">{skill.name}</span>
                      </div>
                      <span
                        className={`text-sm font-semibold text-primary transition-all duration-700 ${
                          skillsVisible ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                      >
                        {skillsVisible ? `${skill.level}%` : "0%"}
                      </span>
                    </div>
                    <div className="w-full bg-blue-light/50 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full"
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={strengthsRef} className="grid md:grid-cols-3 gap-8">
            {strengths.map(({ icon: Icon, titleKey, textKey }, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-hover transition-all duration-300 border-border/50 group"
                style={{
                  opacity: strengthsVisible ? 1 : 0,
                  transform: strengthsVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{t(titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(textKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
