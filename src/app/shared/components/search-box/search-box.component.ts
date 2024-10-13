import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //subject tipo especial de observable
  private dBouncer: Subject<string> = new Subject<string>();
  private dBouncerSuscription?: Subscription;

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  //Emite lo que se envia desde el buscador
  @Output()
  onValue: EventEmitter<string> = new EventEmitter;

  @Output()
  onDBounce: EventEmitter<string> = new EventEmitter;

  @Output()
  onLetterSelected: EventEmitter<string> = new EventEmitter;

  // Con ViewChild lo que hago es hacer referencia al input que tengo en el html. Le pongo ! para indicar que siempre tiene valor y asi no me de fallo.
  @ViewChild('txtInput')
  public tagInput! : ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: String = '';

  @Input()
  public initialValue: String = '';

  //el observable emite un valor, el operador del time dice que tienes que esperar 1 seg si no recibo mas valores, y si eso se cumple, se hace el subscribe
  ngOnInit(): void {
    this.dBouncerSuscription = this.dBouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDBounce.emit(value);
    })
  }

  //OnDestroy. Cada vez que cambias de componente, el susbribe deja de funcionar. Solo va a funcionar en esta ruta
  ngOnDestroy(): void {
    this.dBouncerSuscription?.unsubscribe();
  }

  emitValue() :void {

    const input = this.tagInput.nativeElement.value;
    this.onValue.emit(input);
    this.tagInput.nativeElement.value = ''; //Limpiar el value
  }

  onKeyPress(searchTearm: string) {
    this.dBouncer.next(searchTearm);
  }

  //LLama por abecedario (letra)
  onLetterClick(letter: string): void {
    this.onLetterSelected.emit(letter);
  }
}


