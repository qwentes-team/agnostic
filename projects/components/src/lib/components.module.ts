import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';

@NgModule({
  imports: [ToggleModule, ButtonModule, ChipModule, DialogModule],
  exports: [ToggleModule, ButtonModule, ChipModule, DialogModule],
})
export class ComponentsModule {}
