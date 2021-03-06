import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select.component';

export {SelectComponent} from './select.component';

export {AgOption} from './select.component';

@NgModule({
  declarations: [SelectComponent],
  exports: [SelectComponent],
  imports: [CommonModule],
})
export class SelectModule {}
