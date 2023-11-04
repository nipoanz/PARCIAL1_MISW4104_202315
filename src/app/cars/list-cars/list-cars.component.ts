import { Component, OnInit } from '@angular/core';
import { ICar, ITotalCars } from '../cars.interface';
import { CarsService } from '../service/cars.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.scss']
})
export class ListCarsComponent implements OnInit {

  public cars: ICar[] = [];

  public totalCars: ITotalCars[] = [];

  constructor(private carsService: CarsService) { }
  
  public ngOnInit() {
    this.getCourses();
  }

  public getCourses() {
    this.carsService.getCars().subscribe(
      (cars: ICar[]) => {
      this.cars = cars;
      //Obtener todas las marcas
      const brands = this.cars.map((car: ICar) => car.marca);
      //Eliminar las marcas repetidas
      const brandsUnique = brands.filter((brand: string, index: number) => brands.indexOf(brand) === index);
      //Contar cuantos carros hay por marca
      this.totalCars = brandsUnique.map((brand: string) => {
        return {
          nombre: brand,
          cantidad: this.cars.filter((car: ICar) => car.marca === brand).length
        };
      });
    });
  }

}
