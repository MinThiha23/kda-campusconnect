import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award,
  Bell,
  Settings,
  MessageCircle,
  BookOpen,
  GraduationCap
} from "lucide-react";

const Events = () => {
  const eventStats = [
    { label: "Total Events", value: "24", icon: Calendar, color: "text-primary" },
    { label: "This Month", value: "8", icon: Clock, color: "text-secondary" },
    { label: "Total Attendees", value: "1,247", icon: Users, color: "text-accent" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "text-green-600" }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Career Fair 2024",
      date: "2024-02-15",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      attendees: 156,
      type: "Career",
      description: "Connect with top employers and explore career opportunities"
    },
    {
      id: 2,
      title: "Academic Excellence Awards",
      date: "2024-02-20",
      time: "6:00 PM - 8:00 PM",
      location: "Grand Hall",
      attendees: 89,
      type: "Ceremony",
      description: "Celebrating outstanding academic achievements of our students"
    },
    {
      id: 3,
      title: "Technology Innovation Workshop",
      date: "2024-02-25",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab B205",
      attendees: 45,
      type: "Workshop",
      description: "Hands-on workshop on emerging technologies and innovation"
    },
    {
      id: 4,
      title: "Student Leadership Conference",
      date: "2024-03-01",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Center",
      attendees: 78,
      type: "Conference",
      description: "Develop leadership skills and network with student leaders"
    }
  ];

  const eventCategories = [
    {
      title: "Academic Events",
      description: "Lectures, seminars, and academic conferences",
      icon: BookOpen,
      color: "text-primary",
      count: 12
    },
    {
      title: "Career Events",
      description: "Job fairs, networking events, and career workshops",
      icon: Award,
      color: "text-secondary",
      count: 8
    },
    {
      title: "Social Events",
      description: "Student gatherings, cultural events, and celebrations",
      icon: Users,
      color: "text-accent",
      count: 6
    },
    {
      title: "Workshops",
      description: "Skill development and hands-on learning sessions",
      icon: TrendingUp,
      color: "text-green-600",
      count: 10
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Campus Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exciting events, workshops, and activities happening on campus
          </p>
        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {eventStats.map((stat, index) => (
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
            {/* Event Categories */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Event Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {eventCategories.map((category, index) => (
                  <Card 
                    key={category.title}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <Badge variant="outline">{category.count} events</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Browse Events
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card 
                    key={event.id}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.time}
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
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-2" />
                            Set Reminder
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                        <Button variant="hero" size="sm">
                          Register Now
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
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Events
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Event Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  My Registrations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Event Preferences
                </Button>
              </div>
            </Card>

            {/* Featured Event */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Featured Event</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">Graduation Ceremony 2024</h4>
                  <p className="text-sm text-muted-foreground">May 20, 2024</p>
                  <p className="text-sm text-muted-foreground">Main Stadium</p>
                </div>
                <Button variant="hero" className="w-full">
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Event Calendar */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Monday</div>
                  <div className="text-sm text-muted-foreground">Faculty Meeting</div>
                  <div className="text-sm text-muted-foreground">2:00 PM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Wednesday</div>
                  <div className="text-sm text-muted-foreground">Study Group</div>
                  <div className="text-sm text-muted-foreground">3:00 PM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Friday</div>
                  <div className="text-sm text-muted-foreground">Career Workshop</div>
                  <div className="text-sm text-muted-foreground">1:00 PM</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to Host an Event?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Students, faculty, and staff can submit event proposals. 
            Let's make our campus more vibrant and engaging together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Submit Event Proposal
            </Button>
            <Button variant="outline">
              Contact Events Office
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
