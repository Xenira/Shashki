import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatSnackBarModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule]
})
export class MaterialModule { }
