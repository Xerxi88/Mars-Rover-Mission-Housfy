export type Direction = 'N'|'S'|'E'|'O'

export enum DirectionLabels {
    N = "Nord",
    S = "Sud",
    E = "Est",
    O = "Oest",
  };

export interface Position {
    x:number;
    y:number;
}

export interface Rover {
    position:Position;
    direction:Direction
}