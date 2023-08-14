import { Component, HostBinding } from '@angular/core';
import { WeatherService } from '../weather.service';
import { faSun, faCloudRain, faCloudSun, faCloud, faCloudMeatball, faSmog, faCloudShowersHeavy, faCloudSunRain, faWater, faWind, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations'; // Import animation symbols

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']

})

export class WeatherComponent {
  title = 'weatherApp';
  city: string = ''; // Set the type of the 'city' property to 'string'
  weatherData: any;
  CloudSunRainIcon = faCloudSunRain;
  sunnyIcon = faSun;
  rainyIcon = faCloudRain;
  brokenCloudyIcon = faCloudSun;
  CloudyIcon = faCloud;
  cloudsMovingIcon = faCloud;
  ClodBallIcon = faCloudMeatball;
  MistIcon = faSmog;
  CloudRainIcon = faCloudShowersHeavy;
  // HazeIcon = faSunHaze;
  waterIcon = faWater;
  WindIcon = faWind;
  clearSkyIcon = faSun;

  displayedTime: string = '';
  backgroundImage: string = '';


  constructor(private weatherService: WeatherService) { }

  // onCityInputChange(event: Event) {
  //   this.city = (event.target as HTMLInputElement).value;
  // }

  ngOnInit() { }

  getWeatherIcon(description: string): IconDefinition {
    if (description.includes('sunny')) return faSun;
    if (description.includes('rain')) return faCloudRain;
    if (description.includes('broken cloud')) return faCloudMeatball;
    if (description.includes('cloud')) return faCloud;
    if (description.includes('mist')) return faSmog;
    if (description.includes('Light rain')) return faCloudRain;
    // if (description.includes('haze')) return faSunHaze;
    if (description.includes('wind')) return faWind;
    // Add more conditions for other icons

    // If no matching condition is found, return a default icon
    return faSun;  //default icon
  }

  getWeather() {
    this.weatherService.getWeather(this.city)
      .subscribe((data) => {
        this.weatherData = data;

        // Get the time zone offset from the weather data
        const timeZoneOffset = this.weatherData.timezone / 3600; // Convert to hours
        this.displayedTime = this.getCurrentDateTime(timeZoneOffset);
        console.log(this.weatherData);

        //  background image or animation  based on weather description

        if (this.weatherData.weather[0].description.includes('rain')) {
          this.backgroundImage = 'url(https://i.gifer.com/2Cyz.gif)';
        }  else if (this.weatherData.weather[0].description.includes('thunderstorm')) {
          this.backgroundImage = 'url(https://bestanimations.com/media/storms/1277905049lightning-storm-animated-gif-6.gif)';
        }
        else if (this.weatherData.weather[0].description.includes('wind')) {
          this.backgroundImage = 'url(https://media.tenor.com/9S8FYxe5NaIAAAAC/wind-anime.gif)';
        }
        
        else if (this.weatherData.weather[0].description.includes('cloud')) {
          this.backgroundImage = 'url(https://media.tenor.com/AqX7SH3FhPkAAAAM/moving-clouds-world-meteorological-day.gif)';
        }

        else if (this.weatherData.weather[0].description.includes('sunny')) {
          this.backgroundImage = 'url(https://media.tenor.com/6mP-iJhCPnIAAAAC/sunny.gif)';
        }
        else if (this.weatherData.weather[0].description.includes('haze')) {
          this.backgroundImage = 'url(https://media.tenor.com/DTp0irTS_WgAAAAC/foggy-fog.gif)';
        }
        else if (this.weatherData.weather[0].description.includes('mist')) {
          this.backgroundImage = 'url(https://media.baamboozle.com/uploads/images/90088/1635599532_2749275.gif)';
        }
        else {
          this.backgroundImage = ''; // Default background image or none
        }

      });
  }

  getCurrentDateTime(timeZoneOffset: number): string {
    const now = new Date();
    // Calculate the UTC time
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    // Calculate the local time using the time zone offset
    const localTime = utcTime + timeZoneOffset * 3600000; // Convert offset to milliseconds
    // Create a new Date object with the adjusted local time
    const localDate = new Date(localTime);

    // Use Intl.DateTimeFormat to format the date and time in the desired format

    // reference stack-overflow
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    });

    return formatter.format(localDate);
  }

  isDayTime(): boolean {
    // Get the current time
    const currentTime = new Date().getHours();

    // Check if it's between sunrise and sunset hours (you might need to adjust these values)
    const isDay = currentTime >= 6 && currentTime <= 18;

    // Return true for day and false for night
    return isDay;
  }

}




