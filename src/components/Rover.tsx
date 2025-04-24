import { useState } from "react";
import { DirectionLabels, type Rover } from "../types/types";

const Rover = () => {
  const [rover, setRover] = useState<Rover>({
    position: { x: 0, y: 0 },
    direction: "N",
  });

  return (
    <>
      <div className="rover-container">
        <h2 className="rover-title">🛰️ Estado del Rover 🛰️</h2>
        <p className="rover-info">
          📍Posición: ({rover.position.x}, {rover.position.y})
        </p>
        <p className="rover-info">
          💠Dirección: {DirectionLabels[rover.direction]}
        </p>
      </div>
    </>
  );
};

export default Rover;
