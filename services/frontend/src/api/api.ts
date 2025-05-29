import { IconName } from "lucide-react/dynamic";

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

export type Color = "red" | "green" | "blue" | "orange" | "yellow" | "purple";
export type Icon = IconName;
