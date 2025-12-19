import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Crown,
  Sparkles,
  Lock,
  CircleCheck,
} from "lucide-react";

interface GoalsProps {
  onBack: () => void;
  currentStreak: number;
}

const milestones = [
  {
    days: 1,
    title: "First Step",
    description: "You started your journey",
    icon: Sparkles,
    color: "from-[#10b981] to-[#059669]",
    reward: "Foundation Badge",
  },
  {
    days: 3,
    title: "Three Days Strong",
    description: "Building momentum",
    icon: Medal,
    color: "from-[#3b82f6] to-[#2563eb]",
    reward: "Momentum Badge",
  },
  {
    days: 7,
    title: "One Week",
    description: "First major milestone",
    icon: Award,
    color: "from-[#8b5cf6] to-[#7c3aed]",
    reward: "Week Warrior",
  },
  {
    days: 14,
    title: "Two Weeks",
    description: "Building habits",
    icon: Trophy,
    color: "from-[#f59e0b] to-[#d97706]",
    reward: "Habit Builder",
  },
  {
    days: 30,
    title: "One Month",
    description: "Major transformation",
    icon: Crown,
    color: "from-[#ec4899] to-[#db2777]",
    reward: "Monthly Master",
  },
  {
    days: 60,
    title: "Two Months",
    description: "Serious dedication",
    icon: Crown,
    color: "from-[#f59e0b] to-[#d97706]",
    reward: "Dedicated One",
  },
  {
    days: 90,
    title: "90 Days",
    description: "Complete reboot achieved",
    icon: Crown,
    color: "from-[#fbbf24] to-[#f59e0b]",
    reward: "Reboot Champion",
  },
];

export function Goals({ onBack, currentStreak }: GoalsProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 pb-4">
        {/* Header */}
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
            <h2 className="text-foreground">Goals & Rewards</h2>
            <p className="text-muted-foreground text-sm">Celebrate your wins</p>
          </div>
        </div>

        {/* Current Progress Overview */}
        <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-0 p-6 mb-6">
          <div className="text-center space-y-3">
            <Trophy className="w-12 h-12 text-white mx-auto" />
            <div>
              <p className="text-white/80 text-sm">Current Streak</p>
              <p className="text-4xl font-bold text-white">{currentStreak}</p>
              <p className="text-white/80 text-sm">
                {currentStreak === 1 ? "day" : "days"}
              </p>
            </div>

            {/* Next milestone */}
            {(() => {
              const nextMilestone = milestones.find((m) => m.days > currentStreak);
              if (nextMilestone) {
                const daysLeft = nextMilestone.days - currentStreak;
                const progress = (currentStreak / nextMilestone.days) * 100;
                return (
                  <div className="pt-4 space-y-2">
                    <p className="text-white/90 text-sm">
                      {daysLeft} {daysLeft === 1 ? "day" : "days"} until{" "}
                      <span className="font-semibold">{nextMilestone.title}</span>
                    </p>
                    <Progress value={progress} className="bg-white/20 h-2">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </Progress>
                  </div>
                );
              }
              return (
                <p className="text-white/90 text-sm pt-4">
                  All milestones achieved! Keep going! 🎉
                </p>
              );
            })()}
          </div>
        </Card>

        {/* Milestones */}
        <div className="space-y-3">
          <h3 className="text-foreground mb-3">Milestones</h3>

          {milestones.map((milestone, index) => {
            const isAchieved = currentStreak >= milestone.days;
            const isLocked = currentStreak < milestone.days;
            const Icon = milestone.icon;

            return (
              <motion.div
                key={milestone.days}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`border ${
                    isAchieved
                      ? "bg-gradient-to-br " + milestone.color + " border-0"
                      : "bg-card border-border"
                  } overflow-hidden`}
                >
                  <div className="p-5 flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isAchieved
                          ? "bg-white/20"
                          : "bg-muted"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className={`w-7 h-7 ${isAchieved ? "text-white" : "text-muted-foreground"}`} />
                      ) : (
                        <Icon className={`w-7 h-7 ${isAchieved ? "text-white" : "text-foreground"}`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className={isAchieved ? "text-white" : "text-foreground"}>
                            {milestone.title}
                          </h4>
                          <p
                            className={`text-sm ${
                              isAchieved ? "text-white/80" : "text-muted-foreground"
                            }`}
                          >
                            {milestone.description}
                          </p>
                        </div>
                        {isAchieved && (
                          <CircleCheck className="w-6 h-6 text-white flex-shrink-0 ml-2" />
                        )}
                      </div>

                      {/* Badge/Reward */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mt-2 ${
                          isAchieved
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Award className="w-3 h-3" />
                        {milestone.reward}
                      </div>
                    </div>

                    {/* Day indicator */}
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${
                          isAchieved ? "text-white" : "text-foreground"
                        }`}
                      >
                        {milestone.days}
                      </p>
                      <p
                        className={`text-xs ${
                          isAchieved ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        days
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Encouragement */}
        <Card className="bg-card border-border p-5 mt-6">
          <div className="text-center space-y-2">
            <Sparkles className="w-8 h-8 text-[#f59e0b] mx-auto" />
            <h3 className="text-foreground">Keep Going!</h3>
            <p className="text-muted-foreground text-sm">
              Every day you stay committed is a victory. You're building the life you
              deserve.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}