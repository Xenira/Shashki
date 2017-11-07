import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
  MatMenuModule, MatDialogModule, MatListModule, MatProgressBarModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule, MatProgressBarModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule, MatSnackBarModule,
    MatMenuModule, MatDialogModule, MatListModule, MatProgressBarModule, MatFormFieldModule,
    MatInputModule, MatProgressSpinnerModule]
})
export class MaterialModule { }
