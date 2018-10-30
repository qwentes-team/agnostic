import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';
import {InputModule} from './input/input.module';

@NgModule({
  imports: [ToggleModule, ButtonModule, ChipModule, DialogModule, InputModule],
  exports: [ToggleModule, ButtonModule, ChipModule, DialogModule, InputModule],
})
export class ComponentsModule {}
