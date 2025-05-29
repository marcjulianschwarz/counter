import { Counter } from "@/api/api";
import styles from "./counter.module.css";
import { XIcon } from "lucide-react";

interface CounterViewProps {
  counter: Counter;
  onClick?: (counter: Counter) => void;
  onDelete?: (counter: Counter) => void;
}

export function CounterView(props: CounterViewProps) {
  const { counter } = props;
  return (
    <div
      className={`${styles.container} ${counter.color}-counter`}
      onClick={() => {
        props.onClick?.(counter);
      }}
    >
      <div className={styles.left}>
        <p>{counter.name}</p>
      </div>
      <div className={styles.right}>
        <p>{counter.count}</p>
      </div>
      <button
        className={styles.delete}
        aria-label="Delete item"
        onClick={(e) => {
          e.stopPropagation();
          props.onDelete?.(counter);
        }}
      >
        <XIcon />
      </button>
    </div>
  );
}
