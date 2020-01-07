import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './tab/tab.component';

export {TabsComponent} from './tabs.component';
export {TabComponent} from './tab/tab.component';

@NgModule({
  declarations: [TabsComponent, TabComponent],
  imports: [CommonModule],
  exports: [TabsComponent, TabComponent],
  entryComponents: [TabComponent],
})
export class TabsModule {}
