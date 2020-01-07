import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component, Input, ViewChild} from '@angular/core';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN} from './snackbar-config';
import {SnackbarService} from './snackbar.service';
import {Overlay} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SECTION} from './../../../../../.storybook/config';
import {select, text} from '@storybook/addon-knobs';

@Component({
  selector: 'ag-snackbar-story',
  template: `
    <p>Shows default style snackbar from top</p>
    <button (click)="showSnackbar()">Show snackbar</button>
  `,
})
export class SnackbarStoryComponent {
  @Input() theme: any;
  @Input() text: string;
  @Input() positionTop: string;
  @Input() positionBottom: string;
  @Input() positionLeft: string;
  @Input() positionRight: string;

  constructor(private snackbarService: SnackbarService) {}

  showSnackbar() {
    this.snackbarService.showSnackbar({
      text: this.text,
      theme: this.theme,
      position: {
        top: parseInt(this.positionTop, 10) || '',
        bottom: parseInt(this.positionBottom, 10) || '',
        left: parseInt(this.positionLeft, 10) || '',
        right: parseInt(this.positionRight, 10) || '',
      },
    });
  }
}

@Component({
  selector: 'ag-position-snackbar-story',
  template: `
    <p>Shows default style snackbar with element-relative position</p>
    <button #el (click)="showPositionSnackbar()">Show snackbar</button>
  `,
})
export class PositionSnackbarStoryComponent {
  @ViewChild('el') elRef;

  constructor(private snackbarService: SnackbarService, private overlay: Overlay) {}

  showPositionSnackbar() {
    this.snackbarService.showSnackbar({
      text: 'Snackbar Message',
      theme: 'ios',
      position: this.overlay
        .position()
        .flexibleConnectedTo(this.elRef)
        .withPositions([
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 24,
          },
        ]),
    });
  }
}

storiesOf(`${SECTION.MODAL}|Snackbar`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [SnackbarComponent, SnackbarStoryComponent, PositionSnackbarStoryComponent],
      providers: [
        SnackbarService,
        Overlay,
        {
          provide: SNACKBAR_CONFIG_TOKEN,
          useValue: {...defaultSnackbarConfig},
        },
      ],
      entryComponents: [SnackbarComponent],
    })
  )
  .add('Demo', () => ({
    template: `<ag-snackbar-story
[theme]="theme"
[text]="text"
[positionTop]="positionTop"
[positionBottom]="positionBottom"
[positionLeft]="positionLeft"
[positionRight]="positionRight"></ag-snackbar-story>`,
    props: {
      text: text('text', 'Snackbar Message'),
      theme: select('theme', {ios: 'ios', material: 'material'}, 'ios'),
      positionTop: text('positionTop', '20'),
      positionBottom: text('positionBottom', ''),
      positionLeft: text('positionLeft', ''),
      positionRight: text('positionRight', '20'),
    },
  }))
  .add('Relative position Snackbar', () => ({
    template: `<ag-position-snackbar-story style="display: flex; flex-flow: column; justify-content: center; align-items: center;"></ag-position-snackbar-story>`,
  }));
