import React, { createContext, useState, useEffect, useCallback } from "react";

export const RetryTimerContext = createContext();

export const RetryTimerProvider = ({ children }) => {
  const [retryTimer, setRetryTimer] = useState(0);
  const [isServerDown, setIsServerDown] = useState(false);

  const startRetryTimer = useCallback(() => {
    setRetryTimer(45);  // Set initial time to 45 seconds
    setIsServerDown(true);  // Set server status to down

    // Create the interval to decrement the timer every second
    const timer = setInterval(() => {
      setRetryTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);  // Clear interval when timer hits 0
          setIsServerDown(false);  // Set server status to up after timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup the interval when the component unmounts or when timer ends
    return () => clearInterval(timer);
  }, []);

  // Returning the context value
  return (
    <RetryTimerContext.Provider value={{ retryTimer, isServerDown, startRetryTimer }}>
      {children}
    </RetryTimerContext.Provider>
  );
};
