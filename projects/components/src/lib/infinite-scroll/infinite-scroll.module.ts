import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollComponent} from './infinite-scroll.component';
import {InfiniteScrollModule as NgxInfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, NgxInfiniteScrollModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}

/*
The Infinite Scroll component trigger an event when the user scrolls a specified distance from the bottom of the page.
 */
