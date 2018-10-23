import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { ButtonComponent } from './button.component';


storiesOf('Button', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ButtonComponent],
    }),
  )
  .addDecorator(withNotes)
  .add('Demo', () => ({
    template: `
    <div>
      <ag-button>classic</ag-button>&nbsp;<ag-button fill="clear">Clear</ag-button>&nbsp;<ag-button fill="outline">outline</ag-button>
      <br/><br/><ag-button expand="block" disabled="true">classic block disabled</ag-button>
      <br/><br/><ag-button expand="block"><span position="before">😀</span>Foo</ag-button>
      <br/><br/><ag-button expand="block">Foo<span position="after">😀</span></ag-button>
      <br/><br/><ag-button expand="block" shape="round">shape block</ag-button>
      <br/><br/><ag-button expand="block" fill="clear">clear block</ag-button>
      <br/><br/><ag-button expand="block" fill="outline">outline block</ag-button>
    </div>
  `
  }))
  .add('Expand', () => ({
    template: `
    <div>
      <h3>Default</h3>
      <ag-button>Foo</ag-button>
    </div>
    <div>
      <h3>Block</h3>
      <ag-button expand="block">Foo</ag-button>
    </div>
    <div>
      <h3>Full</h3>
      <ag-button expand="full">Foo</ag-button>
    </div>
  `
  }), {
    notes: `
      [expand=block]
      Full-width button with rounded corners.
      
      [expand=full]
      Full-width button with square corners and no border on the left or right.
    `
  })
  .add('Fill', () => ({
    template: `
    <div>
      <h3>Default</h3>
      <ag-button>Foo</ag-button>
    </div>
    <div>
      <h3>Clear</h3>
      <ag-button fill="clear">Foo</ag-button>
    </div>
    <div>
      <h3>Outline</h3>
      <ag-button fill="outline">Foo</ag-button>
    </div>
  `
  }))
  .add('Shape', () => ({
    template: `
    <div>
      <h3>Default</h3>
      <ag-button>Foo</ag-button>
    </div>
    <div>
      <h3>Round</h3>
      <ag-button shape="round">Foo</ag-button>
    </div>
  `
  }))
  .add('Transclude', () => ({
    template: `
    <div>
      <h3>Default</h3>
      <ag-button>Foo</ag-button>
    </div>
    <div>
      <h3>Before</h3>
      <ag-button><span position="before">😀</span>Foo</ag-button>
    </div>
    <div>
      <h3>After</h3>
      <ag-button>Foo<span position="after">😀</span></ag-button>
    </div>
  `
  }));
