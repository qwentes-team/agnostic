import {moduleMetadata, storiesOf} from '@storybook/angular';
import {RadioComponent} from './radio.component';

storiesOf('Radio', module)
  .addDecorator(
    moduleMetadata({
      declarations: [RadioComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Radio Variations</h3>
        <div style="display: flex; flex-flow: column">
          <ag-radio>Default</ag-radio><br>
          <ag-radio checked="true">Checked</ag-radio><br>
          <ag-radio disabled="true">Disabled</ag-radio><br>
          <ag-radio position="after">Position after</ag-radio><br>
        </div>
      </div>
    `,
  }))
  .add('Position', () => ({
    template: `
      <div>
        <h3>Before</h3>
        <ag-radio position="before">label before</ag-radio>
      </div>
      <div>
        <h3>After</h3>
        <ag-radio position="after">label after</ag-radio>
      </div>
    `,
  }));
