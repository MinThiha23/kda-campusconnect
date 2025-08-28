import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Award,
  BookOpen,
  Target,
  BarChart3,
  Calendar,
  Star,
  Users,
  Download,
  Filter,
  Eye,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Performance = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showDetailedView, setShowDetailedView] = useState<number | null>(null);

  const performanceData = [
    {
      id: 1,
      course: "Advanced Mathematics",
      grade: "A+",
      percentage: 95,
      instructor: "Dr. Sarah Johnson",
      assignments: 12,
      completed: 12,
      averageScore: 94.2
    },
    {
      id: 2,
      course: "Computer Science Fundamentals",
      grade: "A",
      percentage: 88,
      instructor: "Prof. Michael Chen",
      assignments: 15,
      completed: 14,
      averageScore: 87.8
    },
    {
      id: 3,
      course: "Business Administration",
      grade: "B+",
      percentage: 82,
      instructor: "Ms. Lisa Wong",
      assignments: 10,
      completed: 9,
      averageScore: 81.5
    },
    {
      id: 4,
      course: "Digital Art & Design",
      grade: "A-",
      percentage: 90,
      instructor: "Mr. Ahmad Rahman",
      assignments: 8,
      completed: 8,
      averageScore: 89.7
    }
  ];

  const overallStats = [
    { label: "Overall GPA", value: "3.8", icon: Award, color: "text-primary" },
    { label: "Courses Enrolled", value: "4", icon: BookOpen, color: "text-secondary" },
    { label: "Assignments Completed", value: "43/45", icon: Target, color: "text-accent" },
    { label: "Average Score", value: "88.3%", icon: TrendingUp, color: "text-green-600" }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600";
      case "A-":
      case "B+":
        return "text-blue-600";
      case "B":
      case "B-":
        return "text-yellow-600";
      case "C+":
      case "C":
        return "text-orange-600";
      default:
        return "text-red-600";
    }
  };

  const getGradeBadge = (grade: string) => {
    const colorClass = getGradeColor(grade);
    return (
      <Badge className={`${colorClass.replace('text-', 'bg-').replace('-600', '-100')} ${colorClass}`}>
        {grade}
      </Badge>
    );
  };

  // Filter performance data
  const filteredPerformance = performanceData.filter(course => 
    selectedCourse === "all" || course.course === selectedCourse
  );

  const handleDownloadTranscript = () => {
    toast({
      title: "Transcript Downloaded!",
      description: "Your academic transcript has been downloaded to your device.",
      variant: "default",
    });
  };

  const handleViewDetails = (courseId: number) => {
    setShowDetailedView(showDetailedView === courseId ? null : courseId);
  };

  const handleRequestTutoring = () => {
    toast({
      title: "Tutoring Request Submitted!",
      description: "A tutor will contact you within 48 hours to schedule a session.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Academic Performance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your academic progress, grades, and performance across all courses
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
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

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by course:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCourse === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCourse("all")}
            >
              All Courses
            </Button>
            {performanceData.map((course) => (
              <Button
                key={course.id}
                variant={selectedCourse === course.course ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCourse(course.course)}
              >
                {course.course}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Course Performance</h2>
            <Button variant="outline" onClick={handleDownloadTranscript}>
              <Download className="h-4 w-4 mr-2" />
              Download Transcript
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredPerformance.map((course, index) => (
              <Card 
                key={course.id}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Course Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{course.course}</h3>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getGradeBadge(course.grade)}
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getGradeColor(course.grade)}`}>
                          {course.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(course.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium">{course.percentage}%</span>
                    </div>
                    <Progress value={course.percentage} className="h-2" />
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{course.assignments}</div>
                      <div className="text-xs text-muted-foreground">Total Assignments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{course.completed}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{course.averageScore}%</div>
                      <div className="text-xs text-muted-foreground">Average Score</div>
                    </div>
                  </div>

                  {/* Detailed View */}
                  {showDetailedView === course.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-3">Assignment Details</h4>
                      <div className="space-y-2">
                        {Array.from({ length: course.assignments }, (_, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">Assignment {i + 1}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">
                                {i < course.completed ? `${85 + Math.floor(Math.random() * 15)}%` : 'Pending'}
                              </span>
                              {i < course.completed ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <Calendar className="h-3 w-3 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>Excellent performance in Mathematics (95%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>Consistent assignment completion (95.6%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>Strong attendance record</span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-foreground">Areas for Improvement</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 text-red-500" />
                  <span>Business Administration needs attention (82%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 text-red-500" />
                  <span>One assignment pending in Computer Science</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 text-red-500" />
                  <span>Consider additional study time for weaker subjects</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Academic Support?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our academic advisors and tutors are here to help you improve your performance. 
            Schedule a consultation to discuss your academic goals and strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              onClick={handleRequestTutoring}
            >
              Schedule Academic Consultation
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Study Resources Accessed!",
                  description: "You can now access additional study materials and practice tests.",
                  variant: "default",
                });
              }}
            >
              Access Study Resources
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Performance;
