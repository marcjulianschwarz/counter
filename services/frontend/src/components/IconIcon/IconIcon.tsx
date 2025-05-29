import { Color, Icon } from "@/api/api";
import styles from "./icon-icon.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

interface IconIconProps {
  icon: Icon;
  selected?: boolean;
  color?: Color;
}

export function IconIcon(props: IconIconProps) {
  return (
    <div
      className={`${styles.container} ${props.selected ? styles.selected : ""} ${props.color}-bg-dark`}
    >
      <DynamicIcon name={props.icon} size={20} />
    </div>
  );
}
