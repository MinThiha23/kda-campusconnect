import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Calendar,
  MapPin,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  BarChart3,
  FileText,
  Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockAuth } from "@/lib/mockAuth";

const FacultyCourses = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Faculty's courses - filtered by current user
  const facultyCourses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      duration: "16 weeks",
      students: 45,
      rating: 4.8,
      level: "Advanced",
      schedule: "Mon, Wed, Fri 10:00 AM",
      location: "Room A101",
      description: "Comprehensive course covering calculus, linear algebra, and advanced mathematical concepts.",
      category: "Mathematics",
      status: "Active",
      progress: 75,
      assignments: 8,
      gradesSubmitted: 6
    },
    {
      id: 2,
      title: "Calculus II",
      instructor: "Dr. Sarah Johnson",
      duration: "14 weeks",
      students: 38,
      rating: 4.7,
      level: "Intermediate",
      schedule: "Tue, Thu 2:00 PM",
      location: "Lab B205",
      description: "Advanced calculus concepts including integration techniques and series.",
      category: "Mathematics",
      status: "Active",
      progress: 60,
      assignments: 6,
      gradesSubmitted: 4
    },
    {
      id: 3,
      title: "Linear Algebra",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      students: 32,
      rating: 4.6,
      level: "Intermediate",
      schedule: "Wed, Fri 3:00 PM",
      location: "Room C301",
      description: "Study of vectors, matrices, and linear transformations.",
      category: "Mathematics",
      status: "Active",
      progress: 45,
      assignments: 5,
      gradesSubmitted: 3
    }
  ].filter(course => course.instructor === currentUser?.name);

  const categories = ["All", "Mathematics", "Technology", "Business", "Arts", "Science"];
  const statuses = ["All", "Active", "Completed", "Draft"];

  // Filter courses based on search, category, and status
  const filteredCourses = facultyCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedStatus === "All" || course.status === selectedStatus;
    return matchesSearch && matchesCategory;
  });

  const handleManageCourse = (courseId: number) => {
    toast({
      title: "Course Management",
      description: "Course management features will be available in the next update.",
      variant: "default",
    });
  };

  const handleGradeManagement = (courseId: number) => {
    toast({
      title: "Grade Management",
      description: "Grade management system will be available in the next update.",
      variant: "default",
    });
  };

  const handleAttendanceManagement = (courseId: number) => {
    toast({
      title: "Attendance Management",
      description: "Attendance tracking system will be available in the next update.",
      variant: "default",
    });
  };

  const handleCreateCourse = () => {
    toast({
      title: "Create New Course",
      description: "Course creation feature will be available in the next update.",
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
            My Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage your courses, track student progress, and handle academic responsibilities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{facultyCourses.length}</div>
                <div className="text-sm text-muted-foreground">Active Courses</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {facultyCourses.reduce((sum, course) => sum + course.students, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-accent">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {facultyCourses.reduce((sum, course) => sum + course.assignments, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Assignments</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-muted text-yellow-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {facultyCourses.reduce((sum, course) => sum + course.gradesSubmitted, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Grades Submitted</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCourses.map((course, index) => (
            <Card 
              key={course.id}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Course Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Details */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students enrolled</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{course.schedule}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{course.location}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    variant="hero" 
                    className="w-full"
                    onClick={() => handleManageCourse(course.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Manage Course
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGradeManagement(course.id)}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      Grades
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAttendanceManagement(course.id)}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Attendance
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need to Create a New Course?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Set up new courses, manage curriculum, and track student progress with our comprehensive course management tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              onClick={handleCreateCourse}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Support Request Sent!",
                  description: "Our academic support team will contact you within 24 hours.",
                  variant: "default",
                });
              }}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyCourses;

