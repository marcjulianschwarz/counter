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

export default function Home() {
  const initialCounters: Counter[] = [
    {
      name: "Autos",
      id: "test",
      color: "green",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: "car",
    },
    {
      name: "Häuser",
      id: "test2",
      color: "red",
      count: 0,
      stepSize: 2,
      locked: false,
      icon: "house",
    },
    {
      name: "Bäume",
      id: "test3",
      color: "blue",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: "house",
    },
    {
      name: "Bäume",
      id: "test4",
      color: "orange",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: "car",
    },
  ];

  const [counters, setCounters] = useState(initialCounters);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addStepSize, setAddStepSize] = useState("");
  const [addColor, setAddColor] = useState<Color>("blue");
  const [addIcon, setAddIcon] = useState<Icon>("car");

  const [openedCounter, setOpenedCounter] = useState<Counter>();

  const updateCounter = (counterId: string, updates: Partial<Counter>) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.id === counterId) {
          // Apply updates while preserving existing properties
          const updatedCounter = { ...counter, ...updates };

          // Prevent negative counts if count is being updated
          if ("count" in updates && updatedCounter.count < 0) {
            updatedCounter.count = 0;
          }

          // Update openedCounter if it matches the current counter
          if (openedCounter?.id === counterId) {
            setOpenedCounter(updatedCounter);
          }

          return updatedCounter;
        }
        return counter;
      }),
    );
  };

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
    setCounters([
      ...counters,
      {
        id: addName + new Date(),
        name: addName,
        stepSize: parseInt(addStepSize),
        color: addColor,
        icon: addIcon,
        locked: false,
        count: 0,
      },
    ]);
    setAddModalOpen(false);
    setAddName("");
    setAddStepSize("");
  };

  const handleDeleteCounter = (counterToDelete: Counter) => {
    setCounters(
      counters.filter((counter) => counter.id !== counterToDelete.id),
    );
  };

  const handleClickCounter = (counter: Counter) => {
    setOpenedCounter(counter);
    setModalOpen(true);
  };

  const handleEditCounter = () => {};

  const handleLockCounter = () => {
    if (openedCounter) {
      updateCounter(openedCounter.id, {
        locked: !openedCounter.locked,
      });
    }
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
              className="c-input"
            ></input>
            <input
              type="number"
              onChange={(e) => setAddStepSize(e.target.value)}
              className="c-input"
              placeholder="1"
            ></input>
            <button className="c-button">Add</button>
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
    </div>
  );
}
