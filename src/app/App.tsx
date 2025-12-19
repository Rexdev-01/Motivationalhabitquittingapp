import { useState, useEffect } from "react";
import { Onboarding } from "./components/onboarding";
import { Auth } from "./components/auth";
import { Dashboard } from "./components/dashboard";
import { UrgeControl } from "./components/urge-control";
import { Progress } from "./components/progress";
import { Goals } from "./components/goals";
import { Education } from "./components/education";
import { Settings } from "./components/settings";
import { ContentShield } from "./components/content-shield";
import { AITherapist } from "./components/ai-therapist";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  lastRelapseDate?: string;
}

type Screen =
  | "onboarding"
  | "auth"
  | "dashboard"
  | "urge"
  | "progress"
  | "goals"
  | "education"
  | "settings"
  | "shield"
  | "therapist";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    startDate: new Date().toISOString(),
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const savedStreakData = localStorage.getItem("streakData");

    if (hasSeenOnboarding && isAuthenticated) {
      setCurrentScreen("dashboard");
    } else if (hasSeenOnboarding) {
      setCurrentScreen("auth");
    }

    if (savedStreakData) {
      const parsed = JSON.parse(savedStreakData);
      // Update streak based on dates
      const updatedStreak = calculateCurrentStreak(parsed);
      setStreakData(updatedStreak);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (currentScreen !== "onboarding" && currentScreen !== "auth") {
      localStorage.setItem("streakData", JSON.stringify(streakData));
    }
  }, [streakData, currentScreen]);

  // Calculate current streak based on last check-in
  const calculateCurrentStreak = (data: StreakData): StreakData => {
    const now = new Date();
    const lastCheckIn = data.lastRelapseDate
      ? new Date(data.lastRelapseDate)
      : new Date(data.startDate);

    const daysSince = Math.floor(
      (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      ...data,
      currentStreak: daysSince,
      longestStreak: Math.max(data.longestStreak, daysSince),
    };
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setCurrentScreen("auth");
  };

  const handleAuth = () => {
    localStorage.setItem("isAuthenticated", "true");
    const now = new Date().toISOString();
    const initialData: StreakData = {
      currentStreak: 0,
      longestStreak: 0,
      startDate: now,
    };
    setStreakData(initialData);
    localStorage.setItem("streakData", JSON.stringify(initialData));
    setCurrentScreen("dashboard");
  };

  const handleResetStreak = () => {
    const now = new Date().toISOString();
    const newData: StreakData = {
      currentStreak: 0,
      longestStreak: streakData.longestStreak,
      startDate: streakData.startDate,
      lastRelapseDate: now,
    };
    setStreakData(newData);
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="dark min-h-screen bg-background">
      {/* Mobile container */}
      <div className="max-w-md mx-auto bg-background min-h-screen shadow-2xl">
        {currentScreen === "onboarding" && (
          <Onboarding onComplete={handleCompleteOnboarding} />
        )}
        {currentScreen === "auth" && <Auth onAuth={handleAuth} />}
        {currentScreen === "dashboard" && (
          <Dashboard
            onNavigate={handleNavigate}
            streakData={streakData}
          />
        )}
        {currentScreen === "urge" && (
          <UrgeControl onBack={() => handleNavigate("dashboard")} />
        )}
        {currentScreen === "progress" && (
          <Progress
            onBack={() => handleNavigate("dashboard")}
            streakData={streakData}
          />
        )}
        {currentScreen === "goals" && (
          <Goals
            onBack={() => handleNavigate("dashboard")}
            currentStreak={streakData.currentStreak}
          />
        )}
        {currentScreen === "education" && (
          <Education onBack={() => handleNavigate("dashboard")} />
        )}
        {currentScreen === "settings" && (
          <Settings
            onBack={() => handleNavigate("dashboard")}
            onResetStreak={handleResetStreak}
            currentStreak={streakData.currentStreak}
          />
        )}
        {currentScreen === "shield" && (
          <ContentShield onBack={() => handleNavigate("dashboard")} />
        )}
        {currentScreen === "therapist" && (
          <AITherapist onBack={() => handleNavigate("dashboard")} />
        )}
      </div>
    </div>
  );
}