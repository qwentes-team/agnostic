import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {SelectComponent} from './select.component';
import {SECTION} from './../../../../../.storybook/config';
import {boolean, array, select} from '@storybook/addon-knobs';
import {OPTIONS} from './select.mock';
import {FormsModule} from '@angular/forms';

storiesOf(`${SECTION.FORM}|Select`, module)
  .addDecorator(
    moduleMetadata({
      imports: [FormsModule],
      declarations: [SelectComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Native</h3>
        <ag-select method="native" [(ngModel)]="nativeValue" [options]="options" [disabled]="disabled"></ag-select><br>
        <div>Native Value: {{nativeValue}}</div><br>
        <h3>Hybrid</h3>
        <ag-select method="hybrid" [(ngModel)]="hybridValue" [options]="options" [disabled]="disabled"></ag-select><br>
        <div>Hybrid Value: {{hybridValue}}</div><br>
        <h3>Autocomplete</h3>
        <ag-select method="autocomplete" [(ngModel)]="autocompleteValue" [options]="options" [disabled]="disabled"></ag-select><br>
        <div>Autocomplete Value: {{autocompleteValue}}</div><br>
      </div>
    `,
    props: {
      disabled: boolean('disabled', false),
      options: array('options', OPTIONS),
    },
  }));
