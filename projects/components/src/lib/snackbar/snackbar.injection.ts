import {InjectionToken} from '@angular/core';

export const SNACKBAR_DATA = new InjectionToken<SnackbarData>('SNACKBAR_DATA');

export interface SnackbarData {
  text: string;
  type: SnackbarType;
}

export type SnackbarType = 'warning' | 'info' | 'success';
