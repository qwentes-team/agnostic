import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import { CheckboxComponent } from './checkbox.component';

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
        <ag-checkbox></ag-checkbox><br><br>
        <ag-checkbox><span position="after">default</span></ag-checkbox><br><br>
        <ag-checkbox checked="true"><span position="before">checked</span></ag-checkbox><br><br>
        <ag-checkbox disabled="true"><span position="before">disabled</span></ag-checkbox><br><br>
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
        <ag-checkbox><span position="after">label after</span></ag-checkbox><br><br>
        <ag-checkbox><span position="before">label before</span></ag-checkbox><br><br>
      </div>
    `,
  }))
  .add('Disabled', () => ({
    template: `
      <div>
        <ag-checkbox disabled="true"><span position="after">disabled</span></ag-checkbox><br><br>
      </div>
    `,
  }));
