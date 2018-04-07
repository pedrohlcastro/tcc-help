import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule],
  exports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule],
})
export class AppMaterialModule { }