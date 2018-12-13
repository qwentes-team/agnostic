import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {InputComponent} from './input.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.FORM}|Input`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <ag-input disabled="true" value="I'm disabled!">Color</ag-input>
        <ag-input placeholder="Write your fav color!">Color</ag-input>
        <ag-input (change)="change($event)" (blur)="blur($event)" (focus)="focus($event)" placeholder="Write your fav material!" value="Wood">Material</ag-input>
        <ag-input (change)="change($event)" (blur)="blur($event)" (focus)="focus($event)" metaLabel="Meta label!">Weight</ag-input><br>
      </div>
    `,
    props: {
      change: action('change'),
      blur: action('blur'),
      focus: action('focus'),
    },
  }))
  .add('Meta Label', () => ({
    template: `
      <div>
        <ag-input value="blue" required="true" metaLabel="I'm a meta label">Super Color</ag-input><br>
      </div>
    `,
  }));
