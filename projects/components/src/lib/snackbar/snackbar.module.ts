import {NgModule, ModuleWithProviders} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {SnackbarComponent} from './snackbar.component';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN} from './snackbar-config';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
  entryComponents: [SnackbarComponent],
})
export class SnackbarModule {
  public static forRoot(config = defaultSnackbarConfig): ModuleWithProviders {
    return {
      ngModule: SnackbarModule,
      providers: [
        {
          provide: SNACKBAR_CONFIG_TOKEN,
          useValue: {...defaultSnackbarConfig, ...config},
        },
      ],
    };
  }
}