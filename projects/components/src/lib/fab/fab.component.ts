import {Attribute, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent implements OnInit {
  constructor(@Attribute('position') public position, @Attribute('fixed') public fixed) {}

  ngOnInit() {}
}
