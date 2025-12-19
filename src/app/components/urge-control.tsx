import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { ArrowLeft, Wind, Timer, Lightbulb, CircleCheck } from "lucide-react";

interface UrgeControlProps {
  onBack: () => void;
}

export function UrgeControl({ onBack }: UrgeControlProps) {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [countdown, setCountdown] = useState(60);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Breathing exercise animation
  useEffect(() => {
    if (activeExercise === "breathing") {
      const breathingCycle = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === "inhale") return "hold";
          if (prev === "hold") return "exhale";
          return "inhale";
        });
      }, 4000);

      return () => clearInterval(breathingCycle);
    }
  }, [activeExercise]);

  // Countdown timer
  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
    }
  }, [isCountdownActive, countdown]);

  const startCountdown = () => {
    setCountdown(60);
    setIsCountdownActive(true);
    setActiveExercise("countdown");
  };

  const reminders = [
    "Remember why you started",
    "This urge will pass in 10-15 minutes",
    "You've come so far already",
    "Your future self is counting on you",
    "Every urge you resist makes you stronger",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-foreground">Urge Control</h2>
            <p className="text-muted-foreground text-sm">You've got this</p>
          </div>
        </div>

        {/* Emergency Message */}
        <Card className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] border-0 p-5 mb-6">
          <div className="text-white space-y-2">
            <h3 className="font-semibold">Stay Strong</h3>
            <p className="text-sm text-white/90">
              Urges are temporary. Use these tools to get through this moment.
            </p>
          </div>
        </Card>

        {/* Tools */}
        <div className="space-y-4">
          {/* Breathing Exercise */}
          <Card className="bg-card border-border overflow-hidden">
            {activeExercise === "breathing" ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-foreground">Box Breathing</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveExercise(null)}
                  >
                    Close
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    animate={{
                      scale: breathPhase === "inhale" ? 1.5 : breathPhase === "hold" ? 1.5 : 0.8,
                      opacity: breathPhase === "exhale" ? 0.5 : 1,
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center"
                  >
                    <Wind className="w-12 h-12 text-white" />
                  </motion.div>

                  <div className="text-center">
                    <p className="text-2xl font-semibold text-foreground capitalize">
                      {breathPhase}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {breathPhase === "inhale" && "Breathe in deeply"}
                      {breathPhase === "hold" && "Hold your breath"}
                      {breathPhase === "exhale" && "Breathe out slowly"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveExercise("breathing")}
                className="w-full p-5 text-left hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-[#3b82f6]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1">Breathing Exercise</h3>
                    <p className="text-sm text-muted-foreground">
                      4 minutes guided breathing
                    </p>
                  </div>
                </div>
              </button>
            )}
          </Card>

          {/* Countdown Timer */}
          <Card className="bg-card border-border overflow-hidden">
            {activeExercise === "countdown" ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-foreground">Wait It Out</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setActiveExercise(null);
                      setIsCountdownActive(false);
                    }}
                  >
                    Close
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center relative"
                    animate={{ rotate: isCountdownActive ? 360 : 0 }}
                    transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {countdown}
                      </div>
                      <div className="text-sm text-white/80">seconds</div>
                    </div>
                  </motion.div>

                  {countdown === 0 ? (
                    <div className="text-center space-y-2">
                      <CircleCheck className="w-8 h-8 text-[#10b981] mx-auto" />
                      <p className="text-foreground font-semibold">Great job!</p>
                      <p className="text-sm text-muted-foreground">
                        You made it through the urge
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center max-w-xs">
                      Focus on this timer. The urge will fade.
                    </p>
                  )}

                  {!isCountdownActive && countdown === 60 && (
                    <Button
                      onClick={() => setIsCountdownActive(true)}
                      className="bg-[#f59e0b] hover:bg-[#d97706] text-white"
                    >
                      Start Timer
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={startCountdown}
                className="w-full p-5 text-left hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1">60 Second Challenge</h3>
                    <p className="text-sm text-muted-foreground">
                      Wait 60 seconds before deciding
                    </p>
                  </div>
                </div>
              </button>
            )}
          </Card>

          {/* Motivational Reminders */}
          <Card className="bg-card border-border p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <h3 className="text-foreground mb-1">Remember</h3>
                <p className="text-sm text-muted-foreground">
                  Quick reminders to stay strong
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {reminders.map((reminder, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-accent/50 border border-border"
                >
                  <p className="text-sm text-foreground">{reminder}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}