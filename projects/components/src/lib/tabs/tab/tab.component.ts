import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable;
}
