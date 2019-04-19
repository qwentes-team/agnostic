import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {ModalComponent, ModalContentComponent, ModalHeaderComponent} from './modal/modal.component';
import {PopupComponent} from './popup/popup.component';

export * from './modal/modal.component';

@NgModule({
  imports: [OverlayModule],
  declarations: [ModalComponent, ModalHeaderComponent, ModalContentComponent, PopupComponent],
  exports: [ModalComponent, ModalHeaderComponent, ModalContentComponent, PopupComponent],
})
export class DialogModule {}
