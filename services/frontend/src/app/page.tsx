"use client";
import { CounterView } from "@/components/Counter/Counter";
import styles from "./page.module.css";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { Color, Counter } from "@/api/api";
import { MinusIcon, PlusIcon } from "lucide-react";
import CounterButton from "@/components/CounterButton/CounterButton";
import { ColorPicker } from "@/components/ColorPicker/ColorPicker";

export default function Home() {
  const initialCounters: Counter[] = [
    {
      name: "Autos",
      id: "test",
      color: "green",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: {
        id: "q",
        color: "red",
      },
    },
    {
      name: "Häuser",
      id: "test2",
      color: "red",
      count: 0,
      stepSize: 2,
      locked: false,
      icon: {
        id: "q",
        color: "red",
      },
    },
    {
      name: "Bäume",
      id: "test3",
      color: "blue",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: {
        id: "q",
        color: "red",
      },
    },
    {
      name: "Bäume",
      id: "test4",
      color: "orange",
      count: 0,
      stepSize: 1,
      locked: false,
      icon: {
        id: "q",
        color: "red",
      },
    },
  ];

  const [counters, setCounters] = useState(initialCounters);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addStepSize, setAddStepSize] = useState("");
  const [addColor, setAddColor] = useState<Color>("blue");

  const [openedCounter, setOpenedCounter] = useState<Counter>();

  const updateCounter = (counterId: string, increment: boolean) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) => {
        if (counter.id === counterId && !counter.locked) {
          const newCount = increment
            ? counter.count + counter.stepSize
            : Math.max(0, counter.count - counter.stepSize); // Prevent negative counts

          const updatedCounter = { ...counter, count: newCount };

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
    if (openedCounter) {
      updateCounter(openedCounter.id, true);
    }
  };

  const handleMinus = () => {
    if (openedCounter) {
      updateCounter(openedCounter.id, false);
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
        icon: {
          color: "red",
          id: "hey",
        },
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
            <button onClick={handleMinus}>
              <MinusIcon />
            </button>
            <button onClick={handlePlus}>
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
              colors={["blue", "green", "orange", "red"]}
              selectedColor={addColor}
              onSelect={setAddColor}
            />
            <p>ICON PICKER</p>
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
