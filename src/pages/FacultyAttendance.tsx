import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  BarChart3,
  TrendingUp,
  TrendingDown,
  FileText,
  MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockAuth } from "@/lib/mockAuth";

const FacultyAttendance = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Mock attendance data for faculty's courses
  const attendanceData = [
    {
      id: 1,
      studentName: "John Smith",
      studentId: "STU001",
      course: "Advanced Mathematics",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "present",
      room: "A101",
      instructor: "Dr. Sarah Johnson",
      notes: ""
    },
    {
      id: 2,
      studentName: "Emily Johnson",
      studentId: "STU002",
      course: "Advanced Mathematics",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "present",
      room: "A101",
      instructor: "Dr. Sarah Johnson",
      notes: ""
    },
    {
      id: 3,
      studentName: "Michael Chen",
      studentId: "STU003",
      course: "Calculus II",
      date: "2024-01-16",
      time: "2:00 PM",
      status: "late",
      room: "Lab B205",
      instructor: "Dr. Sarah Johnson",
      notes: "Arrived 15 minutes late"
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      studentId: "STU004",
      course: "Linear Algebra",
      date: "2024-01-17",
      time: "3:00 PM",
      status: "absent",
      room: "C301",
      instructor: "Dr. Sarah Johnson",
      notes: "No prior notification"
    },
    {
      id: 5,
      studentName: "David Brown",
      studentId: "STU005",
      course: "Advanced Mathematics",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "present",
      room: "A101",
      instructor: "Dr. Sarah Johnson",
      notes: ""
    },
    {
      id: 6,
      studentName: "Lisa Wang",
      studentId: "STU006",
      course: "Calculus II",
      date: "2024-01-16",
      time: "2:00 PM",
      status: "present",
      room: "Lab B205",
      instructor: "Dr. Sarah Johnson",
      notes: ""
    }
  ].filter(item => {
    // Filter by faculty's courses
    const facultyCourses = ["Advanced Mathematics", "Calculus II", "Linear Algebra"];
    return facultyCourses.includes(item.course);
  });

  const courses = ["All", ...Array.from(new Set(attendanceData.map(item => item.course)))];
  const dates = ["All", ...Array.from(new Set(attendanceData.map(item => item.date)))];

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "All" || item.course === selectedCourse;
    const matchesDate = selectedDate === "All" || item.date === selectedDate;
    return matchesSearch && matchesCourse && matchesDate;
  });

  const stats = [
    {
      title: "Total Sessions",
      value: Array.from(new Set(attendanceData.map(item => `${item.course}-${item.date}`))).length.toString(),
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Present Rate",
      value: `${Math.round((attendanceData.filter(item => item.status === "present").length / attendanceData.length) * 100)}%`,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Absent",
      value: attendanceData.filter(item => item.status === "absent").length.toString(),
      icon: XCircle,
      color: "text-red-600"
    },
    {
      title: "Late",
      value: attendanceData.filter(item => item.status === "late").length.toString(),
      icon: AlertCircle,
      color: "text-yellow-600"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleEditAttendance = (attendanceId: number) => {
    toast({
      title: "Edit Attendance",
      description: "Attendance editing functionality will be available in the next update.",
      variant: "default",
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Bulk attendance upload functionality will be available in the next update.",
      variant: "default",
    });
  };

  const handleExportAttendance = () => {
    toast({
      title: "Export Attendance",
      description: "Attendance export functionality will be available in the next update.",
      variant: "default",
    });
  };

  const handleTakeAttendance = () => {
    toast({
      title: "Take Attendance",
      description: "Real-time attendance tracking will be available in the next update.",
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
            Attendance Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track student attendance, manage absences, and monitor class participation
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
              placeholder="Search students..."
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

        {/* Date Filter */}
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by Date:</span>
          <div className="flex gap-2 flex-wrap">
            {dates.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedDate(date)}
              >
                {date === "All" ? "All Dates" : new Date(date).toLocaleDateString()}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="hero" onClick={handleTakeAttendance}>
            <Calendar className="h-4 w-4 mr-2" />
            Take Attendance
          </Button>
          <Button variant="outline" onClick={handleBulkUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="outline" onClick={handleExportAttendance}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Attendance Table */}
        <Card className="p-6 bg-gradient-card border-0 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium">Course</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Room</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((attendance, index) => (
                  <tr key={attendance.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{attendance.studentName}</div>
                        <div className="text-sm text-muted-foreground">{attendance.studentId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-xs">
                        {attendance.course}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {new Date(attendance.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{attendance.time}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(attendance.status)}
                        {getStatusBadge(attendance.status)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{attendance.room}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditAttendance(attendance.id)}
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

        {/* Attendance Summary */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-bold text-foreground mb-4">Attendance Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Present Rate</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Absent Rate</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="font-medium">10%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Late Rate</span>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">5%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Attendance Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Absence Letters
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Contact Absent Students
              </Button>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Attendance Management?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our academic support team can help with attendance policies, reporting, and technical assistance.
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
              <Calendar className="h-4 w-4 mr-2" />
              Contact Academic Support
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Attendance Policies",
                  description: "Attendance policies and guidelines will be available in the next update.",
                  variant: "default",
                });
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Policies
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacultyAttendance;

