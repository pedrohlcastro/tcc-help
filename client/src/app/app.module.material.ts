import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule],
  exports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule],
})
export class AppMaterialModule { }