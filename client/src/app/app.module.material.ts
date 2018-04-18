import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule],
  exports: [MatCardModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule],
})
export class AppMaterialModule { }