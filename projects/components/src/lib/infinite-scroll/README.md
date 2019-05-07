# ag-infinite-scroll

The Infinite Scroll component trigger an event when the user scrolls a specified distance from the bottom of the page.

## Usage

```html
<ag-infinite-scroll
  [infiniteScrollDistance]="5"
  [infiniteScrollThrottle]="100"
  [infiniteScrollContainer]="element"
  (scrolled)="loadData()">
  TEXT OR COMPONENT TO TRANSCLUDE
</ag-infinite-scroll>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {InfiniteScrollModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [InfiniteScrollExample],
  imports: [BrowserModule, InfiniteScrollModule],
  providers: [],
  bootstrap: [InfiniteScrollExample],
})
export class AppModule {}

export class InfiniteScrollExample {
  loadData() {
    console.log('call when scrolled is triggered');
  }
}
```

## Properties

| Property  | Description | Type  | Default |
|-----------|-------------|-------|---------|
| `infiniteScrollDistance` | The bottom percentage point of the scroll relatively to the infinite-scroll container. I.E: 2 => (2 * 10 = 20%) is event is triggered when 80% (100% - 20%) has been scrolled. | number | 2 |
| `infiniteScrollThrottle` | Get a number of milliseconds for throttle. The event will be triggered this many milliseconds after the user stops scrolling. | number | 50 |
| `infiniteScrollThrottle` | should get a html element or css selector for a scrollable element; window or current element will be used if this attribute is empty. | string / Element / HTMLElement | null |

## Events

| Event  | Description  | Return |
|--------|--------------|--------|
| `scrolled` | Triggered if the distance threshold has been reached on a scroll down. | void |

## CSS Custom Properties

| Name                        | Description                             |
| --------------------------- | --------------------------------------- |
| `--ag-infinite-scroll-gap`  | Gap of the infinite scroll component    |
