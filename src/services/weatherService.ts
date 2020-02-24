import axios from'axios';
import { Coords } from '../entities/coords';

export class WeatherService{

    getWeather(param: Coords) {
   return axios.get('https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&lat='+param.latitude+'&lon='+ param.longitude);
    }

}