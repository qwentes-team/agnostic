import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CardComponent} from './card.component';

storiesOf('Card', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CardComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card>testo placeholder</ag-card><br><br>
        <ag-card [title]="'titolo'"
        [subtitle]="'sottotitolo'">testo placeholder</ag-card><br><br>
        <ag-card [imageUrl]="'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'">testo placeholder</ag-card><br><br>
      </div>
    `,
  }))
  .add('Simple Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card>testo placeholder</ag-card>
      </div>
    `,
  }))
  .add('Heading Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card [title]="'titolo'"
        [subtitle]="'sottotitolo'">testo placeholder</ag-card>
      </div>
    `,
  }))
  .add('Image Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card [imageUrl]="'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'">testo placeholder</ag-card>
      </div>
    `,
  }));
