# ag-infinite-scroll

The Infinite Scroll component trigger an event when the user scrolls a specified distance from the bottom of the page.

## Usage

```html
      <ag-infinite-scroll-story (scrolled)="scrolled($event)"></ag-infinite-scroll-story>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {InfiniteScrollModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [InfiniteScrollExample],
  imports: [BrowserModule, InfiniteScrollModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| infiniteScrollDistance | number |  |
| infiniteScrollThrottle | number |  |


## Events

| Event  | Return |
|--------|--------|
| scrolled | void |


## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-infinite-scroll-gap
```
