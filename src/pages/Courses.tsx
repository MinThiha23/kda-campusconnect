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
  XCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockAuth } from "@/lib/mockAuth";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>(() => {
    // Load enrolled courses from localStorage
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : [];
  });
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Save enrolled courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // Check user role on component mount
  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
    
    // Redirect faculty to their specific course view
    if (user?.role === 'faculty') {
      navigate('/faculty/courses');
    }
  }, [navigate]);

  const courses = [
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
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Computer Science Fundamentals",
      instructor: "Prof. Michael Chen",
      duration: "12 weeks",
      students: 38,
      rating: 4.9,
      level: "Beginner",
      schedule: "Tue, Thu 2:00 PM",
      location: "Lab B205",
      description: "Introduction to programming, algorithms, and computer science principles.",
      category: "Technology",
      color: "bg-secondary"
    },
    {
      id: 3,
      title: "Business Administration",
      instructor: "Ms. Lisa Wong",
      duration: "14 weeks",
      students: 52,
      rating: 4.7,
      level: "Intermediate",
      schedule: "Mon, Wed 3:00 PM",
      location: "Room C301",
      description: "Core business concepts including management, marketing, and financial planning.",
      category: "Business",
      color: "bg-accent"
    },
    {
      id: 4,
      title: "Digital Art & Design",
      instructor: "Mr. Ahmad Rahman",
      duration: "10 weeks",
      students: 28,
      rating: 4.6,
      level: "Intermediate",
      schedule: "Fri 9:00 AM - 12:00 PM",
      location: "Studio D104",
      description: "Creative course focusing on digital illustration, graphic design, and multimedia.",
      category: "Arts",
      color: "bg-primary"
    }
  ];

  const categories = ["All", "Mathematics", "Technology", "Business", "Arts", "Science"];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (course: any) => {
    setSelectedCourse(course);
    setShowEnrollmentModal(true);
  };

  const confirmEnrollment = () => {
    if (selectedCourse) {
      setEnrolledCourses(prev => [...prev, selectedCourse.id]);
      toast({
        title: "Enrollment Successful!",
        description: `You have been enrolled in ${selectedCourse.title}. Check your email for course details.`,
        variant: "default",
      });
      setShowEnrollmentModal(false);
      setSelectedCourse(null);
    }
  };

  const cancelEnrollment = () => {
    setShowEnrollmentModal(false);
    setSelectedCourse(null);
  };

  const handleUnenroll = (courseId: number) => {
    setEnrolledCourses(prev => prev.filter(id => id !== courseId));
    toast({
      title: "Unenrolled Successfully!",
      description: "You have been unenrolled from this course.",
      variant: "default",
    });
  };

  const clearAllEnrollments = () => {
    if (confirm("Are you sure you want to unenroll from all courses?")) {
      setEnrolledCourses([]);
      toast({
        title: "All Enrollments Cleared!",
        description: "You have been unenrolled from all courses.",
        variant: "default",
      });
    }
  };

  const isEnrolled = (courseId: number) => enrolledCourses.includes(courseId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Course Catalog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of courses designed to enhance your academic journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollment Status */}
        {enrolledCourses.length > 0 && (
          <div className="flex items-center justify-between mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Enrolled in {enrolledCourses.length} course{enrolledCourses.length > 1 ? 's' : ''}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllEnrollments}
              className="text-xs text-red-600 border-red-600 hover:bg-red-50"
            >
              Clear All Enrollments
            </Button>
          </div>
        )}

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

                {/* Instructor */}
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary-foreground">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">{course.instructor}</span>
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

                {/* Level Badge */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${course.level === 'Beginner' ? 'border-secondary text-secondary' : 
                      course.level === 'Intermediate' ? 'border-accent text-accent' : 
                      'border-primary text-primary'}`}
                  >
                    {course.level}
                  </Badge>
                  
                  {isEnrolled(course.id) ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-green-600 border-green-600 hover:bg-red-50 hover:border-red-600 hover:text-red-600"
                      onClick={() => handleUnenroll(course.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enrolled
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="hero" 
                      className="group-hover:scale-105 transition-transform"
                      onClick={() => handleEnroll(course)}
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Enroll Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're constantly adding new courses based on student interests and industry demands. 
            Contact our academic advisors for personalized course recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              onClick={() => {
                toast({
                  title: "Contact Request Sent!",
                  description: "An academic advisor will contact you within 24 hours.",
                  variant: "default",
                });
              }}
            >
              Contact Academic Advisor
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Course Request Submitted!",
                  description: "We'll review your request and add it to our catalog if feasible.",
                  variant: "default",
                });
              }}
            >
              Request New Course
            </Button>
          </div>
        </div>
      </main>

      {/* Enrollment Confirmation Modal */}
      {showEnrollmentModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Confirm Enrollment</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEnrollment}
                className="h-8 w-8 p-0"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground">{selectedCourse.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedCourse.instructor}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span>Duration: {selectedCourse.duration}</span>
                  <span>Level: {selectedCourse.level}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                By enrolling in this course, you agree to attend all scheduled sessions and complete required assignments.
              </p>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={cancelEnrollment}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmEnrollment}
                  className="flex-1"
                >
                  Confirm Enrollment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Courses;