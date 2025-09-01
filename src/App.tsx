import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Performance from "./pages/Performance";
import Community from "./pages/Community";
import AcademicCalendar from "./pages/AcademicCalendar";
import OnlineLearning from "./pages/OnlineLearning";
import StudentResources from "./pages/StudentResources";
import Enrollment from "./pages/Enrollment";
import SupportCenter from "./pages/SupportCenter";
import StudentPortal from "./pages/StudentPortal";
import FacultyHub from "./pages/FacultyHub";
import FacultyCourses from "./pages/FacultyCourses";
import FacultyGrades from "./pages/FacultyGrades";
import FacultyAttendance from "./pages/FacultyAttendance";
import AdminDashboard from "./pages/AdminDashboard";
import AlumniNetwork from "./pages/AlumniNetwork";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Force deployment update - Vercel deployment fix
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/community" element={<Community />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/online-learning" element={<OnlineLearning />} />
          <Route path="/student-resources" element={<StudentResources />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/support-center" element={<SupportCenter />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/faculty-hub" element={<FacultyHub />} />
          <Route path="/faculty/courses" element={<FacultyCourses />} />
          <Route path="/faculty/grades" element={<FacultyGrades />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/alumni-network" element={<AlumniNetwork />} />
          <Route path="/events" element={<Events />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
