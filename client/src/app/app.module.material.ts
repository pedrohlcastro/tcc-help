import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule],
  exports: [MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule],
})
export class AppMaterialModule { }