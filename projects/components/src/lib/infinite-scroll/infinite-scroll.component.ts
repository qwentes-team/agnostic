import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ag-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements OnInit {
  @Input() public infiniteScrollDistance: number;
  @Input() public infiniteScrollThrottle: number;
  @Input() public infiniteScrollContainer: string | Element | HTMLElement;
  @Output() public scrolled: EventEmitter<void> = new EventEmitter();

  public DEFAULT_SETTING = {DISTANCE: 2, THROTTLE: 50};

  ngOnInit() {
    this.infiniteScrollDistance = this.infiniteScrollDistance || this.DEFAULT_SETTING.DISTANCE;
    this.infiniteScrollThrottle = this.infiniteScrollThrottle || this.DEFAULT_SETTING.THROTTLE;
  }
}
