import {ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public disabled = false;
  @Input() public expand: 'full' | 'block';
  @Input() public fill: 'clear' | 'outline';
  @Input() public shape: 'round';

  @HostBinding('attr.disabled') get disabledValue() {
    return this.disabled ? true : null;
  }
}
