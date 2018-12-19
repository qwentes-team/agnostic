import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN, SnackbarConfig} from './snackbar-config';
import {SnackbarRef} from './snackbar-ref';
import {SnackbarService} from './snackbar.service';
import {Overlay} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SECTION} from './../../../../../.storybook/config';

@Component({
  selector: 'ag-test-snackbar',
  template: `
    <ag-snackbar>
      <div class="ag-snackbar__ref"
           [attr.position]="data.position"
           [attr.theme]="data.theme"
           [ngClass]="{'ag-snackbar--show': isVisibleSnackbar, 'ag-snackbar--hide': isVisibleSnackbar === false}">
        {{ data.text }}
        <div class="ag-snackbar__action" (click)="closeSnackbar()">close</div>
      </div>
    </ag-snackbar>
  `,
})
export class SnackbarTestComponent implements OnInit, OnDestroy {
  private isVisibleSnackbar: boolean;
  private intervalId: any;

  constructor(
    readonly data: SnackbarConfig,
    readonly ref: SnackbarRef,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig
  ) {}

  ngOnInit() {
    this.isVisibleSnackbar = true;
    this.intervalId = setTimeout(() => this.closeSnackbar(), 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  closeSnackbar() {
    this.ref.closeSnackbar();
  }
}
@Component({
  selector: 'ag-snackbar-story',
  template: `
    <button (click)="showSnackbar()">Show snackbar</button>
  `,
})
export class SnackbarStoryComponent {
  private count = 1;

  constructor(private snackbarService: SnackbarService) {}

  showSnackbar() {
    this.snackbarService.showSnackbar({
      text: `Snackbar message ${this.count}`,
    });
    this.count += 1;
  }
}

storiesOf(`${SECTION.MODAL}|Snackbar`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [SnackbarComponent, SnackbarTestComponent, SnackbarStoryComponent],
      providers: [
        SnackbarService,
        Overlay,
        {
          provide: SNACKBAR_CONFIG_TOKEN,
          useValue: {...defaultSnackbarConfig},
        },
      ],
      entryComponents: [SnackbarTestComponent, SnackbarComponent],
    })
  )
  .add('Snackbar', () => ({
    template: `<ag-snackbar-story></ag-snackbar-story>`,
  }));
