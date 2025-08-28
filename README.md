# 🎓 KD Academy Campus Connect

A modern, interactive campus management system built with React, TypeScript, and Tailwind CSS. This comprehensive platform provides students, faculty, and administrators with tools for course management, attendance tracking, performance monitoring, and community engagement.

## ✨ Features

### 🏠 **Home Dashboard**
- Welcome page with key statistics
- Quick access to main features
- Modern, responsive design

### 📚 **Course Management**
- **Course Catalog**: Browse and search available courses
- **Interactive Enrollment**: Enroll in courses with confirmation modals
- **Course Filtering**: Filter by category (Mathematics, Technology, Business, Arts, Science)
- **Real-time Search**: Search courses by title, instructor, or description

### 📊 **Attendance Tracking**
- **Attendance Records**: View and track class attendance
- **Status Filtering**: Filter by Present, Absent, Late, or All
- **Export Functionality**: Download attendance reports
- **Visual Indicators**: Color-coded status badges

### 📈 **Performance Monitoring**
- **Academic Performance**: Track grades and progress across courses
- **Detailed Analytics**: View assignment breakdowns and scores
- **Course Filtering**: Filter performance by specific courses
- **Transcript Download**: Export academic transcripts

### 👥 **Community Features**
- **Community Feed**: Social posts from students and faculty
- **Interactive Posts**: Like, share, and comment on posts
- **Event Management**: Join upcoming campus events
- **Study Groups**: Create and manage study groups
- **Real-time Engagement**: Live interaction with community content

### 🎯 **Additional Pages**
- **Academic Calendar**: View important dates and events
- **Online Learning**: Access digital learning resources
- **Student Resources**: Library of academic support materials
- **Enrollment Portal**: Streamlined enrollment process
- **Support Center**: Help and support resources
- **Student Portal**: Personalized student dashboard
- **Faculty Hub**: Faculty-specific tools and resources
- **Alumni Network**: Connect with graduates
- **Events**: Campus events and activities

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm
- **Authentication**: Mock authentication system (ready for Supabase integration)
- **State Management**: React hooks and context
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kda-campusconnect.git
   cd kda-campusconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
kda-campusconnect/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navigation.tsx  # Main navigation
│   │   ├── Footer.tsx      # Footer component
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Courses.tsx     # Course catalog
│   │   ├── Attendance.tsx  # Attendance tracking
│   │   ├── Performance.tsx # Performance monitoring
│   │   ├── Community.tsx   # Community features
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── integrations/       # External service integrations
│   └── assets/             # Static assets
├── public/                 # Public assets
├── supabase/              # Supabase configuration
└── ...
```

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS:

- **Color Palette**: Primary, secondary, accent, and semantic colors
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Integration
The system is prepared for Supabase integration:
- Database schema in `supabase/migrations/`
- Client configuration in `src/integrations/supabase/`
- Type definitions for database entities

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

For support and questions:
- Email: support@kdacademy.edu.my
- Phone: +60 3-1234 5678
- Website: https://kdacademy.edu.my

---

**Built with ❤️ for KD Academy**
