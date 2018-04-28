import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
  MatCardModule, MatInputModule, MatRadioModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule, MatSnackBarModule],
  exports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule, MatSnackBarModule],
})
export class AppMaterialModule { }