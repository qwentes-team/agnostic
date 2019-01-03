import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component, ViewChild} from '@angular/core';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN} from './snackbar-config';
import {SnackbarService} from './snackbar.service';
import {Overlay} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SECTION} from './../../../../../.storybook/config';

@Component({
  selector: 'ag-snackbar-story',
  template: `
    <p>Shows default style snackbar from top</p>
    <button (click)="showSnackbar()">Show snackbar</button>
  `,
})
export class SnackbarStoryComponent {
  constructor(private snackbarService: SnackbarService) {}

  showSnackbar() {
    this.snackbarService.showSnackbar({
      text: 'Snackbar Message',
      theme: 'ios',
    });
  }
}

@Component({
  selector: 'ag-material-snackbar-story',
  template: `
    <p>Shows material style snackbar from bottom</p>
    <button (click)="showMaterialSnackbar()">Show material snackbar</button>
  `,
})
export class MaterialSnackbarStoryComponent {
  constructor(private snackbarService: SnackbarService) {}

  showMaterialSnackbar() {
    this.snackbarService.showSnackbar({
      text: 'Snackbar Message',
      theme: 'material',
      position: {bottom: 20, right: 20},
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
            originX: 'start',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: -12,
            offsetY: 12,
          },
        ]),
    });
  }
}

storiesOf(`${SECTION.MODAL}|Snackbar`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        SnackbarComponent,
        SnackbarStoryComponent,
        MaterialSnackbarStoryComponent,
        PositionSnackbarStoryComponent,
      ],
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
  .add('Ios Snackbar', () => ({
    template: `<ag-snackbar-story></ag-snackbar-story>`,
  }))
  .add('Material Snackbar', () => ({
    template: `<ag-material-snackbar-story></ag-material-snackbar-story>`,
  }))
  .add('Relative position Snackbar', () => ({
    template: `<ag-position-snackbar-story></ag-position-snackbar-story>`,
  }));
