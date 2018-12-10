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
export class RadioComponent implements ControlValueAccessor, OnChanges {
  @Input()
  public disabled: RadioBoolean;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnChanges({disabled}: SimpleChanges) {
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
  }

  private convertToBoolean(value: RadioBoolean): boolean {
    return value === 'false' ? false : !!value;
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(value: any): void {
    // todo
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
  setDisabledState(disabled: RadioBoolean): void {
    console.log('ciccio');
    this.disabled = this.convertToBoolean(disabled);
  }

  emitToNgModel(event: any): void {
    // wait angular form changes to be completed
    // todo
    this.onChange(event);
  }

  // Function to call when the changes.
  onChange = (value: boolean | string) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};
}
