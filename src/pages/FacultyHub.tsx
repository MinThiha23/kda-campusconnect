import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  Clock,
  Star,
  TrendingUp,
  Award,
  Bell,
  Settings,
  BarChart3
} from "lucide-react";

const FacultyHub = () => {
  const quickActions = [
    {
      title: "Grade Management",
      description: "Submit grades and view student performance",
      icon: Award,
      color: "text-primary",
      status: "Open"
    },
    {
      title: "Course Management",
      description: "Manage course materials and assignments",
      icon: BookOpen,
      color: "text-secondary",
      status: "Active"
    },
    {
      title: "Office Hours",
      description: "Schedule and manage student consultations",
      icon: Users,
      color: "text-accent",
      status: "Scheduled"
    },
    {
      title: "Research Portal",
      description: "Access research resources and publications",
      icon: FileText,
      color: "text-green-600",
      status: "Available"
    }
  ];

  const currentCourses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      students: 45,
      credits: 3,
      schedule: "Mon, Wed, Fri 10:00 AM",
      room: "A101",
      progress: 75
    },
    {
      id: 2,
      name: "Calculus II",
      students: 38,
      credits: 4,
      schedule: "Tue, Thu 2:00 PM",
      room: "B205",
      progress: 60
    },
    {
      id: 3,
      name: "Linear Algebra",
      students: 32,
      credits: 3,
      schedule: "Wed, Fri 3:00 PM",
      room: "C301",
      progress: 45
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Grade Submission Deadline",
      message: "Final grades for Spring 2024 are due by May 15th",
      type: "deadline",
      time: "3 days ago"
    },
    {
      id: 2,
      title: "Faculty Meeting",
      message: "Monthly faculty meeting scheduled for next Tuesday",
      type: "meeting",
      time: "1 week ago"
    },
    {
      id: 3,
      title: "Research Grant Update",
      message: "Your research grant application has been approved",
      type: "research",
      time: "2 weeks ago"
    }
  ];

  const facultyStats = [
    { label: "Active Courses", value: "3", icon: BookOpen, color: "text-primary" },
    { label: "Total Students", value: "115", icon: Users, color: "text-secondary" },
    { label: "Office Hours", value: "8", icon: Clock, color: "text-accent" },
    { label: "Research Papers", value: "12", icon: FileText, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Faculty Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome, Dr. Sarah Johnson! Access your teaching tools, research resources, and faculty services
          </p>
        </div>

        {/* Faculty Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {facultyStats.map((stat, index) => (
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
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Card 
                    key={action.title}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted ${action.color}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{action.status}</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Access
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Current Courses */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">My Courses</h2>
              <div className="space-y-4">
                {currentCourses.map((course, index) => (
                  <Card 
                    key={course.id}
                    className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.students} students • {course.credits} credits</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Room {course.room}</div>
                          <div className="text-sm text-muted-foreground">{course.schedule}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm">
                            Manage Course
                          </Button>
                          <Button variant="outline" size="sm">
                            View Students
                          </Button>
                          <Button variant="outline" size="sm">
                            Submit Grades
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-primary">
                        <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Faculty Tools</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Student Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Office Hours
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Research Database
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Faculty Directory
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Office Hours</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Monday</div>
                  <div className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Wednesday</div>
                  <div className="text-sm text-muted-foreground">10:00 AM - 12:00 PM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Friday</div>
                  <div className="text-sm text-muted-foreground">1:00 PM - 3:00 PM</div>
                </div>
                <Button variant="outline" className="w-full">
                  Schedule Appointment
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Faculty Support?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our faculty services team is here to support your teaching and research needs. 
            Contact us for assistance with any academic matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Contact Faculty Services
            </Button>
            <Button variant="outline">
              Access Research Resources
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyHub;
