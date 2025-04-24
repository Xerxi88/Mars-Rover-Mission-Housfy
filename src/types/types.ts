export type Direction = 'N'|'S'|'E'|'O'

export enum DirectionLabels {
    N = "Norte",
    S = "Sur",
    E = "Este",
    O = "Oeste",
  };

export interface Position {
    x:number;
    y:number;
}

export interface Rover {
    position:Position;
    direction:Direction
}