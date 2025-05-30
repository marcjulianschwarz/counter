"use client";
import { Counter } from "@/api/api";
import { useCallback, useState } from "react";

const initialCounters: Counter[] = [
  {
    name: "Autos",
    id: "test",
    color: "green",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "car",
  },
  {
    name: "Häuser",
    id: "test2",
    color: "red",
    count: 0,
    stepSize: 2,
    locked: false,
    icon: "house",
  },
  {
    name: "Bäume",
    id: "test3",
    color: "blue",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "house",
  },
  {
    name: "Bäume",
    id: "test4",
    color: "orange",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "car",
  },
];

type AddCounterDto = Partial<
  Pick<Counter, "color" | "icon" | "locked" | "stepSize">
> &
  Required<Pick<Counter, "name">>;

export function useCounters() {
  const [counters, setCounters] = useState(initialCounters);

  console.log("use counters");

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
        id: dto.name + new Date(),
        name: dto.name,
        stepSize: dto.stepSize ?? 1,
        color: dto.color ?? "purple",
        icon: dto.icon ?? "star",
        locked: dto.locked ?? false,
        count: 0,
      },
    ]);
  }, []);

  const deleteCounter = useCallback((counterId: string) => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => counter.id !== counterId),
    );
  }, []);

  const deleteCallCounters = useCallback(() => {
    setCounters([]);
  }, []);

  return {
    updateCounter,
    addCounter,
    deleteCounter,
    deleteCallCounters,
    counters,
  };
}
