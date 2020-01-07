import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollComponent} from './infinite-scroll.component';
import {InfiniteScrollModule as NgxInfiniteScrollModule} from 'ngx-infinite-scroll';

export {InfiniteScrollComponent} from './infinite-scroll.component';

@NgModule({
  declarations: [InfiniteScrollComponent],
  imports: [CommonModule, NgxInfiniteScrollModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}
