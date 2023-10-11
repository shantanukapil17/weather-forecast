import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    LoaderComponent,
    CityWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
