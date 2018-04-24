import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
  MatCardModule, MatInputModule, MatRadioModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule],
  exports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule],
})
export class AppMaterialModule { }