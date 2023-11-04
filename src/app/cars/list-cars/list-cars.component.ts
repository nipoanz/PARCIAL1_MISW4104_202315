import { Component, OnInit } from '@angular/core';
import { ICar } from '../cars.interface';
import { CarsService } from '../service/cars.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.scss']
})
export class ListCarsComponent implements OnInit {

  public cars: ICar[] = [];

  constructor(private carsService: CarsService) { }
  
  public ngOnInit() {
    this.getCourses();
  }

  public getCourses() {
    this.carsService.getCars().subscribe(
      (cars: ICar[]) => {
      this.cars = cars;
    });
  }

}
