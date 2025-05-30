"use client";
import { Counter } from "@/api/api";
import { useCallback, useState, useEffect } from "react";

const STORAGE_KEY = "counters";

type AddCounterDto = Partial<
  Pick<Counter, "color" | "icon" | "locked" | "stepSize">
> &
  Required<Pick<Counter, "name">>;

function loadCountersFromStorage(): Counter[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.warn("Failed to load counters from localStorage:", error);
  }
  return [];
}

function saveCountersToStorage(counters: Counter[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  } catch (error) {
    console.warn("Failed to save counters to localStorage:", error);
  }
}

function generateUniqueId(): string {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("use counters");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadCountersFromStorage();
    setCounters(stored);
    setIsLoaded(true);
  }, []);

  // Save to localStorage when counters change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCountersToStorage(counters);
    }
  }, [counters, isLoaded]);

  const updateCounter = useCallback(
    (counterId: string, updates: Partial<Counter>) => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) => {
          if (counter.id === counterId) {
            const updatedCounter = { ...counter, ...updates };
            if ("count" in updates && updatedCounter.count < 0) {
              updatedCounter.count = 0;
            }
            return updatedCounter;
          }
          return counter;
        }),
      );
    },
    [],
  );

  const addCounter = useCallback((dto: AddCounterDto) => {
    setCounters((prevCounters) => [
      ...prevCounters,
      {
        id: generateUniqueId(),
        name: dto.name,
        stepSize: dto.stepSize ?? 1,
        color: dto.color ?? "purple",
        icon: dto.icon ?? "star",
        locked: dto.locked ?? false,
        count: 0,
      },
    ]);
  }, []);

  const addInitialCounters = useCallback((initialCounters: Counter[]) => {
    setCounters((prevCounters) => {
      // Only add if no counters exist yet
      if (prevCounters.length === 0) {
        return initialCounters;
      }
      return prevCounters;
    });
  }, []);

  const deleteCounter = useCallback((counterId: string) => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => counter.id !== counterId),
    );
  }, []);

  const deleteAllCounters = useCallback(() => {
    setCounters([]);
  }, []);

  const deleteAllDemoCounters = useCallback(() => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => !counter.id.includes("test")),
    );
  }, []);

  return {
    updateCounter,
    addCounter,
    addInitialCounters,
    deleteCounter,
    deleteAllCounters,
    deleteAllDemoCounters,
    counters,
    isLoaded,
  };
}
