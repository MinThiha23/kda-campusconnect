import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BookOpen,
  Download,
  Filter
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const attendanceData = [
    {
      id: 1,
      course: "Advanced Mathematics",
      date: "2024-01-15",
      status: "present",
      time: "10:00 AM",
      instructor: "Dr. Sarah Johnson",
      room: "A101"
    },
    {
      id: 2,
      course: "Computer Science Fundamentals",
      date: "2024-01-16",
      status: "present",
      time: "2:00 PM",
      instructor: "Prof. Michael Chen",
      room: "Lab B205"
    },
    {
      id: 3,
      course: "Business Administration",
      date: "2024-01-17",
      status: "absent",
      time: "3:00 PM",
      instructor: "Ms. Lisa Wong",
      room: "C301"
    },
    {
      id: 4,
      course: "Digital Art & Design",
      date: "2024-01-18",
      status: "late",
      time: "9:00 AM",
      instructor: "Mr. Ahmad Rahman",
      room: "Studio D104"
    }
  ];

  const stats = [
    { label: "Total Classes", value: "24", icon: Calendar, color: "text-primary" },
    { label: "Present", value: "20", icon: CheckCircle, color: "text-green-600" },
    { label: "Absent", value: "3", icon: XCircle, color: "text-red-600" },
    { label: "Late", value: "1", icon: AlertCircle, color: "text-yellow-600" }
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

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(record => {
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    const matchesCourse = selectedCourse === "all" || record.course === selectedCourse;
    return matchesStatus && matchesCourse;
  });

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded!",
      description: "Your attendance report has been downloaded to your device.",
      variant: "default",
    });
  };

  const handleRequestAbsence = () => {
    toast({
      title: "Absence Request Submitted!",
      description: "Your absence request has been sent to your instructor for approval.",
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
            Attendance Tracking
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor your class attendance and track your learning progress
          </p>
        </div>

        {/* Stats Cards */}
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

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              All Status
            </Button>
            <Button
              variant={selectedStatus === "present" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("present")}
            >
              Present
            </Button>
            <Button
              variant={selectedStatus === "absent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("absent")}
            >
              Absent
            </Button>
            <Button
              variant={selectedStatus === "late" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("late")}
            >
              Late
            </Button>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Recent Attendance</h2>
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredAttendance.map((record, index) => (
              <Card 
                key={record.id}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-soft transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{record.course}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {record.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {record.instructor}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {record.room}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(record.status)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-8 shadow-card mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Help with Attendance?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you notice any discrepancies in your attendance records or need to report an issue, 
            please contact your academic advisor or course instructor.
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
              onClick={handleRequestAbsence}
            >
              Request Absence
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Attendance;
