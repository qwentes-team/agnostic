import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {InputComponent, InputDirective} from './input.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.FORM}|Input`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [InputComponent, InputDirective],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <input agInput disabled="true" value="I'm disabled!" placeholder="Color"><br>
        <input agInput placeholder="Write your fav color!"><br>
        <input agInput (change)="change($event)" (blur)="blur($event)" (focus)="focus($event)" placeholder="Write your fav material!" value="Wood"><br>
      </div>
    `,
    props: {
      change: action('change'),
      blur: action('blur'),
      focus: action('focus'),
    },
  }));
