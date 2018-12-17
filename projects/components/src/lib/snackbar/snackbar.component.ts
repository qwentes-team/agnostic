import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SNACKBAR_CONFIG_TOKEN, SnackbarConfig} from './snackbar-config';
import {SnackbarRef} from './snackbar-ref';

@Component({
  selector: 'ag-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private intervalId: any;
  public isVisibleSnackbar: boolean;

  constructor(
    readonly data: SnackbarConfig,
    readonly ref: SnackbarRef,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig
  ) {}

  ngOnInit() {
    this.isVisibleSnackbar = true;
    this.intervalId = setTimeout(() => this.closeSnackbar(), this.data.duration || this.snackbarConfig.duration);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  closeSnackbar() {
    this.ref.closeSnackbar();
  }
}
