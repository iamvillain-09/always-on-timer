import { useEffect, useState } from "react";
import TimerDisplay from "./TimerDisplay";
import { cn } from "@/lib/utils";

interface TimerOverlayProps {
  time: number;
  isRunning: boolean;
  isVisible: boolean;
}

const TimerOverlay = ({ time, isRunning, isVisible }: TimerOverlayProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div className={cn(
      "fixed top-4 left-4 z-50 transition-all duration-300",
      isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
    )}>
      <div className="bg-timer-overlay backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
        <TimerDisplay 
          time={time} 
          isRunning={isRunning}
          className="text-lg font-bold"
        />
      </div>
    </div>
  );
};

export default TimerOverlay;