import { useMemo } from "react";
import { Position, Direction } from "../../types/types";

interface Props {
  roverPosition: Position;
  roverDirection: Direction;
  obstacles: Position[];
  size: number;
}

{
  /* Renderització de la quadrícula amb el rover i obstacles */
}
const RoverGrid = ({
  roverPosition,
  roverDirection,
  obstacles,
  size,
}: Props) => {
  const grid = useMemo(() => {
    const isObstacle = (x: number, y: number) =>
      obstacles.some((obs) => obs.x === x && obs.y === y);

    const isRover = (x: number, y: number) =>
      roverPosition.x === x && roverPosition.y === y;

    const rows: React.ReactNode[] = [];

    for (let y = size - 1; y >= 0; y--) {
      const cells: React.ReactNode[] = [];

      for (let x = 0; x < size; x++) {
        const isObstacleHere = isObstacle(x, y);
        const isRoverHere = isRover(x, y);

        cells.push(
          <div key={`${x},${y}`} className="grid-cell">
            {isObstacleHere && <span className="obstacle-icon">🌋</span>}
            {isRoverHere && (
              <span className={`rover-icon dir-${roverDirection}`}>🔼</span>
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

    return rows;
  }, [roverPosition, roverDirection, obstacles, size]);

  return <div className="grid">{grid}</div>;
};

export default RoverGrid;
