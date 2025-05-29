import styles from "./color-picker.module.css";
import { ColorIcon } from "../ColorIcon/ColorIcon";
import { Color } from "@/api/api";

interface ColorPickerProps {
  colors: Color[];
  onSelect?: (color: Color) => void;
  selectedColor?: Color;
}

export function ColorPicker(props: ColorPickerProps) {
  return (
    <div className={styles.container}>
      {props.colors.map((color) => (
        <div
          key={color}
          onClick={() => props.onSelect?.(color)}
          className={styles.colorContainer}
        >
          <ColorIcon color={color} selected={color === props.selectedColor} />
        </div>
      ))}
    </div>
  );
}
