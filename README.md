# WeatherForecast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

# Approach Defined

COMPONENTS -
In the app folder, I have created a components folder that contains two components one is cities-list which is used to select the city from the dropdown and show the weather data for that particular city and the second one is city weather which is used to display the table data.

SERVICE -
After the components, I created the service folder which has a weather.service file which is being used to call the API and I used Promise() to call the API. This file has all the API calls.

LOADER - 
I created another folder called shared where I created a loader component to show the loader when we select a city from the dropdown list.

# How to run this project
Go to the branch weather
clone the project by using the git clone command and then go to the directory where you downloaded it and run 
1. npm I
2. ng serve
After running the first two commands project will run locally on your system browser at port number 4200 localhost:4200

# How things are working internally
Angular Components and Services:

Angular is a framework for building client-side web applications. In Angular, applications are organized using components and services.
Components define the structure and behavior of parts of the user interface.
Services encapsulate application logic and provide functionalities that can be shared across multiple components.
Component: CitiesListComponent:

This component is responsible for managing the city list, fetching weather data, and handling user interactions related to cities.
Initialization:

The component is initialized in the ngOnInit lifecycle hook, where it calls getCitiesList to fetch the cities list and sets the first city as the selected city.
Fetching Cities and Weather Data:

The getCitiesList function fetches the list of cities from the weather service.
The getCurrentWeather and getWeatherForecast functions fetch current weather and forecast data for the selected city, respectively, using the WeatherService.
Rendering Weather Data:

The weather data is rendered in the template using Angular's templating syntax and data binding.
The weather forecast data is displayed in a table with dynamic columns for the next three days.
Event Handling:

The onSelectCity function is called when a city is selected from the dropdown list. It fetches and displays the weather data for the selected city.
Testing:

Jasmine and Angular testing utilities are used for unit testing.
Mock data and spies are used to simulate the behavior of the weather service.
Test cases ensure that the component interacts correctly with the WeatherService and processes the data as expected.

# Why I choose this approach

Modularity and Reusability:

Angular promotes a modular approach, making it easier to manage and reuse components and services across the application.
Components like CitiesListComponent are reusable, providing a consistent way to display city weather information.
Separation of Concerns:

Components like CitiesListComponent handle the user interface and user interactions, keeping the logic separate from the template.
Services, such as WeatherService, encapsulate data fetching and API interactions, maintaining a clear separation of concerns.
Asynchronous Operations and Error Handling:

The use of asynchronous operations (e.g., fetching weather data) is handled effectively using async/await syntax, enhancing code readability and manageability.
Proper error handling (using try-catch blocks) ensures that the application can gracefully handle errors and display appropriate feedback to the user.

# NETLIFY LINK
https://65292cfee226482551bd9d47--fascinating-brigadeiros-a13748.netlify.app/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
