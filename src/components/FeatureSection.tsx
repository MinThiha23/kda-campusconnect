import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  BookOpen,
  BarChart3,
  Users,
  Clock,
  Shield,
  Smartphone,
  Globe
} from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Course Enrollment",
      description: "Browse and enroll in courses instantly. No more waiting in long queues at the registration counter.",
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      icon: Calendar,
      title: "Attendance Tracking",
      description: "Automated attendance management for both students and faculty with real-time updates.",
      color: "text-secondary",
      bgColor: "bg-secondary-light"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track academic progress with detailed performance reports and grade management.",
      color: "text-accent",
      bgColor: "bg-accent-light"
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Connect with classmates, join study groups, and collaborate on projects.",
      color: "text-primary",
      bgColor: "bg-primary-light"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Accessibility",
      description: "Access your academic information anytime, anywhere"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect experience across all devices and platforms"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in multiple languages for international students"
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need for
            <span className="block text-primary">Academic Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform streamlines every aspect of your academic journey, 
            from enrollment to graduation.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="text-center space-y-3 animate-fade-in"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-card">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" className="animate-scale-in">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;