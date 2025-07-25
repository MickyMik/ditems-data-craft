import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Data Engineer",
      company: "TechCorp Solutions",
      location: "Paris, France",
      period: "2022 - Present",
      description: "Lead the design and implementation of data infrastructure serving 10M+ users. Built real-time analytics platform processing 500GB+ daily data.",
      achievements: [
        "Reduced data processing time by 60% through pipeline optimization",
        "Implemented automated data quality monitoring reducing errors by 85%",
        "Led team of 4 engineers in migrating legacy systems to modern cloud architecture"
      ],
      technologies: ["Python", "Apache Spark", "AWS", "Kubernetes", "PostgreSQL", "Redis"]
    },
    {
      title: "Data Engineer",
      company: "DataFlow Analytics",
      location: "Lyon, France",
      period: "2020 - 2022",
      description: "Developed ETL pipelines for enterprise clients, focusing on real-time data processing and machine learning model deployment.",
      achievements: [
        "Built scalable data pipelines processing 100M+ records daily",
        "Implemented ML models increasing prediction accuracy by 40%",
        "Designed data warehouse architecture supporting complex analytics"
      ],
      technologies: ["Python", "Apache Airflow", "GCP", "BigQuery", "Docker", "TensorFlow"]
    },
    {
      title: "Junior Data Engineer",
      company: "StartupData",
      location: "Remote",
      period: "2019 - 2020",
      description: "Started career building data solutions for e-commerce platform, learning fundamentals of data engineering and analytics.",
      achievements: [
        "Developed first production data pipeline reducing manual work by 90%",
        "Created automated reporting system serving 50+ stakeholders",
        "Optimized database queries improving application performance by 3x"
      ],
      technologies: ["Python", "MySQL", "Tableau", "Pandas", "Linux"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey through challenging projects and innovative solutions in the data engineering landscape.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-navy mb-2">{exp.title}</h3>
                      <h4 className="text-xl text-primary font-semibold mb-2">{exp.company}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{exp.description}</p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-navy mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-navy mb-3">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-light text-navy">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;