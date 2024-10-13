import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonTableComponent } from './digimon-table.component';

describe('DigimonTableComponent', () => {
  let component: DigimonTableComponent;
  let fixture: ComponentFixture<DigimonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigimonTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigimonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
