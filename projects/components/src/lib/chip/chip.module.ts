import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipComponent} from './chip.component';

export {ChipComponent} from './chip.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChipComponent],
  exports: [ChipComponent],
})
export class ChipModule {}
