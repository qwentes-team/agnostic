# ag-fab

FAB (Floating Action Button) highlights the most relevant or frequently used actions. They should be placed in a fixed position that does not scroll with the content. FAB should be related to one main function.

## Usage

```html
<ag-fab fixed="false" position="top-left">
  X
  <span position="after">Label</span>
</ag-fab>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FabModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [],
  imports: [BrowserModule, FabModule],
  providers: [],
})
export class AppModule {}
```

## Properties

| Property  | Description | Type  | Default |
|-----------|-------------|-------|---------|
| `position` (on tag `ag-fab`) | Position of the fab. Options are: top-left, top-right, bottom-left, bottom-right. | string | center |
| `position` (on transcluded tag) | Position of the content related to the FAB. Options are: before, after. | string | |
| `fixed` | Block the FAB in position fixed. If false, FAB will be in position absolute. | boolean | true |

## CSS Custom Properties

| Name                                | Description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| `--ag-fab-min-size`                 | Minimum size (width and height)                   |
| `--ag-fab-border-radius`            | Border radius                                     |
| `--ag-fab-position-top`             | Position top (with no `position` property set)    |
| `--ag-fab-position-left`            | Position left (with no `position` property set )  |
| `--ag-fab-z-index`                  | Z-index                                           |
| `--ag-fab-gap`                      | Gap                                               |
| `--ag-fab-background-color`         | Default background color                          |
| `--ag-fab-background-color-hover`   | Background color on hover                         |
| `--ag-fab-background-color-active`  | Background color on active                        |
| `--ag-fab-box-shadow`               | Default box shadow                                |
| `--ag-fab-box-shadow-hover`         | Box shadow on hover                               |
| `--ag-fab-box-shadow-active`        | Box shadow on active                              |
