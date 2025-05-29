import { Color } from "@/api/api";
import styles from "./color-icon.module.css";

interface ColorIconProps {
  color: Color;
  selected?: boolean;
}

export function ColorIcon(props: ColorIconProps) {
  return (
    <div
      className={`${styles.container} ${props.color}-counter ${props.selected ? styles.selected : ""}`}
    ></div>
  );
}
