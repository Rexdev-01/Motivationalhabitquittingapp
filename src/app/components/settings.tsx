import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import {
  ArrowLeft,
  Lock,
  Moon,
  Trash2,
  Shield,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface SettingsProps {
  onBack: () => void;
  onResetStreak: () => void;
  currentStreak: number;
}

export function Settings({ onBack, onResetStreak, currentStreak }: SettingsProps) {
  const [appLockEnabled, setAppLockEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [pin, setPin] = useState("");

  const handleToggleAppLock = (enabled: boolean) => {
    if (enabled && !pin) {
      // Would need to prompt for PIN setup
      alert("PIN setup would be implemented here");
      return;
    }
    setAppLockEnabled(enabled);
  };

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
            <h2 className="text-foreground">Settings</h2>
            <p className="text-muted-foreground text-sm">Manage your app</p>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-foreground mb-3">Privacy & Security</h3>

            <Card className="bg-card border-border divide-y divide-border">
              {/* App Lock */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-foreground">App Lock</p>
                    <p className="text-xs text-muted-foreground">
                      Require PIN to open app
                    </p>
                  </div>
                </div>
                <Switch
                  checked={appLockEnabled}
                  onCheckedChange={handleToggleAppLock}
                />
              </div>

              {/* Data Privacy */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#10b981]" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Data Privacy</p>
                  <p className="text-xs text-muted-foreground">
                    All data is stored locally on your device
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="text-foreground mb-3">Appearance</h3>

            <Card className="bg-card border-border">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <p className="text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Easier on the eyes
                    </p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </Card>
          </div>

          {/* Journey Management */}
          <div>
            <h3 className="text-foreground mb-3">Journey Management</h3>

            <Card className="bg-card border-border">
              {/* Reset Streak */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-[#f59e0b]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">Reset Streak</p>
                      <p className="text-xs text-muted-foreground">
                        If you relapsed, reset your counter
                      </p>
                    </div>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">
                      Reset Your Streak?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Your current streak of {currentStreak} days will be reset to 0.
                      This action cannot be undone. Remember, a relapse doesn't erase
                      your progress—you've still learned and grown.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-background border-border">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onResetStreak}
                      className="bg-[#f59e0b] hover:bg-[#d97706] text-white"
                    >
                      Reset Streak
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-foreground mb-3 flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-destructive" />
              Danger Zone
            </h3>

            <Card className="bg-card border-destructive/50">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="text-destructive">Delete All Data</p>
                      <p className="text-xs text-muted-foreground">
                        Permanently remove all progress
                      </p>
                    </div>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive">
                      Delete All Data?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      This will permanently delete your streak, progress, and all app
                      data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-background border-border">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      Delete Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </div>
        </div>

        {/* App Info */}
        <Card className="bg-card border-border p-5">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Clarity</p>
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-4">
              Your journey to mental clarity and discipline
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}