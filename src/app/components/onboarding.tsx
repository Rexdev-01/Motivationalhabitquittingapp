import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Target, Brain, TrendingUp, ShieldCheck } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Target,
    title: "Take Control",
    description: "Start your journey to build discipline and mental clarity, one day at a time.",
    gradient: "from-[#10b981] to-[#059669]"
  },
  {
    icon: Brain,
    title: "Reset Your Mind",
    description: "Break free from unhealthy patterns and reclaim your focus and energy.",
    gradient: "from-[#3b82f6] to-[#2563eb]"
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "See your growth with daily streaks, milestones, and insights.",
    gradient: "from-[#f59e0b] to-[#d97706]"
  },
  {
    icon: ShieldCheck,
    title: "Your Privacy Matters",
    description: "All your data stays private and secure. This is your personal journey.",
    gradient: "from-[#8b5cf6] to-[#7c3aed]"
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 pb-8">
      {/* Skip button */}
      <div className="w-full max-w-md flex justify-end">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col items-center justify-center max-w-md w-full"
      >
        {/* Icon with gradient background */}
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 shadow-lg shadow-${step.gradient}/20`}>
          <Icon className="w-12 h-12 text-white" strokeWidth={2} />
        </div>

        {/* Title */}
        <h1 className="text-center mb-4 text-foreground">{step.title}</h1>

        {/* Description */}
        <p className="text-center text-muted-foreground max-w-sm">
          {step.description}
        </p>
      </motion.div>

      {/* Bottom section */}
      <div className="w-full max-w-md space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-[#10b981]"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button onClick={handleNext} className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
