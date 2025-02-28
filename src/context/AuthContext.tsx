
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load user from local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("gitasangam_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("gitasangam_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to validate credentials
      if (email === "user@example.com" && password === "password") {
        const mockUser: User = {
          id: "user-1",
          name: "Demo User",
          email: email,
          avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
        };
        
        setUser(mockUser);
        localStorage.setItem("gitasangam_user", JSON.stringify(mockUser));
        
        toast({
          title: "Welcome back",
          description: "You have successfully logged in.",
        });
        
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error.message,
        });
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to create a new user
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      };
      
      setUser(mockUser);
      localStorage.setItem("gitasangam_user", JSON.stringify(mockUser));
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error.message,
        });
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("gitasangam_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
