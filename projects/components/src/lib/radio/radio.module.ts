import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioComponent} from './radio.component';

export {RadioComponent} from './radio.component';

@NgModule({
  imports: [CommonModule],
  exports: [RadioComponent],
  declarations: [RadioComponent],
})
export class RadioModule {}
