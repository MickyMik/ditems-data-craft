import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Microsoft Certified: Azure Data Engineer Associate",
      issuer: "Microsoft",
      date: "2024",
      credentialId: "DP-203",
      description: "Demonstrated expertise in integrating, transforming, and consolidating data from various structured and unstructured data systems into structures suitable for building analytics solutions.",
      skills: ["Azure Data Factory", "Azure Synapse Analytics", "Azure Databricks", "Azure Storage"]
    },
    {
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft", 
      date: "2023",
      credentialId: "AZ-900",
      description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
      skills: ["Azure Services", "Cloud Computing", "Azure Architecture"]
    },
    {
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "2023", 
      credentialId: "PL-300",
      description: "Expertise in designing and building scalable data models, cleaning and transforming data, and enabling advanced analytic capabilities.",
      skills: ["Power BI", "DAX", "Power Query", "Data Modeling"]
    },
    {
      title: "SQL Server Database Administration",
      issuer: "Microsoft",
      date: "2022",
      credentialId: "70-764",
      description: "Advanced skills in SQL Server database administration, backup and recovery, security, and performance optimization.",
      skills: ["SQL Server", "Database Administration", "Performance Tuning", "Security"]
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications that validate my expertise in data engineering and cloud technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-navy mb-2">{cert.title}</h3>
                      <h4 className="text-lg text-primary font-semibold mb-2">{cert.issuer}</h4>
                      <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{cert.date}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">ID:</span> {cert.credentialId}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{cert.description}</p>

                  <div>
                    <h5 className="font-semibold text-navy mb-3">Skills Validated:</h5>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-light text-navy">
                          {skill}
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

export default Certifications;