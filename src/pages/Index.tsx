import { useState } from "react";
import { Play, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerOverlay from "@/components/timer/TimerOverlay";
import { useTimer } from "@/hooks/useTimer";

const Index = () => {
  const { time, isRunning, isPaused, startTimer, stopTimer, resetTimer } = useTimer();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleStart = () => {
    startTimer();
    setShowOverlay(true);
  };

  const handleStop = () => {
    stopTimer();
    setShowOverlay(false);
  };

  const handleReset = () => {
    resetTimer();
  };

  return (
    <>
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-mono">Phone Usage Timer</CardTitle>
            <CardDescription>
              Track your screen time automatically. Timer pauses when screen locks.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Main Timer Display */}
            <div className="text-center">
              <TimerDisplay 
                time={time} 
                isRunning={isRunning}
                className="text-5xl font-bold"
              />
              {isPaused && (
                <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                  Paused - Screen locked
                </p>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-3 justify-center">
              {!isRunning ? (
                <Button 
                  variant="timer" 
                  size="lg"
                  onClick={handleStart}
                  className="flex-1"
                >
                  <Play className="w-5 h-5" />
                  Start Timer
                </Button>
              ) : (
                <Button 
                  variant="stop" 
                  size="lg"
                  onClick={handleStop}
                  className="flex-1"
                >
                  <Square className="w-5 h-5" />
                  Stop Timer
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleReset}
                disabled={time === 0}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                {isRunning ? (
                  <span className="text-primary font-medium">
                    • Timer Active - Overlay visible in top-left
                  </span>
                ) : (
                  "Timer stopped"
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Always-visible overlay */}
      <TimerOverlay 
        time={time}
        isRunning={isRunning}
        isVisible={showOverlay}
      />
    </>
  );
};

export default Index;
