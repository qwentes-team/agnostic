import {
  Attribute,
  ChangeDetectionStrategy,
  Component, HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

export type ButtonExpand = 'block' | 'full';
export type ButtonFill = 'clear' | 'outline';
export type ButtonShape = 'round';

@Component({
  selector: 'ag-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public disabled: boolean = false;

  @HostBinding('attr.disabled') get disabledValue() {
    return this.disabled ? true : null;
  }

  constructor(
    @Attribute('expand') public expand: ButtonExpand,
    @Attribute('fill') public fill: ButtonFill,
    @Attribute('shape') public shape: ButtonShape,
  ) {
  }
}