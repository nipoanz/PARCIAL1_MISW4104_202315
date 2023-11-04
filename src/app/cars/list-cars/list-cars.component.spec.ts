import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker/locale/es';
import { ListCarsComponent } from './list-cars.component';
import { ICar } from '../cars.interface';
import { CarsService } from '../service/cars.service';
import { By } from '@angular/platform-browser';

describe('ListCarsComponent', () => {
  let component: ListCarsComponent;
  let fixture: ComponentFixture<ListCarsComponent>;
  let debug: DebugElement;

  let responsesListCars: ICar[] = [new Array(10)].map(() => {
    return {
      id: faker.number.int(),
      marca: faker.vehicle.manufacturer(),
      linea: faker.vehicle.model(),
      referencia: faker.vehicle.type(),
      modelo: faker.date.past(),
      kilometraje: faker.number.int({ min: 100000 }),
      color: faker.vehicle.color(),
      imagen: faker.image.url(),
    };
  });

  const serviceMock = () => ({
    getCars: () => ({
      subscribe: (f: any) => f(responsesListCars),
    }),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ListCarsComponent],
      providers: [{ provide: CarsService, useFactory: serviceMock }],
      teardown: { destroyAfterEach: false },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
    responsesListCars = [new Array(10)].map(() => {
      return {
        id: faker.number.int(),
        marca: faker.vehicle.manufacturer(),
        linea: faker.vehicle.model(),
        referencia: faker.vehicle.type(),
        modelo: faker.date.past(),
        kilometraje: faker.number.int({ min: 100000 }),
        color: faker.vehicle.color(),
        imagen: faker.image.url(),
      };
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCars on ngOnInit', () => {
    const carsService = fixture.debugElement.injector.get(CarsService);
    const spy = jest
      .spyOn(carsService, 'getCars')
      .mockReturnValue(of(responsesListCars));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.cars).toHaveLength(responsesListCars.length);
  });

  it('Component has a table', () => {
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);
  });

  // it('should have an dd element ', () => {
  //   const dd = debug.query(By.css('dd'));
  //   const content: HTMLElement = dd.nativeElement;
  //   console.log(content.textContent);
  //   expect(content.textContent).toEqual(component.cars[0].marca);
  // });
});
