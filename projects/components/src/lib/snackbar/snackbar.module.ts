import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackbarComponent} from './snackbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
