import {moduleMetadata, storiesOf} from '@storybook/angular';
import {SnackbarComponent} from './snackbar.component';

storiesOf('Snackbar', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SnackbarComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <ag-snackbar
        position="top-right"
        [ngClass]="{'ag-snackbar--show': isVisibleSnackbar}"
        *ngIf="isVisibleSnackbar"
        [duration]=""
      (click)="doSomething()"
  (closeSnackbar)="toggleSnackbar()">
  <div usage="ag-snackbar-action" (click)="toggleSnackbar()">Close</div>
  Message</ag-snackbar>
      </div>
    `,
  }));
