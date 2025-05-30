"use client";
import { CounterView } from "@/components/Counter/Counter";
import styles from "./page.module.css";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { Color, Counter, Icon } from "@/api/api";
import { EditIcon, LockIcon, MinusIcon, PlusIcon } from "lucide-react";
import CounterButton from "@/components/CounterButton/CounterButton";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { IconPicker } from "@/components/IconPicker/IconPicker";
import { ExpandableFooter } from "@/components/ExpandableFooter/ExpandableFooter";
import { useCounters } from "@/hooks/useCounters";
import { SAMPLE_COUNTERS } from "@/api/sample";

export default function Home() {
  const {
    counters,
    updateCounter,
    addCounter,
    deleteCounter,
    deleteAllCounters,
    deleteAllDemoCounters,
    addInitialCounters,
  } = useCounters();

  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addName, setAddName] = useState("");
  const [addStepSize, setAddStepSize] = useState("");
  const [addColor, setAddColor] = useState<Color>("blue");
  const [addIcon, setAddIcon] = useState<Icon>("car");

  const [openedCounterId, setOpenedCounterId] = useState<string>();
  const [footerExpanded, setFooterExpanded] = useState(false);

  const openedCounter = openedCounterId
    ? counters.find((counter) => counter.id === openedCounterId)
    : undefined;

  const handlePlus = () => {
    if (openedCounter && !openedCounter.locked) {
      updateCounter(openedCounter.id, {
        count: openedCounter.count + openedCounter.stepSize,
      });
    }
  };

  const handleMinus = () => {
    if (openedCounter && !openedCounter.locked) {
      updateCounter(openedCounter.id, {
        count: openedCounter.count - openedCounter.stepSize,
      });
    }
  };

  const handleAddCounter = () => {
    if (isEditMode) {
      if (openedCounter) {
        updateCounter(openedCounter.id, {
          name: addName,
          stepSize: parseInt(addStepSize),
          color: addColor,
          icon: addIcon,
        });
      }
    } else {
      const stepsize = parseInt(addStepSize);
      addCounter({
        name: addName,
        icon: addIcon,
        color: addColor,
        stepSize: isNaN(stepsize) ? 1 : stepsize,
      });
    }

    setIsEditMode(false);
    setAddModalOpen(false);
    setAddName("");
    setAddStepSize("");
  };

  const handleDeleteCounter = (counterToDelete: Counter) => {
    deleteCounter(counterToDelete.id);
  };

  const handleClickCounter = (counter: Counter) => {
    setOpenedCounterId(counter.id);
    setModalOpen(true);
  };

  const handleEditCounter = () => {
    if (!openedCounter || openedCounter.locked) return;
    setAddName(openedCounter.name);
    setAddStepSize(openedCounter.stepSize.toString());
    setAddColor(openedCounter.color);
    setAddIcon(openedCounter.icon);
    setModalOpen(false);
    setIsEditMode(true);
    setAddModalOpen(true);
  };

  const handleLockCounter = () => {
    if (openedCounter) {
      updateCounter(openedCounter.id, {
        locked: !openedCounter.locked,
      });
    }
  };

  const handleDeleteAll = () => {
    deleteAllCounters();
    setOpenedCounterId(undefined);
    setModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <Modal
        isOpen={modalOpen}
        title={openedCounter?.name}
        onClose={() => {
          setModalOpen(false);
        }}
        backgroundColor={openedCounter?.color}
      >
        <div className={styles.counterModal}>
          <h1>{openedCounter?.count}</h1>
          <div className={styles.counterButtons}>
            <button className={styles.counterButton} onClick={handleMinus}>
              <MinusIcon />
            </button>
            <button
              className={`${styles.lockButton} ${openedCounter?.locked ? styles.locked : ""}`}
              onClick={handleLockCounter}
            >
              <LockIcon />
            </button>
            <button className={styles.editButton} onClick={handleEditCounter}>
              <EditIcon />
            </button>
            <button className={styles.counterButton} onClick={handlePlus}>
              <PlusIcon />
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={addModalOpen}
        title={addName || "Add Counter"}
        onClose={() => {
          setAddModalOpen(false);
          setIsEditMode(false);
        }}
      >
        <div className={styles.addModalContainer}>
          <form
            className={styles.addForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCounter();
            }}
          >
            <input
              placeholder="Name"
              onChange={(e) => setAddName(e.target.value)}
              value={addName}
              className="c-input"
            ></input>
            <input
              type="number"
              onChange={(e) => setAddStepSize(e.target.value)}
              value={addStepSize}
              className="c-input"
              placeholder="1"
            ></input>
            <button className="c-button">
              {isEditMode ? "Update" : "Add"}
            </button>
          </form>
          <div className={styles.stylePicker}>
            <ColorPicker
              colors={["blue", "green", "orange", "red", "yellow", "purple"]}
              selectedColor={addColor}
              onSelect={setAddColor}
            />
            <IconPicker
              icons={[
                "car",
                "house",
                "lock",
                "camera",
                "book",
                "pencil",
                "trees",
                "ruler",
                "fish",
                "lamp",
                "mountain",
              ]}
              selectedIcon={addIcon}
              onSelect={setAddIcon}
              color={addColor}
            />
          </div>
        </div>
      </Modal>

      <div className={styles.container}>
        {counters.map((counter) => (
          <div key={counter.id} className={styles.counterItem}>
            <CounterView
              counter={counter}
              onClick={handleClickCounter}
              onDelete={handleDeleteCounter}
            />
          </div>
        ))}
        <CounterButton onClick={() => setAddModalOpen(true)} />
      </div>

      <ExpandableFooter
        expanded={footerExpanded}
        onExpand={() => setFooterExpanded(() => !footerExpanded)}
      >
        <div className={styles.settings}>
          <button
            className="c-button"
            onClick={() => addInitialCounters(SAMPLE_COUNTERS)}
          >
            Add demo counters
          </button>
          <button className="c-button danger" onClick={deleteAllDemoCounters}>
            Delete all demo counters
          </button>
          <button className="c-button danger" onClick={handleDeleteAll}>
            Delete all data
          </button>
        </div>
        <br></br>
        <p>
          Inspired by{" "}
          <a
            className={styles.counterLink}
            href="https://apps.apple.com/de/app/alltagsz%C3%A4hler/id1515808968"
          >
            Alltagszähler
          </a>{" "}
          💙
        </p>
      </ExpandableFooter>
    </div>
  );
}
