import {moduleMetadata, storiesOf} from '@storybook/angular';
import {boolean, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';
import {ButtonComponent} from './../button/button.component';
import {AccordionComponent} from './accordion.component';
import {SECTION} from './../../../../../.storybook/config';

storiesOf(`${SECTION.LAYOUT}|Accordion`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [AccordionComponent, ButtonComponent],
    })
  )
  .addDecorator(withNotes)
  .add('Demo', () => ({
    template: `
    <div>
      <ag-accordion
        [label]="label"
        [isOpen]="isOpen"
        [disabled]="disabled"
        (open)="onOpen($event)"
        (close)="onClose($event)"
        (change)="onChange($event)">
        My Super Accordion content
      </ag-accordion>
    </div>
  `,
    props: {
      label: text('label', 'Open/Close accordion!'),
      disabled: boolean('disabled', false),
      isOpen: boolean('isOpen', false),
      onChange: action('onChange'),
      onClose: action('onClose'),
      onOpen: action('onOpen'),
    },
  }))
  .add(
    'Use Component as trigger',
    () => ({
      template: `
    <div>
      <ag-accordion
        [isOpen]="isOpen"
        [disabled]="disabled"
        (open)="onOpen($event)"
        (close)="onClose($event)"
        (change)="onChange($event)">
        <ag-button class="ag-accordion--trigger">{{label}}</ag-button>
        My Super Accordion content
      </ag-accordion>
    </div>
  `,
      props: {
        label: text('label', 'Open/Close accordion!'),
        disabled: boolean('disabled', false),
        isOpen: boolean('isOpen', false),
        onChange: action('onChange'),
        onClose: action('onClose'),
        onOpen: action('onOpen'),
      },
    }),
    {
      notes: `
      Remove [label] tag to ag-accordion and add .ag-accordion--trigger class to your component for use your custom compnent as trigger element
    `,
    }
  );
