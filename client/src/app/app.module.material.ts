import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule],
  exports: [MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule],
})
export class AppMaterialModule { }