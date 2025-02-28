
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from "@/lib/firebase";
import { User } from "firebase/auth";

// Define types
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

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Firebase login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Welcome back",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Failed to login";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Add the user's name
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
      });
    }
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
