
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-deepBlue-600/95 border border-gold-200 dark:border-gold-800/30 divine-card">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-deepBlue-600 dark:text-gold-300">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Sign in to continue your spiritual journey
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="divine-input"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Button type="button" variant="link" className="text-xs text-gold-500 p-0">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="divine-input"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Button type="button" variant="link" className="text-gold-500 p-0" onClick={onSwitchToSignup}>
              Sign Up
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
