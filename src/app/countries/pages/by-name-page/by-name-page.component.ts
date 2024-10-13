import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../../services/digimon.service';
import { Digimon } from '../../interfaces/digimon';
import { HttpClient } from '@angular/common/http';
import { DigimonHref } from '../../interfaces/digimonHref';

@Component({
  selector: 'app-by-name-page',
  templateUrl: './by-name-page.component.html',
  styleUrl: './by-name-page.component.css'
})
export class ByNamePageComponent implements OnInit{

  public digimons: DigimonHref[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  //ctr solo inyeccion de dependencias
  constructor(private digimonService: DigimonService) {}

  //Inicialmente el componente tiene que hacer una llamada api a todos los digimon
  ngOnInit(): void {

    if(this.digimonService.cacheStore.byName.digimon.length === 0) {
      this.digimonService.loadAllDigimons();
      //this.digimons = this.digimonService.digimonsOnInit;
    }
    else {
      this.digimons = this.digimonService.cacheStore.byName.digimon;
      this.initialValue = this.digimonService.cacheStore.byName.term;
    }
  }

  //Search digimon by name
  searchByName(term: string) :void {
    if(term != '') {
      this.digimons = this.digimonService.searchDigimonByName(term);
    }
  }

  //Search digimon by name
  searchByletter(term: string) :void {
    this.digimons = this.digimonService.searchDigimonByLetter(term);
  }
}
