import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import {
  Flame,
  Clock,
  Heart,
  TrendingUp,
  Award,
  BookOpen,
  Settings,
  CircleAlert,
  MessageCircleHeart,
  Shield,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
  streakData: {
    currentStreak: number;
    longestStreak: number;
    startDate: string;
    lastRelapseDate?: string;
  };
}

const motivationalQuotes = [
  "Every day you resist is a victory.",
  "You are stronger than your urges.",
  "Discipline is choosing what you want most over what you want now.",
  "Your future self will thank you for today's effort.",
  "Progress, not perfection.",
  "You're building mental strength every single day.",
  "Small steps lead to massive change.",
];

export function Dashboard({ onNavigate, streakData }: DashboardProps) {
  const [quote, setQuote] = useState("");
  const { currentStreak, longestStreak, startDate } = streakData;

  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  const calculateDaysSince = (dateString: string) => {
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalDays = calculateDaysSince(startDate);
  const hoursReclaimed = currentStreak * 2; // Estimate 2 hours per day
  const progressPercent = Math.min((currentStreak / 90) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-foreground">Dashboard</h2>
            <p className="text-muted-foreground text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("settings")}
            className="rounded-full"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Streak Card */}
        <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-0 p-6 mb-6 shadow-lg">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <Flame className="w-8 h-8 text-white mr-2" />
              <span className="text-white/80">Current Streak</span>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl font-bold text-white">{currentStreak}</div>
              <div className="text-white/90 mt-1">
                {currentStreak === 1 ? "day" : "days"} clean
              </div>
            </motion.div>

            {/* Progress to next milestone */}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm text-white/80">
                <span>Progress to 90 days</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="bg-white/20 h-2">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </Progress>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm text-muted-foreground">Time Saved</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {hoursReclaimed}h
            </div>
          </Card>

          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-sm text-muted-foreground">Best Streak</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {longestStreak} days
            </div>
          </Card>
        </div>

        {/* Motivational Quote */}
        <Card className="bg-card border-border p-4 mb-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#10b981] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-muted-foreground text-sm mb-1">Today's Reminder</p>
              <p className="text-foreground italic">"{quote}"</p>
            </div>
          </div>
        </Card>

        {/* Emergency Button - PANIC BUTTON */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => onNavigate("urge")}
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] text-white mb-4 h-16 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all duration-300"
          >
            <CircleAlert className="w-6 h-6 mr-3" />
            <span className="text-lg tracking-wide">PANIC BUTTON</span>
          </Button>
        </motion.div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={() => onNavigate("therapist")}
            variant="outline"
            className="h-14 bg-card border-[#10b981] hover:bg-[#10b981]/10 flex items-center justify-center gap-2"
          >
            <MessageCircleHeart className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm">AI Therapist</span>
          </Button>
          <Button
            onClick={() => onNavigate("shield")}
            variant="outline"
            className="h-14 bg-card border-[#3b82f6] hover:bg-[#3b82f6]/10 flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5 text-[#3b82f6]" />
            <span className="text-sm">Content Shield</span>
          </Button>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-card border-border p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onNavigate("progress")}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <TrendingUp className="w-6 h-6 text-[#3b82f6]" />
              <span className="text-sm text-foreground">Progress</span>
            </div>
          </Card>

          <Card
            className="bg-card border-border p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onNavigate("goals")}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <Award className="w-6 h-6 text-[#f59e0b]" />
              <span className="text-sm text-foreground">Goals</span>
            </div>
          </Card>

          <Card
            className="bg-card border-border p-4 cursor-pointer hover:bg-accent transition-colors col-span-2"
            onClick={() => onNavigate("education")}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#8b5cf6]" />
              <div>
                <div className="text-sm font-medium text-foreground">Learn More</div>
                <div className="text-xs text-muted-foreground">
                  Benefits of quitting
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}