import {InfiniteScrollModule as NgxInfiniteScrollModule} from 'ngx-infinite-scroll';
import {SECTION} from './../../../../../.storybook/config';
import {moduleMetadata} from '@storybook/angular';
import {storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {InfiniteScrollComponent} from './infinite-scroll.component';

storiesOf(`${SECTION.LAYOUT}|Infinite scroll`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [InfiniteScrollComponent],
      imports: [NgxInfiniteScrollModule],
    })
  )
  .add('Demo', () => ({
    template: `
      <div style="height: 2000px; padding: 12px; background: #ccc; display: flex; justify-content: center">
        SCROLL DOWN ↓
      </div>
      <ag-infinite-scroll
        (scrolled)="scrolled($event)">
        INFINITE SCROLL COMPONENT
      </ag-infinite-scroll>
    `,
    props: {
      scrolled: action('scrolled'),
    },
  }))
  .add('With more distance', () => ({
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
  .add('With throttle', () => ({
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
