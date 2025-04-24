import React, { useEffect, useRef, useState } from "react";
import {
  Direction,
  DirectionLabels,
  Position,
  type Rover,
} from "../types/types";
import {
  ArrowForward,
  ArrowLeft,
  ArrowRight,
  BackspaceIcon,
  ClearIcon,
  SecuencyForward,
  SecuencyLeft,
  SecuencyRight,
} from "../icons/Icons";
import CommandButton from "./CommandButton";

const obstacles: Position[] = [
  { x: 4, y: 6 },
  { x: 9, y: 3 },
  { x: 2, y: 11 },
  { x: 13, y: 8 },
  { x: 17, y: 5 },
  { x: 6, y: 16 },
  { x: 11, y: 9 },
  { x: 1, y: 14 },
  { x: 14, y: 2 },
  { x: 8, y: 13 },
];

const Rover = () => {
  const [rover, setRover] = useState<Rover>({
    position: { x: 0, y: 0 },
    direction: "N",
  });

  const [commands, setCommands] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const size = 20; // 20x20

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleAnimationEnd = () => setErrorMessage(null);
    modal.addEventListener("animationend", handleAnimationEnd);

    return () => {
      modal.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [errorMessage]);

  const isObstacle = (x: number, y: number) => {
    return obstacles.some((obs) => obs.x === x && obs.y === y);
  };

  const isOutOfBounds = (x: number, y: number) => {
    return x < 0 || y < 0 || x >= size || y >= size;
  };

  const handleCommands = () => {
    const newRover = { ...rover };
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      for (const command of commands) {
        switch (command) {
          case "f":
            moveForward(newRover);
            break;
          case "l":
            rotateLeft(newRover);
            break;
          case "r":
            rotateRight(newRover);
            break;
        }
      }
      setSuccessMessage("Todos los comandos ejecutados correctamente");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }

    setRover(newRover);
    setCommands("");
  };

  const moveForward = (rover: Rover) => {
    const { x, y } = rover.position;
    let newX = x;
    let newY = y;

    switch (rover.direction) {
      case "N":
        newY = y + 1;
        break;
      case "S":
        newY = y - 1;
        break;
      case "E":
        newX = x + 1;
        break;
      case "O":
        newX = x - 1;
        break;
    }

    if (isObstacle(newX, newY)) {
      throw new Error(
        `¡Obstáculo detectado en (X:${newX}, Y:${newY})! Rover detenido en X:${rover.position.x},Y:${rover.position.y}`
      );
    }

    if (isOutOfBounds(newX, newY)) {
      throw new Error(
        `¡Fuera de límites! El rover no puede ir a (X:${newX}, Y:${newY}).`
      );
    }

    rover.position = { x: newX, y: newY };
  };

  const rotateLeft = (rover: Rover) => {
    const directions: Direction[] = ["N", "O", "S", "E"];
    const idx = directions.indexOf(rover.direction);
    rover.direction = directions[(idx + 1) % 4];
  };

  const rotateRight = (rover: Rover) => {
    const directions: Direction[] = ["N", "E", "S", "O"];
    const idx = directions.indexOf(rover.direction);
    rover.direction = directions[(idx + 1) % 4];
  };

  const renderGrid = () => {
    const rows = [];

    for (let y = size - 1; y >= 0; y--) {
      const cells = [];
      for (let x = 0; x < size; x++) {
        const isRover = rover.position.x === x && rover.position.y === y;
        const isObstacleHere = isObstacle(x, y);
        cells.push(
          <div key={`${x},${y}`} className="grid-cell">
            {isObstacleHere && <span className="obstacle-icon">🌋</span>}
            {isRover && (
              <span className={`rover-icon dir-${rover.direction}`}>🔼</span>
            )}
          </div>
        );
      }
      rows.push(
        <div key={y} className="grid-row">
          {cells}
        </div>
      );
    }

    return <div className="grid">{rows}</div>;
  };

  const commandIcons: Record<string, React.ReactNode> = {
    f: <SecuencyForward />,
    l: <SecuencyLeft />,
    r: <SecuencyRight />,
  };

  return (
    <>
      <header>
        <section className="rover-panel-input">
          <div className="rover-commands">
            <p className="rover-secuency">
              Secuencia:
              {commands.split("").map((cmd, index) => (
                <span key={index}>{commandIcons[cmd]}</span>
              ))}
            </p>
            <div className="command-buttons">
              <CommandButton
                command="l"
                icon={<ArrowLeft />}
                onClick={(cmd) => setCommands((prev) => prev + cmd)}
              />
              <CommandButton
                command="f"
                icon={<ArrowForward />}
                onClick={(cmd) => setCommands((prev) => prev + cmd)}
              />
              <CommandButton
                command="r"
                icon={<ArrowRight />}
                onClick={(cmd) => setCommands((prev) => prev + cmd)}
              />
              <CommandButton
                command=""
                icon={<BackspaceIcon />}
                onClick={() => setCommands((prev) => prev.slice(0, -1))}
              />
              <CommandButton
                command=""
                icon={<ClearIcon />}
                onClick={() => setCommands("")}
              />
            </div>
            <button onClick={handleCommands} disabled={commands ? false : true}>
              {commands ? "Ejecutar comandos" : "Faltan comandos"}
            </button>
          </div>
        </section>
        <section className="rover-panel">
          <h2 className="rover-title">🛰️ Estado del Rover 🛰️</h2>
          <p className="rover-info">
            📍Posición: (X: {rover.position.x}, Y: {rover.position.y})
          </p>
          <p className="rover-info">
            💠Dirección: {DirectionLabels[rover.direction]}
          </p>
        </section>
      </header>
      <main>
        {errorMessage && (
          <div className="modal-overlay">
            <div className="modal-content fade-in-out" ref={modalRef}>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
        {successMessage && (
          <div className="modal-overlay">
            <div className="modal-content success">
              <p>{successMessage}</p>
            </div>
          </div>
        )}
        {renderGrid()}
      </main>
    </>
  );
};

export default Rover;
