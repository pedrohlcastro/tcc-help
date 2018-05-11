import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatTabsModule],
  exports: [MatCardModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatTabsModule],
})
export class AppMaterialModule { }