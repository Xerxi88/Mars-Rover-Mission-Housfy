import { Direction, DirectionLabels, Position } from "../../types/types";

interface Props {
  position: Position;
  direction: Direction;
}

const RoverStatusPanel = ({ position, direction }: Props) => {
  return (
    <section className="rover-panel">
      <h2 className="rover-title">🛰️ Estat del Rover 🛰️</h2>
      <p className="rover-info">
        📍Posició: (X: {position.x}, Y: {position.y})
      </p>
      <p className="rover-info">💠Direcció: {DirectionLabels[direction]}</p>
    </section>
  );
};

export default RoverStatusPanel;
