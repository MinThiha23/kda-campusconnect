import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Award,
  Bell,
  Settings
} from "lucide-react";

const StudentPortal = () => {
  const quickActions = [
    {
      title: "Course Registration",
      description: "Register for upcoming semester courses",
      icon: BookOpen,
      color: "text-primary",
      status: "Open"
    },
    {
      title: "View Grades",
      description: "Check your current academic performance",
      icon: Award,
      color: "text-secondary",
      status: "Available"
    },
    {
      title: "Financial Aid",
      description: "Apply for scholarships and financial assistance",
      icon: DollarSign,
      color: "text-accent",
      status: "Open"
    },
    {
      title: "Academic Calendar",
      description: "View important dates and deadlines",
      icon: Calendar,
      color: "text-green-600",
      status: "Updated"
    }
  ];

  const currentCourses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      credits: 3,
      grade: "A+",
      progress: 85,
      nextClass: "Mon, 10:00 AM"
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      instructor: "Prof. Michael Chen",
      credits: 4,
      grade: "A",
      progress: 72,
      nextClass: "Tue, 2:00 PM"
    },
    {
      id: 3,
      name: "Business Administration",
      instructor: "Ms. Lisa Wong",
      credits: 3,
      grade: "B+",
      progress: 60,
      nextClass: "Wed, 3:00 PM"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Course Registration Deadline",
      message: "Last day to register for Spring 2024 courses is January 31st",
      type: "deadline",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "New Grade Posted",
      message: "Your grade for Advanced Mathematics has been updated",
      type: "grade",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Financial Aid Update",
      message: "Your scholarship application has been approved",
      type: "financial",
      time: "2 days ago"
    }
  ];

  const academicStats = [
    { label: "Current GPA", value: "3.8", icon: Star, color: "text-primary" },
    { label: "Credits Completed", value: "87", icon: GraduationCap, color: "text-secondary" },
    { label: "Courses This Semester", value: "4", icon: BookOpen, color: "text-accent" },
    { label: "Attendance Rate", value: "94%", icon: TrendingUp, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Student Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome back! Access your academic information, courses, and student services
          </p>
        </div>

        {/* Academic Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {academicStats.map((stat, index) => (
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
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Courses</h2>
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
                            <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{course.grade}</div>
                          <div className="text-sm text-muted-foreground">{course.credits} credits</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Course Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Next Class: {course.nextClass}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
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
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Academic Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Class Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Tuition & Fees
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Academic Advisor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </Card>

            {/* Important Dates */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Course Registration Deadline</div>
                  <div className="text-sm text-muted-foreground">January 31, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Midterm Examinations</div>
                  <div className="text-sm text-muted-foreground">February 15-20, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Spring Break</div>
                  <div className="text-sm text-muted-foreground">March 10-15, 2024</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground">Final Examinations</div>
                  <div className="text-sm text-muted-foreground">May 1-10, 2024</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Academic Support?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our academic advisors and support services are here to help you succeed. 
            Schedule a consultation or access our resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Schedule Academic Consultation
            </Button>
            <Button variant="outline">
              Access Student Resources
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentPortal;
