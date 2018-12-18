import {InfiniteScrollModule as NgxInfiniteScrollModule} from 'ngx-infinite-scroll';
import {SECTION} from './../../../../../.storybook/config';
import {moduleMetadata} from '@storybook/angular';
import {storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {InfiniteScrollComponent} from './infinite-scroll.component';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ag-infinite-scroll-story',
  template: `
    <div
      style="padding: 12px; background: #ccc; display: flex; justify-content: center; align-items: center; flex-flow: column"
    >
      SCROLL DOWN ↓
      <ul style="list-style-type: none">
        <li *ngFor="let item of items">{{ item }}</li>
      </ul>
    </div>
    <ag-infinite-scroll [infiniteScrollDistance]="4" (scrolled)="loadMore()">
      INFINITE SCROLL COMPONENT
    </ag-infinite-scroll>
  `,
})
export class InfiniteScrollStoryComponent implements OnInit {
  items = [];
  shown = 0;
  itemsToAdd = 100;
  @Output() scrolled: EventEmitter<void> = new EventEmitter();
  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    for (let i = this.shown; i < this.shown + this.itemsToAdd; i++) {
      this.items.push(i);
    }
    this.shown += 100;
    this.scrolled.emit();
  }
}

storiesOf(`${SECTION.LAYOUT}|Infinite scroll`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [InfiniteScrollComponent, InfiniteScrollStoryComponent],
      imports: [NgxInfiniteScrollModule],
    })
  )
  .add('Demo', () => ({
    template: `
      <ag-infinite-scroll-story (scrolled)="scrolled($event)"></ag-infinite-scroll-story>
    `,
    props: {
      scrolled: action('scrolled'),
    },
  }))
  .add('More distance', () => ({
    template: `
      <div style="height: 2000px; padding: 12px; background: #ccc; display: flex; justify-content: center; text-align: center">
        SCROLL DOWN ↓<br><br>
        (Trigger the event with more distance from the bottom of the page)
      </div>
      <ag-infinite-scroll
        [infiniteScrollDistance]="8"
        (scrolled)="scrolled($event)">
        INFINITE SCROLL COMPONENT
      </ag-infinite-scroll>
    `,
    props: {
      scrolled: action('scrolled'),
    },
  }))
  .add('Throttle', () => ({
    template: `
      <div style="height: 2000px; padding: 12px; background: #ccc; display: flex; justify-content: center; text-align: center">
        SCROLL DOWN ↓<br><br>
        (Wait one second throttling before trigger the event)
      </div>
      <ag-infinite-scroll
        [infiniteScrollThrottle]="1000"
        (scrolled)="scrolled($event)">
        INFINITE SCROLL COMPONENT
      </ag-infinite-scroll>
    `,
    props: {
      scrolled: action('scrolled'),
    },
  }));
