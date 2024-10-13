import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { ByNamePageComponent } from './pages/by-name-page/by-name-page.component';
import { ByLevelPageComponent } from './pages/by-level-page/by-level-page.component';
import { DigimonPageComponent } from './pages/digimon-page/digimon-page.component';

const routes: Routes = [
   {
    path: 'by-name',
    component: ByNamePageComponent
   },
   {
    path: 'by-level',
    component: ByLevelPageComponent
   },
   {
    path: 'by-region',
    component: ByRegionPageComponent
   },
   {
    path: 'by/:id',
    component: DigimonPageComponent
   },
   {
    path: '**',
    redirectTo: 'by-capital'
   }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
