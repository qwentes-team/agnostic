import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CardComponent} from './card.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.LAYOUT}|Card`, module)
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
          <img position="card-banner" src="https://tinyurl.com/y9hzzrmc">
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
          <h2 position="card-header">Titolo</h2>
          testo placeholder
        </ag-card>
      </div>
    `,
  }))
  .add('Banner Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card>
          <img position="card-banner" src="https://tinyurl.com/y9hzzrmc">
          testo placeholder
        </ag-card>
      </div>
    `,
  }))
  .add('Footer Card', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card>
          <h2 position="card-header">Header placeholder</h2>
          <img position="card-banner" src="https://tinyurl.com/y9hzzrmc">
          <div position="card-footer"><p>footer placeholder</p></div>
          content placeholder
        </ag-card>
      </div>
    `,
  }))
  .add('Card without shadow', () => ({
    template: `
      <div>
        <h3>Card</h3>
        <ag-card box-shadow="false">
          <img position="card-banner" src="https://tinyurl.com/y9hzzrmc">
          testo placeholder
        </ag-card>
      </div>
    `,
  }));
