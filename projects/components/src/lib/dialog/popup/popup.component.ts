import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./../dialog.scss', './popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {}
