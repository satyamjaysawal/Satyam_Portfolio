import React, { createContext, useState, useEffect, useCallback } from "react";

export const RetryTimerContext = createContext();

export const RetryTimerProvider = ({ children }) => {
  const [retryTimer, setRetryTimer] = useState(0);
  const [isServerDown, setIsServerDown] = useState(false);

  const startRetryTimer = useCallback(() => {
    setRetryTimer(45);
    setIsServerDown(true);
    
    const timer = setInterval(() => {
      setRetryTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsServerDown(false);  // Hide timer after countdown ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <RetryTimerContext.Provider value={{ retryTimer, isServerDown, startRetryTimer }}>
      {children}
    </RetryTimerContext.Provider>
  );
};
