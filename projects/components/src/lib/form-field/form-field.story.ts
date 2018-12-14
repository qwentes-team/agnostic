import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {SECTION} from './../../../../../.storybook/config';
import {FormFieldComponent} from './form-field.component';
import {InputComponent, InputDirective} from '../input/input.component';
import {SelectComponent} from '../select/select.component';

storiesOf(`${SECTION.FORM}|Form Field`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent, InputDirective, FormFieldComponent, SelectComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <ag-form-field label="Color" metaLabel="required">
          <input agInput placeholder="Write your fav color" required="true">
        </ag-form-field>
        <ag-form-field label="Material" metaLabel="optional">
          <ag-select [options]="[{label: 'Wood', value: 'wood'}, {label: 'Metal', value: 'metal'}]"></ag-select>
        </ag-form-field>
        <ag-form-field label="Message">
          <textarea agInput placeholder="Write your message"></textarea>
        </ag-form-field>
      </div>
    `,
    props: {
      change: action('change'),
      blur: action('blur'),
      focus: action('focus'),
    },
  }));
