import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule]
})
export class MaterialModule { }
