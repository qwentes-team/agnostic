import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent, InputDirective} from './input.component';

export {InputComponent, InputDirective} from './input.component';

@NgModule({
  imports: [CommonModule],
  exports: [InputComponent, InputDirective],
  declarations: [InputComponent, InputDirective],
})
export class InputModule {}
