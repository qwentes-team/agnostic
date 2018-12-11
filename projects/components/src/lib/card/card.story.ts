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
        <ag-card>
          <h2 position="card-header">Titolo</h2>
          testo placeholder
        </ag-card><br><br>
        <ag-card>
          <img position="card-banner" src="http://via.placeholder.com/640x360">
          testo placeholder
        </ag-card><br><br>
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
        <ag-card>
          <h3 position="card-header">Titolo</h3>
          testo placeholder
        </ag-card>
      </div>
    `,
  }))
  .add('Image Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card>
          <img position="card-banner" src="http://via.placeholder.com/640x360">
          testo placeholder
        </ag-card>
      </div>
    `,
  }))
  .add('Card without shadow', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card box-shadow="false">
          <img position="card-banner" src="http://via.placeholder.com/640x360">
          testo placeholder
        </ag-card>
      </div>
    `,
  }));
