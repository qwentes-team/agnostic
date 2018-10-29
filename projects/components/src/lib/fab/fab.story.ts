import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FabComponent} from './fab.component';

storiesOf('Fab', module)
  .addDecorator(
    moduleMetadata({
      declarations: [FabComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3 style="text-align: center">Demo</h3>
        <ag-fab>X</ag-fab>
        <ag-fab position="top-left">
          X
          <span position="after">top / left</span>
        </ag-fab>
        <ag-fab position="top-right">
          X
          <span position="before">top / right</span>
        </ag-fab>
        <ag-fab position="bottom-left">
          X
          <span position="after">bottom / left</span>
        </ag-fab>
        <ag-fab position="bottom-right">
          X
          <span position="before">bottom / right</span>
        </ag-fab>
      </div>
    `,
  }))
  .add('Default', () => ({
    template: `
      <div>
        <h3>Default</h3>
        <ag-fab>X</ag-fab>
      </div>
    `,
  }))
  .add('Transclude', () => ({
    template: `
      <div>
        <h3>Transclude</h3>
        <ag-fab>
          X
          <span position="before">Before Text</span>
          <span position="after">After Text</span>
        </ag-fab>
      </div>
    `,
  }))
  .add('Position', () => ({
    template: `
      <div>
        <h3 style="text-align: center">Position</h3>
        <ag-fab position="top-left">X</ag-fab>
        <ag-fab position="top-right">X</ag-fab>
        <ag-fab position="bottom-left">X</ag-fab>
        <ag-fab position="bottom-right">X</ag-fab>
      </div>
    `,
  }));
