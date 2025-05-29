export interface Counter {
  id: string;
  name: string;
  icon: Icon;
  color: Color;
  locked: boolean;
  count: number;
  stepSize: number;
}

export interface Settings {
  clickSound: boolean;
}

export type Color = "red" | "green" | "blue" | "orange";
export type Icon = "house" | "car" | "lock";
