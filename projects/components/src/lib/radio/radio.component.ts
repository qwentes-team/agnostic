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
import {convertToBoolean, EmitToNgModel, noop} from '../components.shared';

export type RadioBoolean = boolean | 'true' | 'false';

@Component({
  selector: 'ag-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor, OnChanges, EmitToNgModel {
  @Input()
  public name: string;
  @Input()
  public value: any;
  @Input()
  public disabled: RadioBoolean;
  @Input()
  public checked: RadioBoolean;
  @Input()
  public required: RadioBoolean;

  onChange = noop.onChange;
  onTouched = noop.onTouched;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges({disabled, name, checked, required}: SimpleChanges) {
    console.log(name);
    if (name) {
      this.name = name.currentValue;
    }
    if (checked) {
      console.log(checked);
      this.checked = convertToBoolean(checked.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
    if (required) {
      this.required = convertToBoolean(required.currentValue);
    }
  }

  writeValue(value: any): void {
    const isChecked = value === this.value;
    this.updateValue({target: {checked: isChecked}});
  }

  registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: RadioBoolean): void {
    this.disabled = convertToBoolean(disabled);
  }

  emitToNgModel(event: any): void {
    this.onChange(event.target.value);
  }

  updateValue(event): void {
    this.checked = !!event.target.checked;
    this.cd.detectChanges();
  }
}
