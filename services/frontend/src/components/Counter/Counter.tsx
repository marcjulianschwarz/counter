import { Counter } from "@/api/api";
import styles from "./counter.module.css";

interface CounterViewProps {
  counter: Counter;
  onClick?: () => void;
}

export function CounterView(props: CounterViewProps) {
  const { counter } = props;
  return (
    <div
      className={`${styles.container} ${counter.color}-counter`}
      onClick={props.onClick}
    >
      <div className={styles.left}>
        <p>{counter.name}</p>
      </div>
      <div className={styles.right}>
        <p>{counter.count}</p>
      </div>
    </div>
  );
}
