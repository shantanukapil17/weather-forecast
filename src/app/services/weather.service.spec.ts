import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cities JSON as a Promise', (done: DoneFn) => {
    const mockCities = [
      { id: 3038789, lat: 50.099998, lon: 1.83333, nm: 'Abbeville' },
      { id: 3038779, lat: 50.098998, lon: 2.83333, nm: 'Abbevlle' }
    ];

    service.getCitiesJson().then(data => {
      expect(data).toEqual(mockCities);
      done();
    });

    const req = httpTestingController.expectOne('assets/cities-fr.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockCities);
  });
});