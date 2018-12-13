import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {SelectComponent} from './select.component';
import {SECTION} from './../../../../../.storybook/config';
import {boolean, array, select} from '@storybook/addon-knobs';
import {OPTIONS} from './select.mock';

storiesOf(`${SECTION.FORM}|Select`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [SelectComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Native</h3>
        <ag-select method="native" [options]="options" [disabled]="disabled"></ag-select><br>
        <h3>Hybrid</h3>
        <ag-select method="hybrid" [options]="options" [disabled]="disabled"></ag-select><br>
        <h3>Autocomplete</h3>
        <ag-select method="autocomplete" [options]="options" [disabled]="disabled"></ag-select><br>
      </div>
    `,
    props: {
      disabled: boolean('disabled', false),
      options: array('options', OPTIONS),
    },
  }));
