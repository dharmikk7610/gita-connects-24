
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // Show loading state if authentication is still being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to home page
  if (!isAuthenticated) {
    // Show a toast notification
    toast({
      variant: "destructive",
      title: "Authentication required",
      description: "Please login to access this page",
    });
    
    // Redirect to home page, but save the current location they were trying to access
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If user is authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
