import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  className?: string;
}

const TimerDisplay = ({ time, isRunning, className }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "font-mono text-timer-display transition-all duration-300",
        isRunning && "animate-pulse-glow",
        className
      )}
    >
      {formatTime(time)}
    </div>
  );
};

export default TimerDisplay;