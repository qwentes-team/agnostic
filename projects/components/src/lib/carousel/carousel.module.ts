import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './carousel.component';
import {CarouselDotsComponent} from './carousel-dots/carousel-dots.component';

@NgModule({
  declarations: [CarouselComponent, CarouselDotsComponent],
  exports: [CarouselComponent],
  imports: [CommonModule],
})
export class CarouselModule {}