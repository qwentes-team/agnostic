import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  constructor() {
  }


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

  writeValue(value: any): void {
    this.checked = typeof value === 'boolean' ? value : this.value === value;
    console.log('qui', this.checked);
    this.emitToNgModel({target: {value: this.value, checked: this.checked}});
  }

  registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: ToggleBoolean): void {
    this.disabled = this.convertToBoolean(disabled);
  }

  emitToNgModel(event: any): void {
    this.onChange(event.target.checked);
  }

  onTouched = () => {
  };

  onChange = (value: boolean | string) => {
  };
}
