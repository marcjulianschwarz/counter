import { PlusIcon } from "lucide-react";
import styles from "./counter-button.module.css";

interface CounterButtonProp {
  onClick?: () => void;
}

export default function CounterButton(props: CounterButtonProp) {
  return (
    <div className={styles.container}>
      <button onClick={props.onClick}>
        <PlusIcon width={40} height={40} strokeWidth={2} />
      </button>
    </div>
  );
}
