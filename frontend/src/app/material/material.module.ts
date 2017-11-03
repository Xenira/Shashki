import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule]
})
export class MaterialModule { }
