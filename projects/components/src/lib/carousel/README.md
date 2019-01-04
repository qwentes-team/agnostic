# ag-carousel

DESCRIPTION

## Usage

```html
      <style>ag-carousel {max-width: 50%; margin: auto} ag-carousel img {display: block; width: 100%}</style>
      <div>
        <h3>Carousel</h3>
        <ag-carousel
          [config]="{dots: true}"
          (init)="onCarouselInit($event)"
          (change)="onCarouselChange($event)">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--yellow.svg">
          <img src="https://pawelgrzybek.github.io/siema/assets/siema--pink.svg">
        </ag-carousel>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {CarouselModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [CarouselExample],
  imports: [BrowserModule, CarouselModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| config | AgCarouselConfig | {} |


## Events

| Event  | Return |
|--------|--------|
| init | AgCarousel |
| change | AgCarousel |


## CSS Custom Properties

No CSS custom properties
