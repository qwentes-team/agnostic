import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalComponent, ModalContentComponent, ModalHeaderComponent } from './modal/modal.component';

@NgModule({
  imports: [OverlayModule],
  declarations: [ModalComponent, ModalHeaderComponent, ModalContentComponent],
  exports: [ModalComponent, ModalHeaderComponent, ModalContentComponent],
  entryComponents: [ModalComponent],
})
export class DialogModule {
}
