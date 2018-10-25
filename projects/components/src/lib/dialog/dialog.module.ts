import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalComponent, ModalContentComponent, ModalHeaderComponent } from './modal/modal.component';

export { DialogConfig, DIALOG_DATA, DIALOG_REF } from './dialog.service';

@NgModule({
  imports: [OverlayModule],
  declarations: [ModalComponent, ModalHeaderComponent, ModalContentComponent],
  exports: [ModalComponent, ModalHeaderComponent, ModalContentComponent],
  entryComponents: [ModalComponent],
})
export class DialogModule {
}
