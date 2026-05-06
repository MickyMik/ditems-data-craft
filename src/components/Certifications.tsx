import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import useIntersection from "@/hooks/use-intersection";

const Certifications = () => {
  const { t } = useTranslation();
  const [gridRef, gridVisible] = useIntersection();

  const certifications = [
    {
      title: "Microsoft Certified: Azure Data Engineer Associate",
      issuer: "Microsoft",
      date: "2024",
      credentialId: "DP-203",
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/fr-fr/metinhoue/4940F1DC6288C3C8?sharingId=D60DF056DF7B1866",
      description: "Demonstrated expertise in integrating, transforming, and consolidating data from various structured and unstructured data systems into structures suitable for building analytics solutions.",
      skills: ["Azure Data Factory", "Azure Synapse Analytics", "Azure Databricks", "Azure Storage"]
    },
    {
      title: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "2020",
      credentialId: "AZ-900",
      credentialUrl: "https://www.credly.com/badges/2ef3251b-8368-45eb-892c-e038027b5052",
      description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
      skills: ["Azure Services", "Cloud Computing", "Azure Architecture"]
    },
    {
      title: "Microsoft Certified: Implementing a Data Warehouse",
      issuer: "Microsoft",
      date: "2019",
      credentialId: "70-767",
      credentialUrl: "https://www.credly.com/badges/ccdbd6af-436d-4a63-94fb-6d70660ca689",
      description: "Skilled in designing, building, and optimizing enterprise-scale data warehouse solutions.",
      skills: ["Design, implement, and maintain data warehouses", "ETL Processes", "Data Quality Services (DQS)", "Data Analysis Expressions (DAX)", "Multidimensional Expressions (MDX)", "Data Modeling", "Data Governance"]
    },
    {
      title: "Microsoft Certified: Querying Sql Server 2012/2014",
      issuer: "Microsoft",
      date: "2018",
      credentialId: "70-461",
      credentialUrl: "https://www.credly.com/badges/5008f806-2680-4874-8219-b1ed63b20615",
      description: "Proven expertise in writing queries, managing data, and optimizing SQL Server performance.",
      skills: ["SSMS", "SSRS", "SSIS", "SSAS", "T-SQL", "Database Management"]
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">{t("certifications.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("certifications.subtitle")}</p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="hover:shadow-hover transition-shadow duration-300"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ease-out ${index * 0.12}s, transform 0.5s ease-out ${index * 0.12}s`,
                }}
              >
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
                          <span className="font-medium">{t("certifications.credentialId")}</span> {cert.credentialId}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{cert.description}</p>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-sm text-primary hover:underline mb-4"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t("certifications.verify")}</span>
                    </a>
                  )}

                  <div>
                    <h5 className="font-semibold text-navy mb-3">{t("certifications.skillsValidated")}</h5>
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
