import {InjectionToken} from '@angular/core';
import {PositionStrategy} from '@angular/cdk/overlay';

export class SnackbarConfig {
  type?: SnackbarType;
  theme?: SnackbarTheme;
  text?: string;
  position?: PositionStrategy | SnackbarPosition;
  direction?: string;
  duration?: number;
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
    top: 20,
    bottom: '',
    left: '',
    right: 20,
  },
  direction: SNACKBAR_DIRECTIONS.FROM_TOP,
  duration: 5000,
};

export type SnackbarType = 'warning' | 'info' | 'success';
export type SnackbarTheme = 'ios' | 'material';
export const SNACKBAR_CONFIG_TOKEN = new InjectionToken('snackbar-config');
