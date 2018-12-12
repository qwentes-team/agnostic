import {NgModule} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {SnackbarComponent} from './snackbar.component';

export {SnackbarData, SNACKBAR_DATA, SnackbarType} from './snackbar.injection';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
  entryComponents: [SnackbarComponent],
})
export class SnackbarModule {}
