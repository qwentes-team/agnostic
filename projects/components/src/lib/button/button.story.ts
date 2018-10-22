import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from './button.component';


storiesOf('Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent],
    }),
  )
  .add('Default', () => ({template: `<ag-button>Foo</ag-button>`}));
