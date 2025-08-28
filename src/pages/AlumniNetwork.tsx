import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Calendar,
  FileText,
  GraduationCap,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Bell,
  Settings,
  MessageCircle,
  Briefcase
} from "lucide-react";

const AlumniNetwork = () => {
  const alumniStats = [
    { label: "Total Alumni", value: "5,247", icon: Users, color: "text-primary" },
    { label: "Active Members", value: "3,156", icon: Star, color: "text-secondary" },
    { label: "Events This Year", value: "24", icon: Calendar, color: "text-accent" },
    { label: "Job Placements", value: "892", icon: Briefcase, color: "text-green-600" }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Alumni Homecoming 2024",
      date: "2024-03-15",
      time: "6:00 PM",
      location: "Main Campus",
      attendees: 156,
      type: "Social"
    },
    {
      id: 2,
      title: "Career Networking Event",
      date: "2024-02-20",
      time: "7:00 PM",
      location: "Virtual",
      attendees: 89,
      type: "Professional"
    },
    {
      id: 3,
      title: "Alumni Mentorship Program",
      date: "2024-02-25",
      time: "5:00 PM",
      location: "Library Conference Room",
      attendees: 45,
      type: "Educational"
    }
  ];

  const alumniFeatures = [
    {
      title: "Career Services",
      description: "Access job boards, career counseling, and professional development resources",
      icon: Briefcase,
      color: "text-primary"
    },
    {
      title: "Alumni Directory",
      description: "Connect with fellow alumni and expand your professional network",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Mentorship Program",
      description: "Become a mentor or find a mentor to guide your career journey",
      icon: Star,
      color: "text-accent"
    },
    {
      title: "Alumni Events",
      description: "Attend networking events, reunions, and professional development workshops",
      icon: Calendar,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Alumni Network
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with your alma mater and fellow graduates. Access exclusive benefits and opportunities.
          </p>
        </div>

        {/* Alumni Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {alumniStats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Alumni Features */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Alumni Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {alumniFeatures.map((feature, index) => (
                  <Card 
                    key={feature.title}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Alumni Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card 
                    key={event.id}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {event.attendees} attending
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{event.type}</Badge>
                        <Button variant="outline" size="sm">
                          Register
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Alumni Directory
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Board
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Event Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </Button>
              </div>
            </Card>

            {/* Alumni Spotlight */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Alumni Spotlight</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-3 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">Ahmad Rahman</h4>
                  <p className="text-sm text-muted-foreground">Class of 2020</p>
                  <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                </div>
                <Button variant="outline" className="w-full">
                  Read Full Story
                </Button>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Alumni Relations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Alumni Office</div>
                  <div className="text-sm text-muted-foreground">+60 3-1234 5681</div>
                  <div className="text-sm text-muted-foreground">alumni@kdacademy.edu.my</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Career Services</div>
                  <div className="text-sm text-muted-foreground">+60 3-1234 5682</div>
                  <div className="text-sm text-muted-foreground">careers@kdacademy.edu.my</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stay Connected with Your Alma Mater
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our vibrant alumni community and take advantage of exclusive benefits, 
            networking opportunities, and lifelong learning resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Join Alumni Network
            </Button>
            <Button variant="outline">
              Contact Alumni Office
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlumniNetwork;
