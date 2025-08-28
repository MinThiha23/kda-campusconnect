import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play,
  BookOpen,
  Users,
  Clock,
  Star,
  Download,
  Video,
  FileText,
  Headphones,
  Monitor
} from "lucide-react";

const OnlineLearning = () => {
  const onlineCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Prof. Michael Chen",
      duration: "8 weeks",
      students: 156,
      rating: 4.8,
      progress: 75,
      thumbnail: "web-dev",
      category: "Technology",
      description: "Learn HTML, CSS, and JavaScript fundamentals for modern web development.",
      modules: [
        { title: "HTML Basics", duration: "2 hours", completed: true },
        { title: "CSS Styling", duration: "3 hours", completed: true },
        { title: "JavaScript Fundamentals", duration: "4 hours", completed: true },
        { title: "Responsive Design", duration: "3 hours", completed: false },
        { title: "Project: Portfolio Website", duration: "6 hours", completed: false }
      ]
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Ms. Lisa Wong",
      duration: "6 weeks",
      students: 89,
      rating: 4.6,
      progress: 45,
      thumbnail: "marketing",
      category: "Business",
      description: "Master the basics of digital marketing including SEO, social media, and content strategy.",
      modules: [
        { title: "Marketing Principles", duration: "2 hours", completed: true },
        { title: "SEO Basics", duration: "3 hours", completed: true },
        { title: "Social Media Marketing", duration: "4 hours", completed: false },
        { title: "Content Strategy", duration: "3 hours", completed: false },
        { title: "Analytics & Reporting", duration: "2 hours", completed: false }
      ]
    },
    {
      id: 3,
      title: "Data Science Essentials",
      instructor: "Dr. Sarah Johnson",
      duration: "10 weeks",
      students: 203,
      rating: 4.9,
      progress: 20,
      thumbnail: "data-science",
      category: "Science",
      description: "Introduction to data analysis, statistics, and machine learning concepts.",
      modules: [
        { title: "Python Basics", duration: "3 hours", completed: true },
        { title: "Data Analysis with Pandas", duration: "4 hours", completed: false },
        { title: "Statistical Analysis", duration: "5 hours", completed: false },
        { title: "Data Visualization", duration: "3 hours", completed: false },
        { title: "Machine Learning Intro", duration: "6 hours", completed: false }
      ]
    }
  ];

  const learningResources = [
    {
      id: 1,
      title: "Study Guide: Mathematics Fundamentals",
      type: "PDF",
      size: "2.4 MB",
      downloads: 234,
      icon: FileText
    },
    {
      id: 2,
      title: "Video Tutorial: Advanced Calculus",
      type: "Video",
      size: "45.2 MB",
      downloads: 156,
      icon: Video
    },
    {
      id: 3,
      title: "Audio Lecture: Business Ethics",
      type: "Audio",
      size: "12.8 MB",
      downloads: 89,
      icon: Headphones
    },
    {
      id: 4,
      title: "Interactive Quiz: Computer Science",
      type: "Quiz",
      size: "1.2 MB",
      downloads: 312,
      icon: Monitor
    }
  ];

  const stats = [
    { label: "Active Courses", value: "12", icon: BookOpen, color: "text-primary" },
    { label: "Total Students", value: "1,247", icon: Users, color: "text-secondary" },
    { label: "Learning Hours", value: "156", icon: Clock, color: "text-accent" },
    { label: "Average Rating", value: "4.7", icon: Star, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Online Learning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access your courses, learning materials, and track your progress from anywhere
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
              <Button variant="hero">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Courses
              </Button>
            </div>

            <div className="space-y-6">
              {onlineCourses.map((course, index) => (
                <Card 
                  key={course.id}
                  className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    {/* Course Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </span>
                            <span className="flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              {course.rating} ({course.students} students)
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {/* Modules */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Course Modules</h4>
                      <div className="space-y-2">
                        {course.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className="text-sm text-foreground">{module.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{module.duration}</span>
                              {module.completed && <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Resources */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Learning Resources</h3>
              <div className="space-y-3">
                {learningResources.map((resource) => (
                  <div key={resource.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="p-2 rounded-lg bg-background">
                      <resource.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{resource.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                        <span>•</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Courses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Materials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Study Groups
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Learning Schedule
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Online Learning?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our technical support team is available 24/7 to help you with any online learning platform issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              Contact Technical Support
            </Button>
            <Button variant="outline">
              View Learning Guide
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OnlineLearning;
