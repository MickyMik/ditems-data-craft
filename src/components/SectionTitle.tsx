import useIntersection from "@/hooks/use-intersection";

interface SectionTitleProps {
  text: string;
  subtitle?: string;
  light?: boolean;
}

const SectionTitle = ({ text, subtitle, light = false }: SectionTitleProps) => {
  const [ref, visible] = useIntersection({ threshold: 0.3 });

  return (
    <div ref={ref} className="text-center mb-16">
      <div className="relative inline-block">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            light ? "text-white" : "text-navy"
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {text}
        </h2>
        <div
          className={`h-1 rounded-full transition-all duration-700 delay-300 ${
            light ? "bg-blue-light" : "bg-gradient-primary"
          } ${visible ? "w-full" : "w-0"}`}
        />
      </div>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto mt-6 transition-all duration-700 delay-500 ${
            light ? "text-blue-light/80" : "text-muted-foreground"
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
