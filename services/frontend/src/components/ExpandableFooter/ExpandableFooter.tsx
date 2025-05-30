import { ChevronsDown, ChevronsUp } from "lucide-react";
import styles from "./expandable-footer.module.css";

interface ExpandableFooterProps {
  expanded?: boolean;
  onExpand?: () => void;
  children?: React.ReactNode;
}

export function ExpandableFooter(props: ExpandableFooterProps) {
  return (
    <div
      className={`${styles.container} ${props.expanded ? styles.expanded : ""}`}
    >
      <div className={styles.expander}>
        <button className={styles.expanderButton} onClick={props.onExpand}>
          {props.expanded ? <ChevronsDown /> : <ChevronsUp />}
          <p>Settings</p>
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.contentInner}>{props.children}</div>
      </div>
    </div>
  );
}
