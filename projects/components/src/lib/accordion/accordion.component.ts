import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

export interface AccordionEvent {
  type: string;
}

@Component({
  selector: 'ag-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements OnChanges, AfterContentInit {
  @Input() public isOpen: boolean;
  @Input() public label: string;
  @Input() public disabled: boolean;
  @Output() public open: EventEmitter<AccordionEvent> = new EventEmitter();
  @Output() public close: EventEmitter<AccordionEvent> = new EventEmitter();
  @Output() public change: EventEmitter<AccordionEvent> = new EventEmitter();

  private readonly OPEN_EVENT: AccordionEvent;
  private readonly CLOSE_EVENT: AccordionEvent;
  private readonly CHANGE_EVENT: AccordionEvent;

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
    this.OPEN_EVENT = this._createEvent('open');
    this.CLOSE_EVENT = this._createEvent('close');
    this.CHANGE_EVENT = this._createEvent('change');
  }

  public ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpen && !changes.isOpen.firstChange) {
      this._emitEvents(changes.isOpen.currentValue);
    }
    if (changes.disabled && changes.disabled.currentValue) {
      this.isOpen = false;
      this.cd.detectChanges();
    }
  }

  public onToggleContent(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    this._emitEvents(this.isOpen);
  }

  private _emitEvents(isOpen: boolean): void {
    if (isOpen) {
      this.open.emit(this.OPEN_EVENT);
    } else {
      this.close.emit(this.CLOSE_EVENT);
    }
    this.change.emit(this.CHANGE_EVENT);
    this.cd.detectChanges();
  }

  private _createEvent(type: string): AccordionEvent {
    return {type};
  }
}
