import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesListComponent } from './cities-list.component';
import { WeatherService } from 'src/app/services/weather.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CitiesListComponent', () => {
  let component: CitiesListComponent;
  let fixture: ComponentFixture<CitiesListComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    // Mock the WeatherService
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getCitiesJson']);

    await TestBed.configureTestingModule({
      declarations: [CitiesListComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCitiesList on ngOnInit', () => {
    spyOn(component, 'getCitiesList').and.callThrough();
    component.ngOnInit();
    expect(component.getCitiesList).toHaveBeenCalled();
  });

  it('should fetch cities list and set selected city on getCitiesList', () => {
    const mockCities = [
      { id: 3038789, nm: 'Abbeville' , lat: 50.099998, lon: 1.83333},
      { id: 3038756, nm: "Ablis", lat: 48.5172, lon: 1.83624 },
      {id: 3038754, nm: "Ablon-sur-Seine", lat: 48.727322, lon: 2.42686},
      {id: 3038754, nm: "Ablon-sur-Seine", lat: 48.727322, lon: 2.42686}

    ];
    component.getCitiesList();
    component.getCitiesList();
    expect(mockWeatherService.getCitiesJson).toHaveBeenCalled();
    expect(component.citiesList).toEqual(mockCities);
    expect(component.selectedCity).toEqual(mockCities[0]);

  });
});
