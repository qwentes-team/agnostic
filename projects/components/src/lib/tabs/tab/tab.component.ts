import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ag-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements AfterContentChecked {
  @Input() title: string;
  @Input() icon: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable;

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
}
