import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule, MatSnackBarModule],
  exports: [MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, 
    MatCardModule, MatInputModule, MatRadioModule, MatSnackBarModule],
})
export class AppMaterialModule { }