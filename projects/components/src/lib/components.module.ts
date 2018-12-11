import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';
import {FabModule} from './fab/fab.module';
import {CardModule} from './card/card.module';
import {CheckboxModule} from './checkbox/checkbox.module';
import {InputModule} from './input/input.module';
import {RadioModule} from './radio/radio.module';

@NgModule({
  imports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    FabModule,
    CardModule,
    CheckboxModule,
    InputModule,
    RadioModule,
  ],
  exports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    FabModule,
    CardModule,
    CheckboxModule,
    InputModule,
    RadioModule,
  ],
})
export class ComponentsModule {}
