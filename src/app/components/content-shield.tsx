import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Shield,
  ShieldAlert,
  Globe,
  Smartphone,
  Server,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ContentShieldProps {
  onBack: () => void;
}

interface BlockedItem {
  id: string;
  url: string;
  type: "website" | "app";
}

export function ContentShield({ onBack }: ContentShieldProps) {
  const [shieldEnabled, setShieldEnabled] = useState(false);
  const [websiteBlockingEnabled, setWebsiteBlockingEnabled] = useState(false);
  const [appBlockingEnabled, setAppBlockingEnabled] = useState(false);
  const [dnsFilteringEnabled, setDnsFilteringEnabled] = useState(false);
  const [blockedWebsites, setBlockedWebsites] = useState<BlockedItem[]>([]);
  const [blockedApps, setBlockedApps] = useState<BlockedItem[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const [newApp, setNewApp] = useState("");

  // Load settings from localStorage
  useEffect(() => {
    const savedShieldEnabled = localStorage.getItem("shieldEnabled");
    const savedWebsiteBlocking = localStorage.getItem("websiteBlockingEnabled");
    const savedAppBlocking = localStorage.getItem("appBlockingEnabled");
    const savedDnsFiltering = localStorage.getItem("dnsFilteringEnabled");
    const savedBlockedWebsites = localStorage.getItem("blockedWebsites");
    const savedBlockedApps = localStorage.getItem("blockedApps");

    if (savedShieldEnabled) setShieldEnabled(JSON.parse(savedShieldEnabled));
    if (savedWebsiteBlocking) setWebsiteBlockingEnabled(JSON.parse(savedWebsiteBlocking));
    if (savedAppBlocking) setAppBlockingEnabled(JSON.parse(savedAppBlocking));
    if (savedDnsFiltering) setDnsFilteringEnabled(JSON.parse(savedDnsFiltering));
    if (savedBlockedWebsites) setBlockedWebsites(JSON.parse(savedBlockedWebsites));
    if (savedBlockedApps) setBlockedApps(JSON.parse(savedBlockedApps));
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("shieldEnabled", JSON.stringify(shieldEnabled));
    localStorage.setItem("websiteBlockingEnabled", JSON.stringify(websiteBlockingEnabled));
    localStorage.setItem("appBlockingEnabled", JSON.stringify(appBlockingEnabled));
    localStorage.setItem("dnsFilteringEnabled", JSON.stringify(dnsFilteringEnabled));
    localStorage.setItem("blockedWebsites", JSON.stringify(blockedWebsites));
    localStorage.setItem("blockedApps", JSON.stringify(blockedApps));
  }, [shieldEnabled, websiteBlockingEnabled, appBlockingEnabled, dnsFilteringEnabled, blockedWebsites, blockedApps]);

  const handleAddWebsite = () => {
    if (newWebsite.trim()) {
      const newItem: BlockedItem = {
        id: Date.now().toString(),
        url: newWebsite.trim(),
        type: "website",
      };
      setBlockedWebsites([...blockedWebsites, newItem]);
      setNewWebsite("");
    }
  };

  const handleAddApp = () => {
    if (newApp.trim()) {
      const newItem: BlockedItem = {
        id: Date.now().toString(),
        url: newApp.trim(),
        type: "app",
      };
      setBlockedApps([...blockedApps, newItem]);
      setNewApp("");
    }
  };

  const handleRemoveWebsite = (id: string) => {
    setBlockedWebsites(blockedWebsites.filter((item) => item.id !== id));
  };

  const handleRemoveApp = (id: string) => {
    setBlockedApps(blockedApps.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Content Shield</h2>
            <p className="text-sm text-muted-foreground">Block unwanted content</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Master Shield Toggle */}
        <Card className={`p-6 border-2 transition-all ${
          shieldEnabled
            ? "bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 border-[#10b981]"
            : "bg-card border-border"
        }`}>
          <div className="flex items-start gap-4">
            <motion.div
              animate={{
                scale: shieldEnabled ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {shieldEnabled ? (
                <Shield className="w-10 h-10 text-[#10b981]" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-muted-foreground" />
              )}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Protection Status
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {shieldEnabled ? "Active" : "Disabled"}
                  </p>
                </div>
                <Switch
                  checked={shieldEnabled}
                  onCheckedChange={setShieldEnabled}
                />
              </div>
              {shieldEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm text-[#10b981]">
                    Your device is protected
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </Card>

        {/* Warning when disabled */}
        <AnimatePresence>
          {!shieldEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert className="border-[#f59e0b] bg-[#f59e0b]/10">
                <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />
                <AlertDescription className="text-[#f59e0b]">
                  Content Shield is disabled. Turn it on to block unwanted content.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Website Blocking */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <h3 className="font-medium text-foreground">Website Blocking</h3>
                <p className="text-sm text-muted-foreground">
                  Block specific websites
                </p>
              </div>
            </div>
            <Switch
              checked={websiteBlockingEnabled}
              onCheckedChange={setWebsiteBlockingEnabled}
              disabled={!shieldEnabled}
            />
          </div>

          {websiteBlockingEnabled && shieldEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddWebsite()}
                  className="flex-1 bg-background"
                />
                <Button
                  onClick={handleAddWebsite}
                  size="icon"
                  className="bg-[#3b82f6] hover:bg-[#2563eb]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {blockedWebsites.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="text-sm text-foreground">{item.url}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveWebsite(item.id)}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {blockedWebsites.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No websites blocked yet
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </Card>

        {/* App-Level Restrictions */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-[#8b5cf6]" />
              <div>
                <h3 className="font-medium text-foreground">App Restrictions</h3>
                <p className="text-sm text-muted-foreground">
                  Block specific apps
                </p>
              </div>
            </div>
            <Switch
              checked={appBlockingEnabled}
              onCheckedChange={setAppBlockingEnabled}
              disabled={!shieldEnabled}
            />
          </div>

          {appBlockingEnabled && shieldEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="App name"
                  value={newApp}
                  onChange={(e) => setNewApp(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddApp()}
                  className="flex-1 bg-background"
                />
                <Button
                  onClick={handleAddApp}
                  size="icon"
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {blockedApps.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="text-sm text-foreground">{item.url}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveApp(item.id)}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                {blockedApps.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No apps blocked yet
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </Card>

        {/* DNS/VPN Filtering */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-[#f59e0b]" />
              <div>
                <h3 className="font-medium text-foreground">DNS Filtering</h3>
                <p className="text-sm text-muted-foreground">
                  Network-level protection
                </p>
              </div>
            </div>
            <Switch
              checked={dnsFilteringEnabled}
              onCheckedChange={setDnsFilteringEnabled}
              disabled={!shieldEnabled}
            />
          </div>

          {dnsFilteringEnabled && shieldEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <Alert className="border-[#10b981] bg-[#10b981]/10">
                <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                <AlertDescription className="text-[#10b981]">
                  DNS filtering is active. All network traffic is monitored.
                </AlertDescription>
              </Alert>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Safe DNS Server
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Blocks adult content at DNS level
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      VPN Protection
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Encrypts and filters traffic
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]">
                    Active
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Info Section */}
        <Card className="p-6 bg-card border-border">
          <h3 className="font-medium text-foreground mb-3">How It Works</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              • <span className="text-foreground">Website Blocking</span>: Prevents access to specific URLs in your browser
            </p>
            <p>
              • <span className="text-foreground">App Restrictions</span>: Blocks or limits time in selected apps
            </p>
            <p>
              • <span className="text-foreground">DNS Filtering</span>: Network-level blocking across all devices using this connection
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
