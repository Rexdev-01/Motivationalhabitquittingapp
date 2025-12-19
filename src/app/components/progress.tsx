import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressProps {
  onBack: () => void;
  streakData: {
    currentStreak: number;
    longestStreak: number;
    startDate: string;
    lastRelapseDate?: string;
  };
}

export function Progress({ onBack, streakData }: ProgressProps) {
  const [viewMode, setViewMode] = useState<"calendar" | "graph">("calendar");

  // Generate calendar data for the current month
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    let day = 1;

    // Fill empty cells before first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }

    // Fill days
    for (let i = day; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const daysSinceStart = Math.floor(
        (date.getTime() - new Date(streakData.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      
      const isClean = daysSinceStart >= 0 && i <= today.getDate();
      calendar.push({
        day: i,
        isClean,
        isToday: i === today.getDate(),
      });
    }

    return calendar;
  };

  // Generate graph data
  const generateGraphData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        streak: Math.max(0, streakData.currentStreak - i),
      });
    }
    
    return data;
  };

  const calendar = generateCalendar();
  const graphData = generateGraphData();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            <h2 className="text-foreground">Progress</h2>
            <p className="text-muted-foreground text-sm">Track your journey</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === "graph" ? "default" : "outline"}
            onClick={() => setViewMode("graph")}
            className="flex-1"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Graph
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-0 p-4">
            <p className="text-white/80 text-sm mb-1">Current</p>
            <p className="text-3xl font-bold text-white">{streakData.currentStreak}</p>
            <p className="text-white/80 text-xs">days</p>
          </Card>
          <Card className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] border-0 p-4">
            <p className="text-white/80 text-sm mb-1">Best</p>
            <p className="text-3xl font-bold text-white">{streakData.longestStreak}</p>
            <p className="text-white/80 text-xs">days</p>
          </Card>
        </div>

        {/* Calendar or Graph View */}
        {viewMode === "calendar" ? (
          <Card className="bg-card border-border p-5">
            <div className="mb-4">
              <h3 className="text-foreground">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
            </div>

            {/* Calendar Grid */}
            <div className="space-y-2">
              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-muted-foreground py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {calendar.map((item, index) => (
                  <div
                    key={index}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                      !item
                        ? ""
                        : item.isToday
                        ? "bg-[#3b82f6] text-white font-semibold ring-2 ring-[#3b82f6] ring-offset-2 ring-offset-background"
                        : item.isClean
                        ? "bg-[#10b981] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item?.day}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#10b981]"></div>
                  <span className="text-xs text-muted-foreground">Clean Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#3b82f6]"></div>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-card border-border p-5">
            <div className="mb-4">
              <h3 className="text-foreground">7-Day Trend</h3>
              <p className="text-sm text-muted-foreground">Your progress over time</p>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="day"
                  stroke="#a1a1aa"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#a1a1aa" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#141414",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fafafa" }}
                />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Journey Started */}
        <Card className="bg-card border-border p-5 mt-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">Journey started</p>
            <p className="text-foreground font-semibold">
              {new Date(streakData.startDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-muted-foreground text-xs">
              {Math.floor(
                (new Date().getTime() - new Date(streakData.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days ago
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
