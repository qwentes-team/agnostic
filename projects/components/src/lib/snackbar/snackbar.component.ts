import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SNACKBAR_DATA, SnackbarData} from './snackbar.injection';
import {SnackbarRef} from './snackbar-ref';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'ag-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(@Inject(SNACKBAR_DATA) readonly data: SnackbarData, readonly ref: SnackbarRef) {}

  ngOnInit() {
    this.intervalId = setTimeout(() => this.closeSnackbar(), 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  closeSnackbar() {
    this.ref.closeSnackbar();
  }
}
