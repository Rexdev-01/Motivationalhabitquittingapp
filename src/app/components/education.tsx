import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Brain, Zap, Heart, Eye, Users, Sparkles } from "lucide-react";

interface EducationProps {
  onBack: () => void;
}

const benefits = [
  {
    icon: Brain,
    title: "Mental Clarity",
    description:
      "Experience improved focus, sharper memory, and better decision-making as your brain chemistry rebalances.",
    color: "from-[#3b82f6] to-[#2563eb]",
    details: [
      "Reduced brain fog",
      "Better concentration",
      "Enhanced cognitive function",
    ],
  },
  {
    icon: Zap,
    title: "More Energy",
    description:
      "Reclaim hours of your day and redirect your energy toward productive activities and meaningful goals.",
    color: "from-[#f59e0b] to-[#d97706]",
    details: [
      "Higher motivation levels",
      "More productive hours",
      "Better sleep quality",
    ],
  },
  {
    icon: Heart,
    title: "Emotional Balance",
    description:
      "Develop healthier relationships with yourself and others. Experience more stable moods and genuine emotions.",
    color: "from-[#ec4899] to-[#db2777]",
    details: [
      "Reduced anxiety",
      "Improved mood stability",
      "Better emotional regulation",
    ],
  },
  {
    icon: Eye,
    title: "Realistic Perspective",
    description:
      "Reset unrealistic expectations and develop a healthier view of relationships and intimacy.",
    color: "from-[#8b5cf6] to-[#7c3aed]",
    details: [
      "Healthier expectations",
      "Better self-image",
      "Improved confidence",
    ],
  },
  {
    icon: Users,
    title: "Better Relationships",
    description:
      "Build deeper, more authentic connections. Improve communication and emotional intimacy with partners.",
    color: "from-[#10b981] to-[#059669]",
    details: [
      "Deeper connections",
      "Better communication",
      "Increased empathy",
    ],
  },
  {
    icon: Sparkles,
    title: "Self-Discipline",
    description:
      "Strengthen your willpower and self-control. This journey builds mental resilience that applies to all areas of life.",
    color: "from-[#f59e0b] to-[#d97706]",
    details: [
      "Stronger willpower",
      "Better self-control",
      "Enhanced discipline",
    ],
  },
];

const timeline = [
  { days: "1-7", title: "Week 1", changes: "Initial withdrawal symptoms, mood swings, strong urges" },
  { days: "7-14", title: "Week 2", changes: "Urges start to decrease, improved energy, better sleep" },
  { days: "14-30", title: "Weeks 3-4", changes: "Mental clarity improves, more stable mood, increased confidence" },
  { days: "30-60", title: "Months 2", changes: "New habits forming, significant brain changes, emotional stability" },
  { days: "60-90", title: "Month 3", changes: "Brain reset complete, natural dopamine response restored" },
];

export function Education({ onBack }: EducationProps) {
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
            <h2 className="text-foreground">Why Quit?</h2>
            <p className="text-muted-foreground text-sm">Science-backed benefits</p>
          </div>
        </div>

        {/* Intro Card */}
        <Card className="bg-gradient-to-br from-[#10b981] to-[#059669] border-0 p-6 mb-6">
          <div className="text-white space-y-2">
            <h3 className="font-semibold">Your Brain Deserves Better</h3>
            <p className="text-sm text-white/90">
              Quitting unhealthy digital habits allows your brain to reset its reward system,
              leading to profound improvements in mental health, relationships, and quality of life.
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="space-y-4 mb-8">
          <h3 className="text-foreground">Benefits You'll Experience</h3>

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-card border-border overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${benefit.color}`}></div>
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 ml-16">
                    {benefit.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recovery Timeline */}
        <div className="space-y-4 mb-6">
          <h3 className="text-foreground">Recovery Timeline</h3>
          <Card className="bg-card border-border p-5">
            <p className="text-sm text-muted-foreground mb-4">
              Everyone's journey is different, but here's a general timeline of what to expect:
            </p>

            <div className="space-y-4">
              {timeline.map((phase, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0 border-2 border-[#10b981]">
                      <span className="text-xs font-semibold text-[#10b981]">
                        {phase.days.split("-")[0]}
                      </span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border flex-1 my-1"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h4 className="text-foreground mb-1">
                      {phase.title}
                      <span className="text-muted-foreground text-sm ml-2">
                        ({phase.days} days)
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">{phase.changes}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Resources Note */}
        <Card className="bg-card border-border p-5">
          <div className="space-y-2">
            <h4 className="text-foreground">Remember</h4>
            <p className="text-sm text-muted-foreground">
              This journey is about progress, not perfection. Every day clean is a step toward
              a healthier, happier you. If you slip up, don't give up—just start again.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
