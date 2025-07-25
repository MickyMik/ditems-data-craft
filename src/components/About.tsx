import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, BarChart3, Cpu, Code, Zap } from "lucide-react";

const About = () => {
  const skills = [
    { name: "Apache Spark", level: 75, icon: Zap },
    { name: "Azure", level: 90, icon: Cloud },
    { name: "Data Visualization", level: 80, icon: BarChart3 },
    { name: "DataOps", level: 90, icon: Cpu },
    { name: "Docker", level: 90, icon: computer },
    { name: "Python", level: 75, icon: Code },
    { name: "SQL", level: 95, icon: Database },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Passionate data engineer with 5+ years of experience building robust data pipelines, 
              implementing real-time analytics solutions, and driving data-driven decision making 
              across various industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy mb-4">My Journey</h3>
              <p className="text-muted-foreground">
                Started as a software developer, I discovered my passion for data engineering 
                while working on complex analytics projects. I specialize in designing scalable 
                data architectures that can handle millions of records while maintaining 
                high performance and reliability.
              </p>
              <p className="text-muted-foreground">
                My expertise spans across the entire data lifecycle - from ingestion and 
                processing to storage and visualization. I'm particularly passionate about 
                real-time data processing and implementing modern data stack solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-navy mb-6">Technical Skills</h3>
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
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Strengths */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Data Architecture</h3>
                <p className="text-muted-foreground">
                  Designing scalable and robust data architectures that grow with your business needs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Real-time Processing</h3>
                <p className="text-muted-foreground">
                  Building high-performance streaming pipelines for real-time analytics and insights.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-3">Analytics & ML</h3>
                <p className="text-muted-foreground">
                  Implementing machine learning models and advanced analytics for predictive insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
