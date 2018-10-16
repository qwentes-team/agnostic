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
  ViewEncapsulation
} from '@angular/core';

export type ToggleTheme = 'material' | 'ios';
export type ToggleType = 'checkbox' | 'radio';
export type TogglePosition = 'before' | 'after';
export type ToggleBoolean = boolean | 'true' | 'false';

export interface ToggleChange {
  name: string;
  value: any;
  checked: boolean;
}

@Component({
  selector: 'ag-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements OnInit, OnChanges {
  @Input() public name: string;
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

  public ngOnInit(): void {
    this.checked = this.convertToBoolean(this.checked);
    this.disabled = this.convertToBoolean(this.disabled);
    this.required = this.convertToBoolean(this.required);
  }

  public ngOnChanges({checked, disabled, required}: SimpleChanges) {
    if (checked) {
      this.checked = this.convertToBoolean(checked.currentValue);
      this.emitValue(this.checked);
    }
    if (disabled) {
      this.disabled = this.convertToBoolean(disabled.currentValue);
    }
    if (required) {
      this.required = this.convertToBoolean(required.currentValue);
    }
  }

  public emitValue(checked: boolean): void {
    this.change.emit({
      name: this.name,
      value: this.value,
      checked,
    });
  }

  private convertToBoolean(value: ToggleBoolean): boolean {
    return value === 'false' ? false : !!value;
  }
}
