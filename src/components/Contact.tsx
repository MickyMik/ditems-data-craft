import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { sanitizeInput, checkRateLimit, setRateLimit } from "@/utils/security";
import SectionTitle from "@/components/SectionTitle";

const SERVICE_ID = "service_t6so8r5";
const TEMPLATE_ID = "template_meqf9bp";
const PUBLIC_KEY = "IobH6oMwMiIETnEVh";

const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  subject: z.string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must not exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s-,.!?]+$/, "Subject contains invalid characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const RATE_LIMIT_KEY = "lastContactSubmission";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

  const handleSubmit = async (data: ContactFormData) => {
    if (!checkRateLimit(RATE_LIMIT_KEY, 60000)) {
      toast({ title: t("contact.errorTitle"), description: t("contact.rateLimitMessage"), variant: "destructive" });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: sanitizeInput(data.name),
          email: sanitizeInput(data.email.toLowerCase()),
          subject: sanitizeInput(data.subject),
          message: sanitizeInput(data.message),
        },
        PUBLIC_KEY
      );

      setRateLimit(RATE_LIMIT_KEY);
      toast({ title: t("contact.successTitle"), description: t("contact.successMessage") });
      form.reset();
      setSubmitted(true);
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorMessage"), variant: "destructive" });
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@ditems.fr", href: "mailto:contact@ditems.fr" },
    { icon: Phone, label: "Phone", value: "+33 6 52 93 61 26", href: "tel:+33652936126" },
    { icon: MapPin, label: "Location", value: "Paris, France", href: "#" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle text={t("contact.title")} subtitle={t("contact.subtitle")} light />

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-card">
              <CardContent className="p-8">
                {submitted ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 text-center"
                    style={{ animation: "count-up 0.5s ease-out" }}
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-3">{t("contact.successTitle")}</h3>
                    <p className="text-muted-foreground mb-6">{t("contact.successMessage")}</p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      {t("contact.send")}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-navy mb-6">{t("contact.formTitle")}</h3>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("contact.name")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("contact.namePlaceholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("contact.email")}</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder={t("contact.emailPlaceholder")} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.subject")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("contact.subjectPlaceholder")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("contact.message")}</FormLabel>
                              <FormControl>
                                <Textarea rows={6} placeholder={t("contact.messagePlaceholder")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" variant="contact" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? t("contact.sending") : t("contact.send")}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-navy mb-6">{t("contact.infoTitle")}</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a key={index} href={info.href} className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group">
                        <div className="w-12 h-12 bg-blue-light rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-navy">{info.label}</p>
                          <p className="text-muted-foreground">{info.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-navy mb-4">{t("contact.responseTitle")}</h3>
                  <p className="text-muted-foreground">{t("contact.responseText")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
