import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Award,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockAuth } from "@/lib/mockAuth";

const FacultyGrades = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Mock grade data for faculty's courses
  const gradeData = [
    {
      id: 1,
      studentName: "John Smith",
      studentId: "STU001",
      course: "Advanced Mathematics",
      assignment: "Midterm Exam",
      grade: 85,
      maxGrade: 100,
      percentage: 85,
      status: "submitted",
      submittedDate: "2024-01-15",
      dueDate: "2024-01-15",
      feedback: "Good work on calculus problems, needs improvement on linear algebra"
    },
    {
      id: 2,
      studentName: "Emily Johnson",
      studentId: "STU002",
      course: "Advanced Mathematics",
      assignment: "Midterm Exam",
      grade: 92,
      maxGrade: 100,
      percentage: 92,
      status: "submitted",
      submittedDate: "2024-01-15",
      dueDate: "2024-01-15",
      feedback: "Excellent work across all topics"
    },
    {
      id: 3,
      studentName: "Michael Chen",
      studentId: "STU003",
      course: "Calculus II",
      assignment: "Integration Assignment",
      grade: 78,
      maxGrade: 100,
      percentage: 78,
      status: "submitted",
      submittedDate: "2024-01-14",
      dueDate: "2024-01-14",
      feedback: "Good effort, review integration techniques"
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      studentId: "STU004",
      course: "Linear Algebra",
      assignment: "Matrix Operations",
      grade: 0,
      maxGrade: 100,
      percentage: 0,
      status: "pending",
      submittedDate: null,
      dueDate: "2024-01-20",
      feedback: ""
    },
    {
      id: 5,
      studentName: "David Brown",
      studentId: "STU005",
      course: "Advanced Mathematics",
      assignment: "Final Project",
      grade: 88,
      maxGrade: 100,
      percentage: 88,
      status: "submitted",
      submittedDate: "2024-01-10",
      dueDate: "2024-01-10",
      feedback: "Creative approach to the problem, well documented"
    }
  ].filter(item => {
    // Filter by faculty's courses
    const facultyCourses = ["Advanced Mathematics", "Calculus II", "Linear Algebra"];
    return facultyCourses.includes(item.course);
  });

  const courses = ["All", ...Array.from(new Set(gradeData.map(item => item.course)))];
  const statuses = ["All", "submitted", "pending", "late"];

  // Filter grade data
  const filteredGrades = gradeData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "All" || item.course === selectedCourse;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const stats = [
    {
      title: "Total Assignments",
      value: gradeData.length.toString(),
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Average Grade",
      value: `${Math.round(gradeData.filter(item => item.grade > 0).reduce((sum, item) => sum + item.percentage, 0) / gradeData.filter(item => item.grade > 0).length || 0)}%`,
      icon: Award,
      color: "text-green-600"
    },
    {
      title: "Pending Reviews",
      value: gradeData.filter(item => item.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Students",
      value: Array.from(new Set(gradeData.map(item => item.studentId))).length.toString(),
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "late":
        return <Badge className="bg-red-100 text-red-800">Late</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleEditGrade = (gradeId: number) => {
    toast({
      title: "Edit Grade",
      description: "Grade editing functionality will be available in the next update.",
      variant: "default",
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Bulk grade upload functionality will be available in the next update.",
      variant: "default",
    });
  };

  const handleExportGrades = () => {
    toast({
      title: "Export Grades",
      description: "Grade export functionality will be available in the next update.",
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
            Grade Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage student grades, provide feedback, and track academic performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title}
              className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students, assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2 flex-wrap">
              {courses.map((course) => (
                <Button
                  key={course}
                  variant={selectedCourse === course ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedCourse(course)}
                >
                  {course}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="hero" onClick={handleBulkUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload Grades
          </Button>
          <Button variant="outline" onClick={handleExportGrades}>
            <Download className="h-4 w-4 mr-2" />
            Export Grades
          </Button>
        </div>

        {/* Grade Table */}
        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium">Course</th>
                  <th className="text-left py-3 px-4 font-medium">Assignment</th>
                  <th className="text-left py-3 px-4 font-medium">Grade</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade, index) => (
                  <tr key={grade.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{grade.studentName}</div>
                        <div className="text-sm text-muted-foreground">{grade.studentId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-xs">
                        {grade.course}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{grade.assignment}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-bold ${getGradeColor(grade.percentage)}`}>
                        {grade.grade > 0 ? `${grade.grade}/${grade.maxGrade}` : "Not graded"}
                      </div>
                      {grade.grade > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {grade.percentage}%
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(grade.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {new Date(grade.dueDate).toLocaleDateString()}
                      </div>
                      {grade.submittedDate && (
                        <div className="text-xs text-muted-foreground">
                          Submitted: {new Date(grade.submittedDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditGrade(grade.id)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Grade Management?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our academic support team is here to help with grading policies, feedback strategies, and technical assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              onClick={() => {
                toast({
                  title: "Support Request Sent!",
                  description: "Our academic support team will contact you within 24 hours.",
                  variant: "default",
                });
              }}
            >
              <Award className="h-4 w-4 mr-2" />
              Contact Academic Support
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Grading Guidelines",
                  description: "Grading guidelines and policies will be available in the next update.",
                  variant: "default",
                });
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Guidelines
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyGrades;

