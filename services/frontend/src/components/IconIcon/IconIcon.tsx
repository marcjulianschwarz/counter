import { Color, Icon } from "@/api/api";
import styles from "./icon-icon.module.css";
import { Car, House, LockIcon, Trees } from "lucide-react";

interface IconIconProps {
  icon: Icon;
  selected?: boolean;
  color?: Color;
}

export function IconIcon(props: IconIconProps) {
  let iconView = null;
  switch (props.icon) {
    case "car":
      iconView = <Car width={20} height={20} />;
      break;
    case "house":
      iconView = <House width={20} height={20} />;
      break;
    case "lock":
      iconView = <LockIcon width={20} height={20} />;
      break;
    default:
      iconView = <Trees width={20} height={20} />;
      break;
  }

  return (
    <div
      className={`${styles.container} ${props.selected ? styles.selected : ""} ${props.color}-bg-dark`}
    >
      {iconView}
    </div>
  );
}
