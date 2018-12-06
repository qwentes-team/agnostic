import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CheckboxComponent} from './checkbox.component';

storiesOf('Checkbox', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CheckboxComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Checkbox Variations</h3>
        <ag-checkbox></ag-checkbox><br><br><br>
        <ag-checkbox>default</ag-checkbox><br><br><br>
        <ag-checkbox checked="true">checked</ag-checkbox><br><br><br>
        <ag-checkbox disabled="true" position="before">disabled</ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('Default', () => ({
    template: `
      <div>
        <ag-checkbox></ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('With label', () => ({
    template: `
      <div>
        <ag-checkbox>label after</ag-checkbox><br><br>
        <ag-checkbox position="before">label before</ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('Disabled', () => ({
    template: `
      <div>
        <ag-checkbox disabled="true" position="before">disabled</ag-checkbox><br><br>
      </div>
    `,
  }));
