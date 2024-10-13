import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = true;  // Estado inicial del acordeón

  toggleAccordion() {
    this.isCollapsed = !this.isCollapsed;
  }
}
