import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import useIntersection from "@/hooks/use-intersection";
import SectionTitle from "@/components/SectionTitle";

const Experience = () => {
  const { t } = useTranslation();
  const [timelineRef, timelineVisible] = useIntersection({ threshold: 0.05 });

  const experiences = [
    {
      title: "JUNIOR CLOUD DATA ARCHITECT – AZURE DATA ENGINEER",
      company: "HAGER GROUP",
      location: "Paris, France",
      period: "03/2025 - Present",
      description: "Collaborated with Cloud Data Architect to build a 360° customer view through ADF pipelines, Power BI reports, and Azure AI Search.",
      achievements: [
        "Designed and implemented data models using the medallion architecture",
        "Developed ADF pipelines (Dataverse, Eloqua, Dynamics, Synapse)",
        "Built Power BI reports",
        "Performed data reconciliation to achieve a 360° customer view (Azure AI Search)",
        "Optimized processes for better efficiency",
        "Wrote technical specifications",
        "Created release pipelines using Azure DevOps",
      ],
      technologies: ["PYTHON", "MS FABRICS", "ADF", "SYNAPSE", "AZ DEVOPS", "AZ IA SEARCH", "AZ SQL DB", "POSTMAN"],
    },
    {
      title: "TECH LEAD DATA MSBI – AZURE DATA ENGINEER – AZURE DATAOPS",
      company: "VIDAL GROUP",
      location: "Issy-les-moulineaux, France",
      period: "06/2019 - 03/2025",
      description: "Led technical team and managed end-to-end data solutions, including ADF pipeline development, SSIS automation, Power BI reporting, hybrid integration runtime configuration, database migrations, and SQL Server upgrades.",
      achievements: [
        "Managed technical team and supervised daily, weekly, and monthly production cycles",
        "Standardized installations and integrated unit testing with tSQLt in all productions",
        "Installed and configured all SQL / MySQL / SQLite servers for the data department",
        "Migrated SQL Server 2005 to SQL Server 2019 with Always On Failover Cluster",
        "Configured Integration Runtimes for processing in hybrid architecture",
        "Developed and planned releases across multiple environments (CI/CD)",
        "Designed, automated, optimized, and scheduled SSIS workflows",
        "Migrated on-premises databases to Azure SQL Database",
        "Developed notebooks in Databricks",
        "Developed Power BI reports and tabular cubes",
      ],
      technologies: ["PYTHON", "SSIS", "SSRS", "ADF", "DOCKER", "DEVOPS", "SSAS", "POWER BI", "TSQLT", "DATABRICKS", "SQL SERVER", "AZ SQL DB"],
    },
    {
      title: "SENIOR MSBI DEVELOPPER - AZURE DATA ENGINEER",
      company: "COVAGE",
      location: "Sèvre, France",
      period: "10/2018 – 06/2019",
      description: "Built data pipelines, created reports, managed ETL workflows, and optimized servers.",
      achievements: [
        "Developed pipelines using Azure Data Factory (ADF) v1",
        "Developed Power BI reports",
        "Designed, automated, optimized, and scheduled SSIS workflows",
        "Optimized server configurations",
        "Wrote technical specifications",
      ],
      technologies: ["ADF", "SSIS", "SQL SERVER", "POWER BI", "AZ SQL DB", "MYSQL"],
    },
    {
      title: "CONFIRMED MSBI DEVELOPPER",
      company: "PHILIP MORRIS FRANCE",
      location: "La Defense, France",
      period: "06/2018 – 10/2018",
      description: "Migration of 100 SSIS packages from SSIS 2008 R2 to SSIS 2016 and schedule using Control-M.",
      achievements: [
        "Migrated 100 SSIS packages from SSIS 2008 R2 to SSIS 2016 using Attunity",
        "Implemented package deployment strategy across multiple environments",
        "Optimized SQL Server processes for improved performance",
        "Scheduled jobs using Control-M",
      ],
      technologies: ["SSIS", "SQL SERVER", "ATTUNITY", "ORACLE", "CTRL-M"],
    },
    {
      title: "CONFIRMED MSBI DEVELOPPER",
      company: "LA MUTUELLE FAMILIALE",
      location: "Paris, France",
      period: "09/2016 – 06/2018",
      description: "Maintaining existing systems, optimizing data flows, and designing BI models for the accounting and actuarial departments.",
      achievements: [
        "Developed and automated ETL workflows and strategic reports (SSIS, SSRS, Excel)",
        "Migrated data warehouse from SQL Server 2008 R2 to SQL Server 2016",
        "Optimized SQL query performance in the CRM user interface",
        "Created data feed pipelines for a mobile application",
        "Trained users on Power Pivot and tabular cube utilization",
      ],
      technologies: ["SSIS", "SQL SERVER", "SSAS", "SSRS", "POWER PIVOT"],
    },
    {
      title: "JUNIOR MSBI DEVELOPPER",
      company: "LIEBHERR-MINING",
      location: "Colmar, France",
      period: "01/2016 – 09/2016",
      description: "Developed and maintained Business Intelligence solutions using MSBI stack to deliver reliable, data-driven insights.",
      achievements: [
        "Coding and deployment of efficient ETL processes using SSIS 2008 R2",
        "Development of strategic SSRS reports for the production department",
        "Implementation of OLAP cubes and tabular models using SSAS 2014",
        "Optimized database queries improving application performance by 3x",
      ],
      technologies: ["SSIS", "SQL SERVER", "SSAS", "SSRS"],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle text={t("experience.title")} subtitle={t("experience.subtitle")} />

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border/50 overflow-hidden">
              <div
                className="w-full bg-gradient-primary origin-top"
                style={{
                  height: timelineVisible ? "100%" : "0%",
                  transition: "height 2s ease-out 0.2s",
                }}
              />
            </div>

            <div className="space-y-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-12 md:pl-16"
                  style={{
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease-out ${index * 0.12}s, transform 0.5s ease-out ${index * 0.12}s`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-1 md:left-3 top-7 w-6 h-6 rounded-full bg-white border-2 border-primary shadow-glow flex items-center justify-center"
                    style={{
                      transform: timelineVisible ? "scale(1)" : "scale(0)",
                      transition: `transform 0.3s ease-out ${index * 0.12 + 0.1}s`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <Card className="hover:shadow-hover transition-all duration-300 border-border/50 group">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-navy mb-1 group-hover:text-primary transition-colors duration-200">
                            {exp.title}
                          </h3>
                          <h4 className="text-base text-primary font-semibold mb-2">{exp.company}</h4>
                          <div className="flex flex-wrap gap-3 text-muted-foreground text-sm">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{exp.description}</p>

                      <div className="mb-5">
                        <h5 className="font-semibold text-navy text-sm mb-3">{t("experience.achievements")}</h5>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-navy text-sm mb-3">{t("experience.technologies")}</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-primary/10 text-primary border border-primary/20 text-xs hover:bg-primary hover:text-white transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
