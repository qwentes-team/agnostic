import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent {
  @Input() infiniteScrollDistance: number;
  @Input() infiniteScrollThrottle: number;
  @Output() scrolled: EventEmitter<void> = new EventEmitter();

  public DEFAULT_SETTING = {DISTANCE: 2, THROTTLE: 50};
}
