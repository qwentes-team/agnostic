import {Component, Input} from '@angular/core';

@Component({
  selector: 'ag-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable;
}
