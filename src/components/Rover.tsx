import { useState } from "react";
import { Direction, DirectionLabels, type Rover } from "../types/types";

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

  return (
    <>
      <header>
        <section className="rover-panel-input">
          <input
            type="text"
            value={commands}
            onChange={(e) => setCommands(e.target.value)}
            placeholder="Introduce comandos: f, l, r"
            className="rover-input"
          />
          <button onClick={handleCommands}>Ejecutar comandos</button>
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
