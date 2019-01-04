# ag-accordion

DESCRIPTION

## Usage

```html
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
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {AccordionModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [AccordionExample],
  imports: [BrowserModule, AccordionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| isOpen | boolean |  |
| label | string |  |
| disabled | boolean |  |


## Events

| Event  | Return |
|--------|--------|
| open | AccordionEvent |
| close | AccordionEvent |
| change | AccordionEvent |


## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-accordion-gap
--ag-accordion-disabled-opacity
```
