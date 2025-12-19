import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ShieldCheck, CircleUser } from "lucide-react";

interface AuthProps {
  onAuth: () => void;
}

export function Auth({ onAuth }: AuthProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAnonymous = () => {
    onAuth();
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-foreground">Clarity</h1>
          <p className="text-muted-foreground">Your journey to discipline starts here</p>
        </div>

        {/* Auth Card */}
        {!isAnonymous ? (
          <Card className="p-6 space-y-6 bg-card border-border">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-card-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-card-foreground">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
                Continue
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              onClick={handleAnonymous}
              variant="outline"
              className="w-full border-border"
            >
              <CircleUser className="w-4 h-4 mr-2" />
              Continue Anonymously
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Your data is private and secure. We never share your information.
            </p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}