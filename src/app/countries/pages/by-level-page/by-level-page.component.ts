import { Component, OnInit } from '@angular/core';
import { DigimonHref } from '../../interfaces/digimonHref';
import { DigimonService } from '../../services/digimon.service';
import { LevelType } from '../../interfaces/level.type';

@Component({
  selector: 'app-by-level-page',
  templateUrl: './by-level-page.component.html',
  styleUrl: './by-level-page.component.css',
})
export class ByLevelPageComponent implements OnInit{

  public digimons: DigimonHref[] = [];
  public levels?: LevelType[] = ['Baby I','Baby II','Child','Adult','Perfect','Ultimate','Mega'];
  public isLoading: boolean = false;

  constructor(private digimonService: DigimonService) {}

  ngOnInit(): void {
    if(this.digimonService.cacheStore.ByLevel.digimon.length === 0) {
      this.digimonService.loadAllDigimons();
    }
    else {
      this.digimons = this.digimonService.cacheStore.ByLevel.digimon;
    }
  }

  // Método para asignar las clases de Bootstrap según el nivel
  getButtonClass(level: string): string {
    switch (level) {
      case 'Baby I':
      case 'Baby II':
        return 'btn-light'; // bg-light para Baby I y II
      case 'Child':
        return 'btn-secondary'; // bg-secondary para Child
      case 'Adult':
        return 'btn-warning'; // bg-warning para Adult
      case 'Perfect':
        return 'btn-danger'; // bg-danger para Perfect
      case 'Ultimate':
        return 'btn-dark'; // bg-dark para Ultimate
      default:
        return 'btn-primary'; // Color por defecto
    }
  }

  searchByLevel(level: LevelType) :void {

    this.digimons = this.digimonService.searchDigimonbyLevel(level);
  }

}
