import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

const Experience = () => {
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
        "Created release pipelines using Azure DevOps"
      ],
      technologies: ["PYTHON", "MS FABRICS", "ADF", "SYNAPSE", "AZ DEVOPS", "AZ IA SEARCH" , "AZ SQL DB", "POSTMAN"]
    },
    {
      title: "TECH LEAD DATA MSBI – AZURE DATA ENGINEER – AZURE DATAOPS",
      company: "VIDAL GROUP",
      location: "Issy-les-moulineaux, France",
      period: "06/2019 - 03/2025",
      description: "Led technical team and managed end-to-end data solutions, including ADF pipeline development, SSIS automation, Power BI reporting, hybrid integration runtime configuration, database migrations (on-prem to Azure SQL), and SQL Server upgrades, while ensuring CI/CD, performance optimization, and robust data architecture.",
      achievements: [
        "Managed technical team and supervised daily, weekly, and monthly production cycles",
        "Standardized installations and integrated unit testing with tSQLt in all productions",
        "Installed and configured all SQL / MySQL / SQLite servers for the data department",
        "Migrated SQL Server 2005 to SQL Server 2019 with Always On Failover Cluster",
        "Configured Integration Runtimes for processing in hybrid architecture",
        "Developed and planned releases across multiple environments (CI/CD)",
        "Designed, automated, optimized, and scheduled SSIS workflows",
        "Migrated on-premises databases to Azure SQL Database",
        "Developed pipelines in Azure Data Factory (ADF)",
        "Migrated SQL Server 2008 R2 to SQL Server 2016",
        "Configured and monitor jobs and deadlocks",
        "Developed notebooks in Databricks",
        "Developed Power BI reports",
        "Developed tabular cubes",
      ],
      technologies: ["PYTHON", "SSIS", "SSRS", "ADF", "DOCKER", "DEVOPS", "SSAS", "POWER BI","TSQLT", "DATABRICKS", "SQL SERVER", "MYSQL", "SQLITE", "AZ SQL DB", "POSTMAN"]
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
        "Wrote technical specifications"
      ],
      technologies: ["ADF", "SSIS", "SQL SERVER", "POWER BI", "AZ SQL DB", "MYSQL"]
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
        "Installed and configured servers for different environments",
        "Scheduled jobs using Control-M"
      ],
      technologies: ["SSIS", "SQL SERVER", "ATTUNITY", "ORACLE", "CTRL-M", "Windows"]
    },
    {
      title: "CONFIRMED MSBI DEVELOPPER",
      company: "LA MUTUELLE FAMILIALE",
      location: "Paris, France",
      period: "09/2016 – 06/2018",
      description: "Involved in maintaining existing systems, optimizing data flows, and designing BI models for the accounting and actuarial departments.",
      achievements: [
        "Developed and automated ETL workflows and strategic reports (SSIS, SSRS, Excel)",
        "Migrated data warehouse from SQL Server 2008 R2 to SQL Server 2016",
        "Optimized SQL query performance in the CRM user interface",
        "Created data feed pipelines for a mobile application",
        "Trained users on Power Pivot and tabular cube utilization",
        "Implemented deployment methods and configured environments (DEV, PREPROD, PROD)"
      ],
      technologies: ["SSIS", "SQL SERVER", "SSAS", "SSRS", "POWER PIVOT", "WINDOWS"]
    },
    {
      title: "JUNIOR MSBI DEVELOPPER",
      company: "LIEBHERR-MINING",
      location: "Colmar, France",
      period: "01/2016 – 09/2016",
      description: "Developed and maintained Business Intelligence solutions using MSBI stack (SSIS, SSRS, SSAS) to deliver reliable, data-driven insights for decision-making at Liebherr.",
      achievements: [
        "Coding and deployment of efficient ETL processes using SSIS 2008 R2",
        "Development of strategic SSRS reports for the production department (SSRS 2014)",
        "Implementation and enhancement of OLAP cubes (multidimensional) and tabular models using SSAS 2014",
        "Optimized database queries improving application performance by 3x"
      ],
      technologies: ["SSIS", "SQL SERVER", "SSAS", "SSRS", "WINDOWS"]
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
