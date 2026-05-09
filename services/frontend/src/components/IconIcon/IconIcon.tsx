import type { Color, Icon } from "@/api/api";
import styles from "./icon-icon.module.css";
import {
  Car,
  House,
  Banana,
  Camera,
  Book,
  Pencil,
  Trees,
  Ruler,
  Fish,
  Lamp,
  Mountain,
  Sun,
  Lock,
  Star,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<Icon, ComponentType<LucideProps>> = {
  car: Car,
  house: House,
  banana: Banana,
  camera: Camera,
  book: Book,
  pencil: Pencil,
  trees: Trees,
  ruler: Ruler,
  fish: Fish,
  lamp: Lamp,
  mountain: Mountain,
  sun: Sun,
  lock: Lock,
  star: Star,
};

interface IconIconProps {
  icon: Icon;
  selected?: boolean;
  color?: Color;
}

export function IconIcon(props: IconIconProps) {
  const LucideIcon = ICON_MAP[props.icon];
  return (
    <div
      className={`${styles.container} ${props.selected ? styles.selected : ""} ${props.color}-bg-dark`}
    >
      <LucideIcon size={20} />
    </div>
  );
}
