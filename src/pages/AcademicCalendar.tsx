import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  GraduationCap,
  AlertCircle
} from "lucide-react";

const AcademicCalendar = () => {
  const academicEvents = [
    {
      id: 1,
      title: "Spring Semester Begins",
      date: "2024-01-15",
      time: "9:00 AM",
      type: "semester",
      description: "First day of Spring 2024 semester. All students must attend orientation.",
      location: "Main Auditorium",
      category: "Academic"
    },
    {
      id: 2,
      title: "Course Registration Deadline",
      date: "2024-01-20",
      time: "11:59 PM",
      type: "deadline",
      description: "Last day to register for courses or make schedule changes.",
      location: "Online Portal",
      category: "Administrative"
    },
    {
      id: 3,
      title: "Midterm Examinations",
      date: "2024-02-15",
      time: "10:00 AM",
      type: "exam",
      description: "Midterm examinations for all courses. Check your schedule for specific times.",
      location: "Various Classrooms",
      category: "Academic"
    },
    {
      id: 4,
      title: "Spring Break",
      date: "2024-03-10",
      time: "All Day",
      type: "break",
      description: "Spring break - no classes. Campus facilities remain open.",
      location: "Campus Wide",
      category: "Holiday"
    },
    {
      id: 5,
      title: "Final Examinations",
      date: "2024-05-01",
      time: "9:00 AM",
      type: "exam",
      description: "Final examination period begins. Check your exam schedule.",
      location: "Various Classrooms",
      category: "Academic"
    },
    {
      id: 6,
      title: "Graduation Ceremony",
      date: "2024-05-20",
      time: "2:00 PM",
      type: "graduation",
      description: "Spring 2024 graduation ceremony for all graduating students.",
      location: "Main Stadium",
      category: "Ceremony"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "semester":
        return <BookOpen className="h-5 w-5" />;
      case "deadline":
        return <AlertCircle className="h-5 w-5" />;
      case "exam":
        return <GraduationCap className="h-5 w-5" />;
      case "break":
        return <Calendar className="h-5 w-5" />;
      case "graduation":
        return <Users className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventBadge = (category: string) => {
    switch (category) {
      case "Academic":
        return <Badge className="bg-blue-100 text-blue-800">Academic</Badge>;
      case "Administrative":
        return <Badge className="bg-green-100 text-green-800">Administrative</Badge>;
      case "Holiday":
        return <Badge className="bg-yellow-100 text-yellow-800">Holiday</Badge>;
      case "Ceremony":
        return <Badge className="bg-purple-100 text-purple-800">Ceremony</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>;
    }
  };

  const upcomingEvents = academicEvents.filter(event => 
    new Date(event.date) >= new Date()
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Academic Calendar
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with important academic dates, deadlines, and events throughout the semester
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{academicEvents.length}</div>
                <div className="text-sm text-muted-foreground">Total Events</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{upcomingEvents.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-accent">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">2024</div>
                <div className="text-sm text-muted-foreground">Academic Year</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Academic Events</h2>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Download Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {academicEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-muted text-primary">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                        {getEventBadge(event.category)}
                      </div>
                      <p className="text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      {getEventIcon(event.type)}
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{new Date(event.date).toLocaleDateString()}</div>
                      <div>{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Personal Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Course Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Contact Academic Advisor
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Academic Planning?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our academic advisors are here to help you plan your academic journey and stay on track with important deadlines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Schedule Academic Consultation
            </Button>
            <Button variant="outline">
              Download Full Calendar
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AcademicCalendar;
