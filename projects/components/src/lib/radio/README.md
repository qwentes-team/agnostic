# ag-radio

Radio button component that wrap the native input radio. Radios are generally used as a set of related options inside of a group, but they can also be used alone. Pressing on a radio will check it.

## Usage

```html
<ag-radio>I'm a Radio</ag-radio>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RadioModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [],
  imports: [BrowserModule, RadioModule],
  providers: [],
})
export class AppModule {}
```

## Properties

| Property    | Description                             | Type    | Default |
|------------ |---------------------------------------- | ------- | ------- |
| `name`      | Name of the radio (useful in forms).    | string  |         |
| `value`     | Value of the radio                      | string  |         |
| `disabled`  | disable the radio                       | boolean | false   |
| `checked`   | check the radio                         | boolean | false   |
| `required`  | require the radio (works on forms)      | boolean | true    |
| `position`  | position of the label (content)         | any     |         |

## CSS Custom Properties

| Name                            | Description                       |
| ------------------------------- | --------------------------------- |
| `--ag-radio-outer-size`         | Size of the external element      |
| `--ag-radio-inner-size`         | Size of the internal element      |
| `--ag-radio-gap`                | Gap                               |
| `--ag-radio-unchecked-color`    | Color in unchecked status         |
| `--ag-radio-checked-color`      | Color in checked status           |
| `--ag-radio-outer-border-size`  | Border of the external element    |
| `--ag-radio-disabled-opacity`   | Disable opacity                   |
