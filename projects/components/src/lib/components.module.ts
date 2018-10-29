import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';
import {CheckboxModule} from './checkbox/checkbox.module';

@NgModule({
  imports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    CheckboxModule,
  ],
  exports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    CheckboxModule,
  ],
})
export class ComponentsModule {}
