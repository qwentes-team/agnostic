import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';
import {FabModule} from './fab/fab.module';
import {CheckboxModule} from './checkbox/checkbox.module';
import {InputModule} from './input/input.module';

@NgModule({
  imports: [ToggleModule, ButtonModule, ChipModule, DialogModule, FabModule, CheckboxModule, InputModule],
  exports: [ToggleModule, ButtonModule, ChipModule, DialogModule, FabModule, CheckboxModule, InputModule],
})
export class ComponentsModule {}
