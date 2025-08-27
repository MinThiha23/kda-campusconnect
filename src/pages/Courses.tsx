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
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Courses = () => {
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
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
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
                  
                  <Button size="sm" variant="hero" className="group-hover:scale-105 transition-transform">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Enroll Now
                  </Button>
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
            <Button variant="hero">
              Contact Academic Advisor
            </Button>
            <Button variant="outline">
              Request New Course
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;