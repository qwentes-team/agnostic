import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RadioComponent} from './radio.component';

@NgModule({
  imports: [CommonModule],
  exports: [RadioComponent],
  declarations: [RadioComponent],
})
export class RadioModule {}

/*
Radio button component that wrap the native input radio.

Radios are generally used as a set of related options inside of a group, but they can also be used alone.

Pressing on a radio will check it.
 */
