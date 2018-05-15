import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule],
  exports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule],
})
export class AppMaterialModule { }