import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useTimer = (): UseTimerReturn => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Timer interval effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Screen visibility handling for mobile
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isRunning) {
        if (document.hidden) {
          pauseTimer();
        } else {
          resumeTimer();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Additional mobile-specific events
    window.addEventListener('blur', () => {
      if (isRunning) pauseTimer();
    });
    
    window.addEventListener('focus', () => {
      if (isRunning) resumeTimer();
    });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', () => {
        if (isRunning) pauseTimer();
      });
      window.removeEventListener('focus', () => {
        if (isRunning) resumeTimer();
      });
    };
  }, [isRunning, pauseTimer, resumeTimer]);

  return {
    time,
    isRunning,
    isPaused,
    startTimer,
    stopTimer,
    resetTimer
  };
};