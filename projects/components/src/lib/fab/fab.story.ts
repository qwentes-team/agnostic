import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FabComponent} from './fab.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.INDICATORS}|Fab`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [FabComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <h3 style="text-align: center">Demo</h3>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div style="position: relative; height: 300px; width: 300px; border: 1px solid #ccc;">
          <ag-fab fixed="false">X</ag-fab>
          <ag-fab fixed="false" position="top-left">X</ag-fab>
          <ag-fab fixed="false" position="top-right">X</ag-fab>
          <ag-fab fixed="false" position="bottom-left">X</ag-fab>
          <ag-fab fixed="false" position="bottom-right">X</ag-fab>
        </div>
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
        <h3 style="text-align: center">Default</h3>
        <ag-fab>X</ag-fab>
      </div>
    `,
  }))
  .add('Transclude', () => ({
    template: `
      <div>
        <h3 style="text-align: center">Transclude</h3>
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
  }))
  .add('No fixed', () => ({
    template: `
      <div>
        <h3 style="text-align: center">No fixed</h3>
        <div style="position: relative; height: 200px; border: 1px solid #ccc">
          <ag-fab fixed="false">Test</ag-fab>
          <ag-fab fixed="false" position="top-left">X</ag-fab>
          <ag-fab fixed="false" position="top-right">X</ag-fab>
          <ag-fab fixed="false" position="bottom-left">X</ag-fab>
          <ag-fab fixed="false" position="bottom-right">X</ag-fab>
        </div>
      </div>
    `,
  }));
