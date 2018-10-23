import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ToggleComponent } from './toggle.component';


storiesOf('Toggle', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ToggleComponent],
    }),
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Checkbox</h3>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="blue" disabled="true" checked="true">Blue</ag-toggle><br>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="green" disabled="true">Green</ag-toggle><br>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="yellow">Yellow</ag-toggle><br>
      </div>
      <div>
        <h3>Radio</h3>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="blue" >Blue</ag-toggle><br>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="green">Green</ag-toggle><br>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="yellow" checked="true">Yellow</ag-toggle><br>
      </div>
    `,
    props: {
      change: action('change'),
    }
  }))
  .add('Theme', () => ({
    template: `
      <div>
        <h3>Material</h3>
        <ag-toggle theme="material">Foo</ag-toggle>
      </div>
      <div>
        <h3>iOS</h3>
        <ag-toggle theme="ios">Foo</ag-toggle>
      </div>
  `
  }))
  .add('Position', () => ({
    template: `
      <div>
        <h3>Before</h3>
        <ag-toggle position="before">Foo</ag-toggle>
      </div>
      <div>
        <h3>After</h3>
        <ag-toggle position="after">Foo</ag-toggle>
      </div>
    `
  }))
  .add('Type', () => ({
    template: `
      <div>
        <h3>Checkbox</h3>
        <ag-toggle name="color" value="blue">Blue</ag-toggle><br>
        <ag-toggle name="color" value="green">Green</ag-toggle><br>
        <ag-toggle name="color" value="yellow">Yellow</ag-toggle><br>
      </div>
      <div>
        <h3>Radio</h3>
        <ag-toggle type="radio" name="color" value="blue">Blue</ag-toggle><br>
        <ag-toggle type="radio" name="color" value="green">Green</ag-toggle><br>
        <ag-toggle type="radio" name="color" value="yellow">Yellow</ag-toggle><br>
      </div>
    `,
  }));
