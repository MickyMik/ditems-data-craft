import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, BarChart3, Cpu, Code, Zap , Laptop } from "lucide-react";

const About = () => {
  const skills = [
    
    { name: "Azure", level: 90, icon: Cloud },
    { name: "Data Visualization", level: 80, icon: BarChart3 },
    { name: "DataOps", level: 90, icon: Cpu },
    { name: "Docker", level: 90, icon: Laptop },
    { name: "MS Fabrics", level: 70, icon: Zap },
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
            I am an experienced Data Engineer and future Data Architect with over a decade of expertise in designing
            and implementing end-to-end data and BI platforms. Certified and specialized in Microsoft technologies 
            (on-premises and cloud), I help organizations build robust data pipelines, implement real-time analytics, 
            and deliver insightful reporting to empower data-driven decision-making.

            With strong expertise in DataOps practices using Azure DevOps, I ensure seamless integration, automated 
            deployments, and continuous delivery for data solutions, enhancing reliability and scalability 
            across the data lifecycle.

            Passionate about turning complex data into actionable insights, I thrive in building scalable, automated, 
            and high-performing solutions that deliver real business value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-navy mb-4">My Journey</h3>
              <p className="text-muted-foreground">
              I started my career as a BI Developer, building reports and dashboards that transformed raw data into 
              actionable insights. Along the way, I embraced DataOps practices, leveraging automation and Azure DevOps 
              to streamline data workflows and implement CI/CD for data solutions.

              This foundation led me to become a Tech Lead in Data, where I guided teams in developing modern data platforms 
              and implementing best practices for scalability, performance, and governance.

              Currently, I work as a Data Engineer, specializing in Microsoft technologies (on-premises and Azure cloud) 
              to design and deploy end-to-end data and BI platforms, implement real-time analytics, and build robust data pipelines.

              I am now focused on advancing toward my next goal: becoming a Data Architect, passionate about designing scalable, 
              high-performing architectures that power data-driven decision-making.
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
                <h3 className="text-xl font-bold text-navy mb-3">Business Intelligence & analytics</h3>
                <p className="text-muted-foreground">
                  Implementing Business Intelligence models and advanced analytics for data-driven insights that empower innovation and growth.
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
