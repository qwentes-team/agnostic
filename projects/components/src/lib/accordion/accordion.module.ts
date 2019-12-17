import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';

export {AccordionComponent} from './accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
})
export class AccordionModule {}
