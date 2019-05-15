import {MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatSortModule,MatProgressBarModule,MatSnackBarModule,MatGridListModule,MatTableModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,MatInputModule, MatCardModule],
  exports: [MatSortModule,MatProgressBarModule,MatSnackBarModule,MatGridListModule,MatTableModule,MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,MatInputModule, MatCardModule],
})
export class MaterialsModule { }
