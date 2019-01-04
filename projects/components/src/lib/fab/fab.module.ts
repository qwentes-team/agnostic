import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FabComponent} from './fab.component';

@NgModule({
  imports: [CommonModule],
  exports: [FabComponent],
  declarations: [FabComponent],
})
export class FabModule {}

/*
FAB (Floating Action Button) highlights the most relevant or frequently used actions.

They should be placed in a fixed position that does not scroll with the content. FAB should be related to one main function.
 */
