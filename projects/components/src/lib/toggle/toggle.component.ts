import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {convertToBoolean, EmitToNgModel, noop} from '../components.shared';

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
export class ToggleComponent implements ControlValueAccessor, OnChanges, EmitToNgModel {
  @Input() public name: string;
  @Input() public value: any;
  @Input() public checked: ToggleBoolean;
  @Input() public disabled: ToggleBoolean;
  @Input() public required: ToggleBoolean;
  @Input() public type: ToggleType = 'checkbox';
  @Input() public theme: ToggleTheme = 'material';
  @Input() public position: TogglePosition = 'before';

  @HostBinding('attr.theme') get themeType() {
    return this.theme;
  }

  @HostBinding('attr.position') get positionType() {
    return this.position;
  }

  public onChange = noop.onChange;
  public onTouched = noop.onTouched;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges({checked, disabled, required, type}: SimpleChanges) {
    if (checked) {
      this.checked = convertToBoolean(checked.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
    if (required) {
      this.required = convertToBoolean(required.currentValue);
    }
  }

  public updateValue(event): boolean | any {
    this.value = event.target.value;
    this.checked = !!event.target.checked;
    this.cd.detectChanges();
    return this.checked;
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  public writeValue(value: any): void {
    this.updateValue({
      target: {value, checked: convertToBoolean(value)},
    });
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  public registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(disabled: ToggleBoolean): void {
    this.disabled = convertToBoolean(disabled);
    this.cd.detectChanges();
  }

  public emitToNgModel(event: any): void {
    const value = this.updateValue(event);
    // wait angular form changes to be completed
    this.onChange(value);
  }
}
