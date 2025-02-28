
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

interface AuthRequiredProps {
  message: string;
  ctaText: string;
}

const AuthRequired = ({ message, ctaText }: AuthRequiredProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-deepBlue-600/30 rounded-lg shadow-xl overflow-hidden divine-card">
      <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900/20 rounded-full flex items-center justify-center mb-6">
        <LockKeyhole className="h-8 w-8 text-gold-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-deepBlue-600 dark:text-gold-300 mb-3">
        Authentication Required
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
        {message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={openSignupModal} 
          className="bg-gold-500 hover:bg-gold-600 text-white flex items-center"
        >
          Sign Up
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          onClick={openLoginModal} 
          variant="outline"
          className="border-gold-300 hover:border-gold-500 text-deepBlue-600 dark:text-gold-300"
        >
          Login
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        After {ctaText}, you'll have full access to all features
      </p>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToSignup={switchToSignup}
      />
      
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
};

export default AuthRequired;
