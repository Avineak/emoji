import React, { useState, useEffect, useRef, useCallback } from "react";

export const useDebounce = (
  func: (val: string) => Promise<void>,
  delay: number
) => {
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // @ts-ignore
      func(...args);
    }, delay);
  };

  return debouncedCallback;
};
