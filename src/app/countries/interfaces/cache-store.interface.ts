import { DigimonHref } from "./digimonHref";
import { LevelType } from "./level.type";

export interface CacheStore {
  byName: TermDigimon;
  ByLevel: LevelDigimon;
}

export interface TermDigimon {
  term: string;
  digimon: DigimonHref[];
}

export interface LevelDigimon {
  level: LevelType;
  digimon: DigimonHref[];
}

