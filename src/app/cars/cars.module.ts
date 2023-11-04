import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarsComponent } from './list-cars/list-cars.component';

@NgModule({
  declarations: [
    ListCarsComponent
  ],
  exports: [
    ListCarsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CarsModule { }
