import { Icon } from "@/api/api";
import styles from "./icon-picker.module.css";
import { IconIcon } from "../IconIcon/IconIcon";

interface IconPickerProps {
  icons: Icon[];
  onSelect?: (icon: Icon) => void;
  selectedIcon?: Icon;
}

export function IconPicker(props: IconPickerProps) {
  return (
    <div className={styles.container}>
      {props.icons.map((icon) => (
        <div
          key={icon}
          onClick={() => props.onSelect?.(icon)}
          className={styles.iconContainer}
        >
          <IconIcon icon={icon} selected={icon === props.selectedIcon} />
        </div>
      ))}
    </div>
  );
}
