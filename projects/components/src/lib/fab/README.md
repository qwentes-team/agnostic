# ag-fab

FAB (Floating Action Button) highlights the most relevant or frequently used actions.

They should be placed in a fixed position that does not scroll with the content. FAB should be related to one main function.

## Usage

```html
      <h3 style="text-align: center">Demo</h3>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <div style="position: relative; height: 300px; width: 300px; border: 1px solid #ccc;">
          <ag-fab fixed="false">X</ag-fab>
          <ag-fab fixed="false" position="top-left">X</ag-fab>
          <ag-fab fixed="false" position="top-right">X</ag-fab>
          <ag-fab fixed="false" position="bottom-left">X</ag-fab>
          <ag-fab fixed="false" position="bottom-right">X</ag-fab>
        </div>
        <ag-fab position="top-left">
          X
          <span position="after">top / left</span>
        </ag-fab>
        <ag-fab position="top-right">
          X
          <span position="before">top / right</span>
        </ag-fab>
        <ag-fab position="bottom-left">
          X
          <span position="after">bottom / left</span>
        </ag-fab>
        <ag-fab position="bottom-right">
          X
          <span position="before">bottom / right</span>
        </ag-fab>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {FabModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [FabExample],
  imports: [BrowserModule, FabModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| position | string |  |
| fixed | string |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-fab-min-size
--ag-fab-border-radius
--ag-fab-position-top
--ag-fab-position-left
--ag-fab-z-index
--ag-fab-gap
--ag-fab-background-color
--ag-fab-background-color-hover
--ag-fab-background-color-active
--ag-fab-box-shadow
--ag-fab-box-shadow-hover
--ag-fab-box-shadow-active
```
