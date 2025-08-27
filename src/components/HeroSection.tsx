import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-campus.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Users, label: "Active Students", value: "1,000+" },
    { icon: BookOpen, label: "Courses Available", value: "150+" },
    { icon: Award, label: "Graduation Rate", value: "95%" },
    { icon: Clock, label: "Online Learning Hours", value: "24/7" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium">
                🎓 Welcome to KD Academy Campus Connect
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Your
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  Learning Experience
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Streamline course enrollment, track attendance, monitor performance, 
                and access online learning - all in one modern platform designed for students and faculty.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <Link to="/register">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center space-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center shadow-card">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <img
                src={heroImage}
                alt="Students learning in a digital campus environment"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-card animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm font-medium">Online Classes Active</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;