import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ToggleBoolean} from '../toggle/toggle.component';
import {convertToBoolean, EmitToNgModel, noop} from '../components.shared';

@Component({
  selector: 'ag-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnChanges, ControlValueAccessor, EmitToNgModel {
  @Input()
  name = '';

  @Input()
  value = '';

  @Input()
  disabled = false;

  @Input()
  required = false;

  @Input()
  metaLabel = '';

  @Input()
  placeholder = '';

  @Output()
  change: EventEmitter<Event> = new EventEmitter();

  @Output()
  blur: EventEmitter<Event> = new EventEmitter();

  @Output()
  focus: EventEmitter<Event> = new EventEmitter();

  public onChange = noop.onChange;
  public onTouched = noop.onTouched;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges({checked, disabled, required}: SimpleChanges) {
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
    if (required) {
      this.required = convertToBoolean(required.currentValue);
    }
  }

  writeValue(value: string): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: ToggleBoolean): void {
    this.disabled = convertToBoolean(disabled);
    this.cd.detectChanges();
  }

  public emitToNgModel(event: Event): void {
    this.change.emit(event);
    this.onChange(this.updateValue((event.target as HTMLInputElement).value));
  }

  public updateValue(newValue: string): string {
    this.value = newValue;
    this.cd.detectChanges();
    return this.value;
  }
}
