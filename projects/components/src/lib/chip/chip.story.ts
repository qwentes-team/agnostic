import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ChipComponent } from './chip.component';


storiesOf('Chip', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ChipComponent],
    }),
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Color Variations</h3>
        <ag-chip>Content</ag-chip><br><br>
        <ag-chip color="primary" label-color="light">Content</ag-chip><br><br>
        <ag-chip color="success" label-color="light">Content</ag-chip><br><br>
        <ag-chip color="warning">Content</ag-chip><br><br>
        <ag-chip color="danger" label-color="light">Content</ag-chip><br><br>
        <h3>Icon position</h3>
        <ag-chip>
          Content
          <span position="before">•</span>
        </ag-chip><br><br>
        <ag-chip>
          Content
          <span position="after">•</span>
        </ag-chip><br><br>
      </div>
    `,
  }))
  .add('Colors', () => ({
    template: `
      <div>
        <h3>Default</h3>
        <ag-chip>Content</ag-chip><br><br>
        <h3>Primary</h3>
        <ag-chip color="primary" label-color="light">Content</ag-chip><br><br>
        <h3>Success</h3>
        <ag-chip color="success" label-color="light">Content</ag-chip><br><br>
        <h3>Warning</h3>
        <ag-chip color="warning">Content</ag-chip><br><br>
        <h3>Danger</h3>
        <ag-chip color="danger" label-color="light">Content</ag-chip><br><br>
      </div>
    `,
  }))
  .add('Position', () => ({
    template: `
      <div>
        <h3>Before</h3>
        <ag-chip>
          Content
          <span position="before">•</span>
        </ag-chip><br><br>
        <h3>After</h3>
        <ag-chip>
          Content
          <span position="after">•</span>
        </ag-chip><br><br>
      </div>
    `,
  }));
