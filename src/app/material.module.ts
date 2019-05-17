import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatInputModule]
})
export class MaterialModule {}
