
export interface Driver {
  POS: number;
  NUMBER: number;
  DRIVER: string;
  HOMETOWN: string;
  TEAM: string;
  FL_TIME: string;
  FL_LAP: number;
  FL_TIME_SECONDS: number;
}

export interface RaceData {
  drivers: Driver[];
}

export enum TrackTurn {
  Turn1 = "Turn 1 - The Big Bend",
  Turn5 = "Turn 5 - The Carousel",
  Turn11 = "Turn 11 - Hairpin",
  Turn15 = "Turn 15 - Stadium Corner",
  FinalCorner = "Final Corner - Main Straight Entry"
}
