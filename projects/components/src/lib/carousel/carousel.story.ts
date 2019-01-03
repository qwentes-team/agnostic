import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CarouselComponent} from './carousel.component';
import {CarouselDotsComponent} from './carousel-dots/carousel-dots.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.LAYOUT}|Carousel`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [CarouselComponent, CarouselDotsComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <style>ag-carousel {max-width: 50%; margin: auto}</style>
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
    `,
    props: {
      init: action('onCarouselInit'),
      change: action('onCarouselChange'),
    },
  }));
