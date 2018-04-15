import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
  MatCardModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule],
  exports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule],
})
export class AppMaterialModule { }