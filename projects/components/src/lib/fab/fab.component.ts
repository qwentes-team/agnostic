import {Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent {
  constructor(@Attribute('position') public position, @Attribute('fixed') public fixed, private cd: ChangeDetectorRef) {
    this.cd.detach();
  }
}
