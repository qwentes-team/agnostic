import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export type ToggleTheme = 'material' | 'ios';
export type ToggleType = 'checkbox' | 'radio';
export type TogglePosition = 'before' | 'after';
export type ToggleBoolean = boolean | 'true' | 'false';

@Component({
  selector: 'ag-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent
  implements ControlValueAccessor, OnInit, OnChanges {
  @Input()
  public name: string;
  @Input()
  public formControlName: string;
  @Input()
  public value: any;
  @Input()
  public checked: ToggleBoolean;
  @Input()
  public disabled: ToggleBoolean;
  @Input()
  public required: ToggleBoolean;
  @Input()
  public type: ToggleType = 'checkbox';
  @Input()
  public theme: ToggleTheme = 'material';
  @Input()
  public position: TogglePosition = 'before';
  private isCheckbox: boolean;

  @HostBinding('attr.theme')
  get themeType() {
    return this.theme;
  }

  @HostBinding('attr.position')
  get positionType() {
    return this.position;
  }

  public ngOnInit() {
    this.isCheckbox = this.type === 'checkbox';
  }

  public ngOnChanges({
    checked,
    disabled,
    required,
    formControlName,
    type,
  }: SimpleChanges) {
    if (formControlName) {
      this.name = formControlName.currentValue;
    }
    if (checked) {
      this.checked = this.convertToBoolean(checked.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
    if (required) {
      this.required = this.convertToBoolean(required.currentValue);
    }
  }

  private convertToBoolean(value: ToggleBoolean): boolean {
    return value === 'false' ? false : !!value;
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(value: any): void {
    this.checked = typeof value === 'boolean' ? value : this.value === value;
    this.emitToNgModel({target: {value: (this.value || value), checked: this.checked}});
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: boolean | any) => void): void {
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

  emitToNgModel(event: any): void {
    const value = this.isCheckbox ? event.target.checked : event.target.value;
    this.onChange(value);
  }

  // Function to call when the changes.
  onChange = (value: boolean | string) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};
}
