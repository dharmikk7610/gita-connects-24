
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { initializeMeditationDatabase } from "@/services/meditationService";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Stories from "./pages/Stories";
import Facts from "./pages/Facts";
import Quizzes from "./pages/Quizzes";
import MeditationPortal from "./pages/MeditationPortal";
import SacredTimeline from "./pages/SacredTimeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check for dark mode preference on initial load
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Initialize the database with sample data (in a real app, this would be done in a separate admin script)
    const initializeData = async () => {
      try {
        await initializeMeditationDatabase();
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/stories" element={<Stories />} />
              <Route path="/facts" element={<Facts />} />
              <Route path="/quizzes" element={
                <ProtectedRoute>
                  <Quizzes />
                </ProtectedRoute>
              } />
              <Route path="/meditation" element={
                <ProtectedRoute>
                  <MeditationPortal />
                </ProtectedRoute>
              } />
              <Route path="/timeline" element={<SacredTimeline />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
