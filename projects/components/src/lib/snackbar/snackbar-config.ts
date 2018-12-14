import {InjectionToken} from '@angular/core';
import {PositionStrategy} from '@angular/cdk/overlay';

export class SnackbarConfig {
  type?: SnackbarType;
  theme?: SnackbarTheme;
  text?: string;
  position?: PositionStrategy | SnackbarPosition;
  direction?: string;
}

export interface SnackbarPosition {
  bottom?: number | string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
}

export const SNACKBAR_DIRECTIONS = {
  FROM_TOP: 'fromTop',
  FROM_BOTTOM: 'fromBottom',
};

export const defaultSnackbarConfig: SnackbarConfig = {
  position: {
    top: '',
    bottom: 60,
    left: 20,
    right: '',
  },
  direction: SNACKBAR_DIRECTIONS.FROM_TOP,
};

export type SnackbarType = 'warning' | 'info' | 'success';
export type SnackbarTheme = 'ios' | 'material';
export const SNACKBAR_CONFIG_TOKEN = new InjectionToken('snackbar-config');
