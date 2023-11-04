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
  const lengthCars = 3;
  const responsesListCars: ICar[] = Array.from({ length: lengthCars }, () => {
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
      subscribe: (f: any) => f(
        responsesListCars
      ),
    }),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [
        ListCarsComponent
      ],
      providers: [
        { provide: CarsService, useFactory: serviceMock }
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCars ang get 3 elements length and filter by counst brand on ngOnInit', () => {
    const carsService = fixture.debugElement.injector.get(CarsService);
    const spy = jest
      .spyOn(carsService, 'getCars')
      .mockReturnValue(of(responsesListCars));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.cars).toHaveLength(lengthCars);
     const uniqueBrands = [...new Set(responsesListCars.map(car => car.marca))];
     const expectedTotalCars = uniqueBrands.map(brand => ({
       nombre: brand,
       cantidad: responsesListCars.filter(car => car.marca === brand).length,
     }));
     expect(component.totalCars).toEqual(expectedTotalCars);
  });

  it('Component has a table', () => {
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);
  });

  it('should have a src banner image on <img> element', () => {
    const element = debug.query(By.css('img.list-cars__banner'));
    const imgScr = 'assets/frame.png';
    expect(element).toBeTruthy();
    const srcAttribute = element.nativeElement.getAttribute('src');
    expect(srcAttribute).toBe(imgScr)
  });

  it('should have all four columns in the table', () => {
    const element = debug.queryAll(By.css('th.h4'));
    expect(element.length).toEqual(4);
    const columnTitles = element.map(column => column.nativeElement.textContent.trim());
    expect(columnTitles).toEqual(['#', 'Marca', 'Linea', 'Modelo']);
  });

  it('should have three cars data rows in the table', () => {
    const element = debug.queryAll(By.css('tr.list-cars__tbody-elements'));
    expect(element.length).toEqual(lengthCars);
  });

  it('should have a table  with three data rows and headers', () => {
    component.getCourses();
    // fixture.whenStable().then(() => {
    // fixture.detectChanges();
    const table = debug.query(By.css('table.table'));
    //SE VERIFICA QUE LA TABLA EXISTA
    expect(table).toBeTruthy();
    const columnTitles = debug.queryAll(By.css('th.h4'));
    // console.log(columnTitles);
    //SE OBTIENE CADA UNA DE LAS COLUMNAS # - MARCA - LINEA - MODELO
    expect(columnTitles).toHaveLength(4);
    //SE VERIFICA QUE LAS COLUMNAS SEAN LAS CORRECTAS
    const dataRows = debug.queryAll(By.css('tr.list-cars__tbody-elements'));
    expect(dataRows).toHaveLength(lengthCars);
    for (let i = 0; i < lengthCars; i++) {
      const car = responsesListCars[i];
      const dataRow = dataRows[i];
      // console.log(dataRow);
      const idItem = dataRow.query(By.css('b')).nativeElement.textContent.trim();
      const marcaItem = dataRow.query(By.css(':nth-child(2)')).nativeElement.textContent.trim();
      const lineaItem = dataRow.query(By.css(':nth-child(3)')).nativeElement.textContent.trim();
      const modeloItem = dataRow.query(By.css(':nth-child(4)')).nativeElement.textContent.trim();
      const dataRowContent = [idItem, marcaItem, lineaItem, modeloItem];
      // console.log(idItem);
      // console.log(marcaItem);
      // console.log(lineaItem);
      // console.log(modeloItem);
      expect(dataRowContent).toEqual([car.id.toString(), car.marca, car.linea, car.modelo.toString()]);
    }
  });
});
