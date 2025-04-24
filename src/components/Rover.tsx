import React, { useState } from "react";
import { Direction, DirectionLabels, type Rover } from "../types/types";
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

const Rover = () => {
  const [rover, setRover] = useState<Rover>({
    position: { x: 0, y: 0 },
    direction: "N",
  });

  const [commands, setCommands] = useState<string>("");

  const handleCommands = () => {
    const newRover = { ...rover };

    for (const command of commands.toLowerCase()) {
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

    setRover(newRover);
    setCommands("");
  };

  const moveForward = (rover: Rover) => {
    const { x, y } = rover.position;

    switch (rover.direction) {
      case "N":
        rover.position.y = y + 1;
        break;
      case "S":
        rover.position.y = y - 1;
        break;
      case "E":
        rover.position.x = x + 1;
        break;
      case "O":
        rover.position.x = x - 1;
        break;
    }
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
    const size = 20; // 10x10
    const rows = [];

    for (let y = size - 1; y >= 0; y--) {
      const cells = [];
      for (let x = 0; x < size; x++) {
        const isRover = rover.position.x === x && rover.position.y === y;
        cells.push(
          <div key={`${x},${y}`} className="grid-cell">
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
      <main>{renderGrid()}</main>
    </>
  );
};

export default Rover;
