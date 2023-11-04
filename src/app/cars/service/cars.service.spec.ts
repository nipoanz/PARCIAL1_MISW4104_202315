import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker/locale/es';
import { CarsService } from './cars.service';
import { ICar } from '../cars.interface';
import { environment } from 'src/environments/environment';


describe('CarsService', () => {
  let service: CarsService;
  let httpMock: HttpTestingController;

  let responseCars: ICar[] =  [new Array(10)].map(() => {
    return {
      id: faker.number.int(),
      marca: faker.vehicle.manufacturer(),
      linea: faker.vehicle.model(),
      referencia: faker.vehicle.type(),
      modelo: faker.date.past(),
      kilometraje: faker.number.int({ min: 100000 }),
      color: faker.vehicle.color(),
      imagen: faker.image.url(),
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        CarsService,
      ],
      teardown: { destroyAfterEach: false },
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify();
  });

  afterEach(() => {
    jest.resetAllMocks();
    faker.seed();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all cars', () => {
    service.getCars().subscribe(cars => {
      expect(cars).toEqual(responseCars);
    });
    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseCars);
  });

  it('should fail fetch all cars', () => {
    const respError = {
      "statusCode": 404,
      "message": "Not Found"
    };
    service.getCars().subscribe(
      () => {
        fail('Se esperaba un error 404, pero la solicitud tuvo éxito');
      },
      error => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );
    const req = httpMock.expectOne(`${environment.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(respError);
  });
});
