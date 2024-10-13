import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';import { CountriesRoutingModule } from './digimon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ByNamePageComponent } from './pages/by-name-page/by-name-page.component';
import { ByLevelPageComponent } from './pages/by-level-page/by-level-page.component';
import { DigimonPageComponent } from './pages/digimon-page/digimon-page.component';
import { DigimonTableComponent } from './components/digimon-table/digimon-table.component';

@NgModule({
  declarations: [
    ByNamePageComponent,
    ByLevelPageComponent,
    ByRegionPageComponent,
    DigimonTableComponent,
    DigimonPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class DigimonModule { }
