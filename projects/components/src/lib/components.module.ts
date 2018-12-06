import {NgModule} from '@angular/core';
import {ToggleModule} from './toggle/toggle.module';
import {ButtonModule} from './button/button.module';
import {ChipModule} from './chip/chip.module';
import {DialogModule} from './dialog/dialog.module';
import {FabModule} from './fab/fab.module';
import {CardModule} from './card/card.module';

@NgModule({
  imports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    FabModule,
    CardModule,
  ],
  exports: [
    ToggleModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    FabModule,
    CardModule,
  ],
})
export class ComponentsModule {}
