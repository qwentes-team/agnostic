import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {log} from 'util';

export type ToggleBoolean = boolean | 'true' | 'false';

@Component({
  selector: 'ag-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges {
  @Input()
  public name: string;
  @Input()
  public disabled: ToggleBoolean;
  @Input()
  public checked: ToggleBoolean;
  @Input()
  public value: any;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges({disabled, checked, formControlName}: SimpleChanges) {
    if (formControlName) {
      this.name = formControlName.currentValue;
    }
    if (checked) {
      this.checked = this.convertToBoolean(checked.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
  }

  private convertToBoolean(value: ToggleBoolean): boolean {
    return value === 'false' ? false : !!value;
  }

  public writeValue(value: any): void {
    this.updateValue({
      target: {value, checked: this.convertToBoolean(value)},
    });
  }

  public registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: ToggleBoolean): void {
    this.disabled = this.convertToBoolean(disabled);
  }

  public emitToNgModel(event: any): void {
    const value = this.updateValue(event);
    this.onChange(value);
  }

  public onChange = (value: boolean | string) => {};

  private onTouched = () => {};

  private updateValue(event): boolean | any {
    this.value = event.target.value;
    this.checked = !!event.target.checked;
    this.cd.detectChanges();
    return this.checked;
  }
}
