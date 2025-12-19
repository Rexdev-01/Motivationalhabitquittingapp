import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Send,
  Heart,
  Shield,
  Sparkles,
  Clock,
} from "lucide-react";

interface AITherapistProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "therapist";
  timestamp: Date;
}

const therapistResponses = {
  urge: [
    "I'm here with you. Take a deep breath. This urge is temporary, and you have the strength to ride it out. What triggered this feeling?",
    "You're doing the right thing by reaching out. Remember, urges pass. They always do. Let's work through this together. How are you feeling right now?",
    "This is a moment of strength, not weakness. You recognized the urge and chose to talk instead of act. I'm proud of you. What can I help you with?",
  ],
  relapse: [
    "First, I want you to know that a relapse doesn't erase your progress. You're human, and recovery isn't linear. What matters is that you're here now. How are you feeling?",
    "Setbacks are part of the journey. What you've learned about yourself during your streak is still valuable. Let's talk about what happened and how we can move forward.",
    "I'm glad you came back. That takes courage. Remember, tomorrow is a fresh start. What do you need right now to feel supported?",
  ],
  support: [
    "I'm here for you, anytime you need. Your journey matters, and so do your feelings. What's on your mind today?",
    "You're not alone in this. Many people are walking this same path, and you're doing incredibly well. How can I support you right now?",
    "It's okay to struggle. What you're doing takes real strength. I'm here to listen without judgment. What would you like to talk about?",
  ],
  progress: [
    "Every day clean is a victory. You're building new neural pathways and reclaiming your life. How does it feel to see your progress?",
    "The work you're doing is transforming you from the inside out. Your brain is healing, and you're proving to yourself that you're stronger than you thought. What changes have you noticed?",
    "Progress isn't just about the numbers. It's about who you're becoming. I can see your commitment, and it's inspiring. What are you most proud of?",
  ],
  general: [
    "I'm listening. Take your time and share what's on your heart.",
    "Your feelings are valid, and this is a safe space. What would you like to explore today?",
    "I'm here to support you without judgment. How are you really doing?",
  ],
};

const quickPrompts = [
  { text: "I'm having an urge", category: "urge", icon: "⚡" },
  { text: "I relapsed", category: "relapse", icon: "💔" },
  { text: "Need encouragement", category: "support", icon: "💪" },
  { text: "Celebrate progress", category: "progress", icon: "🎉" },
];

export function AITherapist({ onBack }: AITherapistProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load previous messages from localStorage
    const savedMessages = localStorage.getItem("therapistMessages");
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })));
    } else {
      // Initial greeting
      const greeting: Message = {
        id: Date.now().toString(),
        text: "Hello, I'm here for you 24/7. I'm a safe, non-judgmental space where you can share your thoughts, struggles, and victories. How can I support you today?",
        sender: "therapist",
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage
    if (messages.length > 0) {
      localStorage.setItem("therapistMessages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getTherapistResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("urge") || lowerMessage.includes("tempt") || lowerMessage.includes("crav")) {
      return therapistResponses.urge[Math.floor(Math.random() * therapistResponses.urge.length)];
    } else if (lowerMessage.includes("relapse") || lowerMessage.includes("fail") || lowerMessage.includes("gave in")) {
      return therapistResponses.relapse[Math.floor(Math.random() * therapistResponses.relapse.length)];
    } else if (lowerMessage.includes("progress") || lowerMessage.includes("achiev") || lowerMessage.includes("streak")) {
      return therapistResponses.progress[Math.floor(Math.random() * therapistResponses.progress.length)];
    } else if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("need")) {
      return therapistResponses.support[Math.floor(Math.random() * therapistResponses.support.length)];
    } else {
      return therapistResponses.general[Math.floor(Math.random() * therapistResponses.general.length)];
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getTherapistResponse(messageText);
      const therapistMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "therapist",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, therapistMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickPrompt = (prompt: { text: string; category: string }) => {
    handleSendMessage(prompt.text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <div className="flex items-center gap-2">
              <h2 className="text-foreground">AI Therapist</h2>
              <Badge variant="outline" className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]">
                <Clock className="w-3 h-3 mr-1" />
                24/7
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Always here to listen</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <AnimatePresence key={message.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "therapist" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mr-2">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-[#3b82f6] text-white"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center mr-2">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="flex-shrink-0 bg-card hover:bg-accent"
              >
                <span className="mr-1">{prompt.icon}</span>
                {prompt.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-10 bg-card"
            />
            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button
            onClick={() => handleSendMessage()}
            size="icon"
            className="bg-[#3b82f6] hover:bg-[#2563eb] rounded-full h-10 w-10"
            disabled={!inputText.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Safe, private, and non-judgmental support
        </p>
      </div>
    </div>
  );
}
