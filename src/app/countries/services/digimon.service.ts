//Service

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable, of } from 'rxjs';
import { Digimon, Content } from '../interfaces/digimon';
import { DigimonHref, Level, Skill } from '../interfaces/digimonHref';
import { catchError, map, tap } from 'rxjs/operators';
import { CacheStore } from '../interfaces/cache-store.interface';
import { LevelType } from '../interfaces/level.type';

@Injectable({providedIn: 'root'})
export class DigimonService {

  private apiUrl: string = 'https://digi-api.com/api/v1/digimon';
  itemsPerPage = 5; // Número de elementos por página
  totalDigimons: number = 1460; // Total de digimons
  totalPages: number = 291;
  currentPage: number = 0; // Página actual
  digimons: DigimonHref[] = []; // Array para almacenar los Digimons
  currentDigimon?: DigimonHref;

  digimonsOnInit: DigimonHref[] = [];

  public cacheStore: CacheStore = {
    byName: {term: '', digimon: []},
    ByLevel: {level: '', digimon: []}
  }

  constructor(private httpClient: HttpClient) {}

  //load all digimons
  loadAllDigimons(): void{

    //load digimons
    for (let i = 1; i <= this.totalDigimons; i++) {
      this.httpClient.get<DigimonHref>(`${this.apiUrl}/${i}`)
        .subscribe((response) => {
          if(response) {
            this.digimonsOnInit.push(response as DigimonHref);
          }
        });
    }
  }

  //Search digimon by id
  searchById(id: number): Observable<DigimonHref[]> {
    this.digimons = [];

    return new Observable<DigimonHref[]>((observer) => {
      let pagesProcessed = 0;  // Contador para las páginas procesadas

      // Recorremos todas las páginas
      for (let page = 0; page <= this.totalPages; page++) {
        this.httpClient.get<any>(`${this.apiUrl}?page=${page}&limit=${this.itemsPerPage}`)
        .subscribe((response) => {
          const digimonList = response.content;  // Accede al array de Digimon
          const filteredDigimon = digimonList.filter((d: { id: number; }) => d.id === (Number(id))); // Filtra los Digimon que contienen el término de búsqueda

          // Si se encontraron resultados
          if (filteredDigimon.length > 0) {
            // Para cada resultado encontrado, haz una llamada api a su href
            filteredDigimon.forEach((digimon: any) => {
              this.httpClient.get<DigimonHref[]>(`${digimon.href}`)
                .subscribe((response2) => {
                  // Si la respuesta es un array, lo agregamos, si no es, lo tratamos como un único objeto
                  if (Array.isArray(response2)) {
                    this.digimons.push(...response2);  // Agrega todos los digimon al array
                  } else {
                    this.digimons.push(response2 as DigimonHref);  // Agrega un solo Digimon
                  }
                });
            });
          }

          // Incrementamos el número de páginas procesadas
          pagesProcessed++;

          // Cuando todas las páginas han sido procesadas, emitimos el array y hacemos el log
          if (pagesProcessed === this.totalPages) {
            observer.next(this.digimons);  // Emitimos los resultados
            observer.complete();  // Completamos el observable
          }
        });
      }
    });
}

  searchDigimonById(id: Number): DigimonHref | undefined {
    this.loadAllDigimons();
    console.log(this.digimonsOnInit);
    const digimonsFound: DigimonHref | undefined  = this.digimonsOnInit.find((digimon: DigimonHref) => digimon.id === Number(id));
    return digimonsFound;
  }

  //search by level
  searchDigimonbyLevel(type: LevelType): DigimonHref[] {

    const digimonsFound = this.digimonsOnInit.filter((digimon: DigimonHref) =>
      digimon.levels && digimon.levels.length > 0 && // Comprobar si levels no es nulo o vacío
      digimon.levels.some(level => level.level === type)
    );

    this.cacheStore.ByLevel.digimon = digimonsFound;
    return digimonsFound;
  }

  searchDigimonByName(term: string) :DigimonHref[] {

    const digimonsFound  = this.digimonsOnInit.filter((digimon: DigimonHref) => digimon.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
    this.cacheStore.byName.digimon = digimonsFound;
    this.cacheStore.byName.term = term;
    return digimonsFound;
  }

  searchDigimonByLetter(term: string) :DigimonHref[] {

    const digimonsFound  = this.digimonsOnInit.filter((digimon: DigimonHref) => digimon.name.toLocaleLowerCase().startsWith(term.toLocaleLowerCase()));
    this.cacheStore.byName.digimon = digimonsFound;
    return digimonsFound;
  }
}
