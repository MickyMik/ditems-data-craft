import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import emailjs from "emailjs-com";

// ✅ EmailJS Configuration (Replace with your actual IDs)
const SERVICE_ID = "service_t6so8r5"; // Remplace par ton Service ID EmailJS
const TEMPLATE_ID = "template_meqf9bp"; // Remplace par ton Template ID EmailJS
const PUBLIC_KEY = "IobH6oMwMiIETnEVh"; // Remplace par ta clé publique EmailJS

// ✅ Validation Schema avec Zod // Form validation schema
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

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const handleSubmit = async (data: ContactFormData) => {
    try {
      // ✅ Anti-Spam: Vérifie délai entre envois // Empêche spam en vérifiant le délai // Rate limiting check (simple client-side implementation)
      const lastSubmission = localStorage.getItem("lastContactSubmission");
      const now = Date.now();
      if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
        toast({
          title: "Please wait",
          description: "Please wait a minute before sending another message.",
          variant: "destructive"
        });
        return;
      }

      // ✅ Nettoyage des données
      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim()
      };

      // ✅ Envoi via EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: sanitizedData.name,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message
        },
        PUBLIC_KEY
      );

      // ✅ Sauvegarde du timestamp pour éviter spam
      localStorage.setItem("lastContactSubmission", now.toString());

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon."
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@ditems.fr",
      href: "mailto:contact@ditems.fr"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+33 6 52 93 61 26",
      href: "tel:+33652936126"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Paris, France",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/michael-m-87177793/",
      color: "hover:text-blue-600"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MickyMik",
      color: "hover:text-gray-900"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contact@ditems.fr",
      color: "hover:text-red-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Let's Connect</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to discuss your next data project? I'm always excited to collaborate on 
              innovative solutions and challenging problems. Let's start a conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-6">Send a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
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
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Project discussion, collaboration, etc." {...field} />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Tell me about your project, challenges you're facing, or how we can work together..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="contact"
                      size="lg"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Info + Social Links */}
            <div className="space-y-8">
              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-navy mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors group"
                      >
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

              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
                  <p className="text-blue-light mb-6">
                    I'm passionate about solving complex data challenges and would love to hear about your project. 
                    Whether you need consultation, development, or just want to discuss ideas, I'm here to help.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all transform hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-navy mb-4">Response Time</h3>
                  <p className="text-muted-foreground">
                    I typically respond to messages within 24 hours. For urgent matters, 
                    feel free to reach out directly via phone or LinkedIn.
                  </p>
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
