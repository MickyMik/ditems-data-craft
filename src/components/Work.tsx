import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Work = () => {
  const projects = [
    {
      title: "Real-time Analytics Platform",
      description: "Built a comprehensive real-time analytics platform processing streaming data from multiple sources, providing instant insights through interactive dashboards.",
      image: "/api/placeholder/400/250",
      technologies: ["Apache Kafka", "Spark Streaming", "React", "D3.js", "PostgreSQL"],
      features: [
        "Real-time data ingestion from 50+ sources",
        "Sub-second query response times",
        "Custom visualization components",
        "Automated anomaly detection"
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "ML Pipeline Orchestrator",
      description: "Developed an end-to-end machine learning pipeline orchestration system that automates model training, validation, and deployment processes.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "MLflow", "Docker", "Kubernetes", "Apache Airflow"],
      features: [
        "Automated model retraining",
        "A/B testing framework",
        "Model performance monitoring",
        "One-click deployment system"
      ],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Data Lake Architecture",
      description: "Designed and implemented a scalable data lake architecture handling petabytes of structured and unstructured data with efficient querying capabilities.",
      image: "/api/placeholder/400/250",
      technologies: ["AWS S3", "Apache Parquet", "Presto", "Apache Hive", "Terraform"],
      features: [
        "Petabyte-scale data storage",
        "Cost-optimized data lifecycle",
        "Schema evolution support",
        "Multi-tenant architecture"
      ],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="work" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Showcasing some of my most impactful projects that demonstrate expertise in 
              building scalable data solutions and innovative analytics platforms.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-video bg-gradient-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-navy/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-navy mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-navy mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-navy mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-light text-navy text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="default" size="sm" asChild>
                      <a href={project.demoUrl} className="flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} className="flex items-center space-x-2">
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto bg-gradient-primary text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Interested in Collaboration?</h3>
                <p className="mb-6 text-blue-light">
                  I'm always excited to work on challenging data engineering projects. 
                  Let's discuss how we can build something amazing together.
                </p>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
                  Start a Conversation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;