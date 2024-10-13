import { AfterViewInit, Component, Input } from '@angular/core';
import { Digimon } from '../../interfaces/digimon';
import { DigimonHref } from '../../interfaces/digimonHref';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'countries-digimon-table',
  templateUrl: './digimon-table.component.html',
  styleUrl: './digimon-table.component.css'
})
export class DigimonTableComponent {

  @Input()
  public digimons: DigimonHref[] = [];

  selectedImage: string = '';
  modalImageSrc: string = '';

  //get skills
  getSkills(digimon: DigimonHref): string[] {

    if (digimon.skills && digimon.skills.length > 0) {
      return digimon.skills.slice(0, 3).map(skill => skill.skill);
    }
    return ['No attacks available'];
  }

  //get levels
  getLevels(digimon: DigimonHref): string {
    if (digimon.levels && digimon.levels.length > 0) {
      return digimon.levels.slice(0, 3).map(level => level.level).join(', ');
    }
    return 'No levels available';
  }

   // Función para abrir el modal
   openModal(imageUrl: string): void {
    this.modalImageSrc = imageUrl; // Almacena la URL de la imagen
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Abre el modal
    } else {
      console.error('El modal no se encontró en el DOM');
    }
  }

  // Función para cerrar el modal
  closeModal(): void {
    const modal = bootstrap.Modal.getInstance("imageModal");
    if (modal) {
      modal.hide(); // Cierra el modal
    }
  }
}
