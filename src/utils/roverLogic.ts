import { Direction, Rover, Position } from "../types/types";

// Moviment cap endavant segons la direcció actual del rover
export const moveForward = (
  rover: Rover,
  size: number,
  obstacles: Position[]
): void => {
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

  if (isObstacle(newX, newY, obstacles)) {
    throw new Error(
      `¡Obstacle detectat a (X:${newX}, Y:${newY})!\n Rover detingut a X:${rover.position.x},Y:${rover.position.y}`
    );
  }

  if (isOutOfBounds(newX, newY, size)) {
    throw new Error(
      `Fora de límits! El rover no pot anar a (X:${newX}, Y:${newY}).`
    );
  }

  rover.position = { x: newX, y: newY };
};

// Comprovació si una cel·la conté un obstacle
const isObstacle = (x: number, y: number, obstacles: Position[]) => {
    return obstacles.some((obs) => obs.x === x && obs.y === y);
  };
  
// Comprovació si una posició és fora dels límits de la quadrícula
  const isOutOfBounds = (x: number, y: number, size: number) => {
    return x < 0 || y < 0 || x >= size || y >= size;
  };


// Rotació a l'esquerra (sentit contrari a les agulles del rellotge)
export const rotateLeft = (rover: Rover): void => {
  rotate(rover, ["N", "O", "S", "E"]);
};

// Rotació a la dreta (sentit de les agulles del rellotge)
export const rotateRight = (rover: Rover): void => {
  rotate(rover, ["N", "E", "S", "O"]);
};

// Funció genèrica per fer rotacions del rover (esquerra o dreta)
const rotate = (rover: Rover, directionList: Direction[]): void => {
    const idx = directionList.indexOf(rover.direction);
    rover.direction = directionList[(idx + 1) % directionList.length]; // S'utilitza el mòdul % .lenght per assegurar-se que quan
    // s'arriba al final de l'array, torni a començar pel primer element (circular).
  };