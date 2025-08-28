// Mock authentication service for testing frontend functionality
export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
}

export interface MockAuthResponse {
  user: MockUser | null;
  error: string | null;
}

// Mock user database
const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'student@kdacademy.edu.my',
    name: 'Ahmad Rahman',
    role: 'student',
    avatar: 'AR'
  },
  {
    id: '2',
    email: 'faculty@kdacademy.edu.my',
    name: 'Dr. Sarah Johnson',
    role: 'faculty',
    avatar: 'SJ'
  },
  {
    id: '3',
    email: 'admin@kdacademy.edu.my',
    name: 'Admin User',
    role: 'admin',
    avatar: 'AU'
  }
];

// Mock authentication service
export const mockAuth = {
  // Simulate login with delay
  signInWithPassword: async (email: string, password: string): Promise<MockAuthResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    
    // Mock password validation (any password works for testing)
    if (user && password.length > 0) {
      // Store user in localStorage for persistence
      localStorage.setItem('mockUser', JSON.stringify(user));
      return { user, error: null };
    }
    
    return { 
      user: null, 
      error: 'Invalid email or password. Try: student@kdacademy.edu.my' 
    };
  },

  // Get current user
  getCurrentUser: (): MockUser | null => {
    const userStr = localStorage.getItem('mockUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Sign out
  signOut: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('mockUser');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('mockUser');
  }
};
