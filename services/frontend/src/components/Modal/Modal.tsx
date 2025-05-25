"use client";
import { createPortal } from "react-dom";
import { useEffect, useState, ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  backgroundColor?: string;
  children: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  backgroundColor,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen && mounted) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (mounted) {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, onClose, mounted]);

  if (!mounted || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div
        className={`${styles.modalContent} ${backgroundColor}-modal-bg`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modalHeader}>
          {title && <h2>{title}</h2>}
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
