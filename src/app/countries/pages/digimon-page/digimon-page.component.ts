import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigimonService } from '../../services/digimon.service';
import { DigimonHref } from '../../interfaces/digimonHref';

@Component({
  selector: 'app-digimon-page',
  templateUrl: './digimon-page.component.html',
  styles: './digimon-page.component.css'
})
export class DigimonPageComponent implements OnInit{

  constructor( private activatedRoute: ActivatedRoute, private digimonService: DigimonService ) {}
  currentDigimon?: DigimonHref;
  public digimons: DigimonHref[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.
    subscribe(({id}) => {
      this.digimonService.searchById(id)
      .subscribe((result: DigimonHref[]) => {// Aquí debería mostrar todos los Digimon encontrados
      this.digimons = result;  // Guardas el resultado en tu array
    });
    })
  }
}
