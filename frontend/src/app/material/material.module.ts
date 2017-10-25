import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatGridListModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule],
  exports: [MatCardModule, MatIconModule, MatGridListModule, MatButtonModule]
})
export class MaterialModule { }
