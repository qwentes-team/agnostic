import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CheckboxComponent} from './checkbox.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.FORM}|Checkbox`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [CheckboxComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Checkbox Variations</h3>
        <ag-checkbox>default</ag-checkbox><br><br>
        <ag-checkbox checked="true">checked</ag-checkbox><br><br>
        <ag-checkbox disabled="true" position="after">disabled</ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('Position', () => ({
    template: `
      <div>
        <h3>Before</h3>
        <ag-checkbox position="before">label before</ag-checkbox><br><br>
      </div>
      <div>
        <h3>After</h3>
        <ag-checkbox position="after">label after</ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('Disabled', () => ({
    template: `
      <div>
        <h3>Checkbox disabled</h3>
        <ag-checkbox disabled="true">disabled</ag-checkbox><br><br>
      </div>
    `,
  }));
