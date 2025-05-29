import { Color } from "@/api/api";
import styles from "./color-icon.module.css";

interface ColorIconProps {
  color: Color;
  selected?: boolean;
  theme?: "dark" | "light" | "base";
}

export function ColorIcon(props: ColorIconProps) {
  const theme = props.theme ? props.theme : "base";
  return (
    <div
      className={`${styles.container} ${props.color}-bg-${theme} ${props.selected ? styles.selected : ""}`}
    ></div>
  );
}
