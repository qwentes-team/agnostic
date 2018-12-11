import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';
import {ModalComponent, ModalHeaderComponent, ModalContentComponent} from './modal/modal.component';
import {PopupComponent} from './popup/popup.component';
import {DIALOG_DATA, DIALOG_REF, DialogService} from './dialog.service';
import {Component, Inject} from '@angular/core';
import {Dialog} from './dialog.model';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'ag-dialog-modal',
  template: `
    <ag-modal>
      <ag-modal-header>header
        <button (click)="closeModal()">X</button>
      </ag-modal-header>
      <ag-modal-content>
        <div>content</div>
        <div><input type="text" placeholder="Type something..." (change)="getInputValue($event)"></div>
      </ag-modal-content>
    </ag-modal>
  `,
})
export class DialogModalComponent {
  closeValue: string;

  constructor(@Inject(DIALOG_REF) private dialogRef: Dialog, @Inject(DIALOG_DATA) private dialogData: any) {}

  closeModal() {
    this.dialogRef.close(this.closeValue || 'empty!');
  }

  getInputValue(event) {
    this.closeValue = event.target.value;
  }
}

@Component({
  selector: 'ag-modal-story',
  template: `
    <button (click)="openModal()">open modal</button>
    <div>
      <small>You closed modal with value: {{closedValue}}</small>
    </div>
  `,
})
export class ModalStoryComponent {
  closedValue: any;

  constructor(private dialogService: DialogService) {}

  openModal() {
    const modal = this.dialogService.open(DialogModalComponent, {
      data: {message: 'ciao!'},
    });
    modal.afterClosed().subscribe(value => {
      this.closedValue = value || 'You clicked out!';
    });
  }
}

@Component({
  selector: 'ag-dialog-popup',
  template: `
    <ag-popup>
      <div>
        <span>{{dialogData.message}}</span>
        <button (click)="closePopup()">X</button>
      </div>
      <div><input type="text" placeholder="Type something..." (change)="getInputValue($event)"></div>
    </ag-popup>
  `,
})
export class DialogPopupComponent {
  closeValue: string;

  constructor(@Inject(DIALOG_REF) private dialogRef: Dialog, @Inject(DIALOG_DATA) public dialogData: any) {}

  closePopup() {
    this.dialogRef.close(this.closeValue || 'empty!');
  }

  getInputValue(event) {
    this.closeValue = event.target.value;
  }
}

@Component({
  selector: 'ag-popup-story',
  template: `
    <button (click)="openPopup()">open popup</button>
    <div>
      <small>You closed pupup with value: {{closedValue}}</small>
    </div>
  `,
})
export class PopupStoryComponent {
  closedValue: string;

  constructor(private dialogService: DialogService) {}

  openPopup() {
    const popup = this.dialogService.open(DialogPopupComponent, {
      data: {message: 'ciao!'},
    });
    popup.afterClosed().subscribe(value => {
      this.closedValue = value || 'You clicked out!';
    });
  }
}

storiesOf('Dialog', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalContentComponent,
        PopupComponent,
        ModalStoryComponent,
        PopupStoryComponent,
        DialogModalComponent,
        DialogPopupComponent,
      ],
      providers: [DialogService, Overlay],
      entryComponents: [DialogModalComponent, DialogPopupComponent],
    })
  )
  .addDecorator(withNotes)
  .add('Popup', () => ({
    template: `<ag-popup-story></ag-popup-story>`,
  }))
  .add('Modal', () => ({
    template: `<ag-modal-story></ag-modal-story>`,
  }));
