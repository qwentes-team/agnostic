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
  @Input() public title: string;
  @Input() public icon: string;
  @Input() public active = false;
  @Input() public template;
  @Input() public dataContext;
  @Input() public isCloseable;

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
}
