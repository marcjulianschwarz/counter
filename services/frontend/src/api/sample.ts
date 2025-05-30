import { Counter } from "./api";

export const SAMPLE_COUNTERS: Omit<Counter, "id">[] = [
  {
    name: "Autos",
    color: "green",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "car",
  },
  {
    name: "Häuser",
    color: "blue",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "house",
  },
  {
    name: "Bäume",
    color: "green",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "trees",
  },
  {
    name: "Berge",
    color: "orange",
    count: 0,
    stepSize: 1,
    locked: false,
    icon: "mountain",
  },
  {
    name: "Kameras",
    color: "purple",
    count: 0,
    stepSize: 1,
    locked: true,
    icon: "camera",
  },
];
