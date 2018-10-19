import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ToggleTheme = 'material' | 'ios';
export type ToggleType = 'checkbox' | 'radio';
export type TogglePosition = 'before' | 'after';
export type ToggleBoolean = boolean | 'true' | 'false';

export class ToggleChange {
  constructor(
    public name: string,
    public value: any,
    public checked: boolean,
  ) {
  }
}

@Component({
  selector: 'ag-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }]
})
export class ToggleComponent implements ControlValueAccessor, OnChanges {
  @Input() public name: string;
  @Input() public formControlName: string;
  @Input() public value: any;
  @Input() public checked: ToggleBoolean;
  @Input() public disabled: ToggleBoolean;
  @Input() public required: ToggleBoolean;
  @Input() public type: ToggleType = 'checkbox';
  @Input() public theme: ToggleTheme = 'material';
  @Input() public position: TogglePosition = 'before';
  @Output() public change: EventEmitter<ToggleChange> = new EventEmitter();

  @HostBinding('attr.theme') get themeType() {
    return this.theme;
  }

  @HostBinding('attr.position') get positionType() {
    return this.position;
  }

  public ngOnChanges({checked, disabled, required, formControlName}: SimpleChanges) {
    if (formControlName) {
      this.name = formControlName.currentValue;
    }
    if (checked) {
      this.checked = checked.currentValue;
      // this.emitValue(checked.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
      // this.disabled = this.convertToBoolean(disabled.currentValue);
    }
    if (required) {
      this.required = this.convertToBoolean(required.currentValue);
    }
  }

  // public emitValue(checked: boolean): void {
  //   this.change.emit(new ToggleChange(this.name, this.value, checked));
  // }

  private convertToBoolean(value: ToggleBoolean): boolean {
    return value === 'false' ? false : !!value;
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(value: any): void {
    this.checked = typeof value === 'boolean' ? (value || this.value === value) : false;
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(disabled: ToggleBoolean): void {
    this.disabled = this.convertToBoolean(disabled);
  }

  // Function to call when the rating changes.
  onChange = (value: any) => {
  };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
  };
}
