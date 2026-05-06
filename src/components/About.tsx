import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, BarChart3, Cpu, Code, Zap, Laptop } from "lucide-react";
import { useTranslation } from "react-i18next";
import useIntersection from "@/hooks/use-intersection";

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
    <section id="about" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("about.intro")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy mb-4">{t("about.journeyTitle")}</h3>
              <p className="text-muted-foreground">{t("about.journey1")}</p>
              <p className="text-muted-foreground">{t("about.journey2")}</p>
            </div>

            <div ref={skillsRef} className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-navy mb-6">{t("about.skillsTitle")}</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-navy">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-blue-light h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full"
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transition: `width 1s ease-out ${index * 0.1}s`,
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
                className="text-center hover:shadow-hover transition-shadow duration-300 transform hover:-translate-y-2"
                style={{
                  opacity: strengthsVisible ? 1 : 0,
                  transform: strengthsVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ease-out ${index * 0.15}s, transform 0.5s ease-out ${index * 0.15}s`,
                }}
              >
                <CardContent className="p-8">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy mb-3">{t(titleKey)}</h3>
                  <p className="text-muted-foreground">{t(textKey)}</p>
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
