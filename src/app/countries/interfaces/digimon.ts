import { DigimonHref } from "./digimonHref";

export interface Digimon {
  content:  Content[];
  pageable: Pageable;
}

export interface Content {
  id:    number;
  name:  string;
  href:  DigimonHref;
  image: string;
}

export interface Pageable {
  currentPage:    number;
  elementsOnPage: number;
  totalElements:  number;
  totalPages:     number;
  previousPage:   string;
  nextPage:       string;
}
