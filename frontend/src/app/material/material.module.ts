import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule, MatProgressBarModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule, MatProgressBarModule]
})
export class MaterialModule { }
