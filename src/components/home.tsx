import React, { Component } from 'react';
import { Coords } from '../entities/coords';
import { WeatherService } from '../services/weatherService';
import Slider from 'rc-slider';

const weatherService = new WeatherService();
const homeState =    {
    coords: {},
    isSliderMoved: false,
    icon:'',
    temp: 0,
    name: '',
    country: ''
};
export class Home extends Component {
    state = homeState;

    onSliderChange = (value: any) => {
        homeState.isSliderMoved = true;
        homeState.temp = value;
        this.setState(homeState);
    };

    render() {
        if(!homeState.isSliderMoved === true){
            this.getLocation();
        }
        let weatherName = 'cold-weather';
        if(this.state.temp >= 10 && this.state.temp < 30){
            weatherName = 'warm-weather';
        }
        if(this.state.temp >= 30){
            weatherName = 'hot-weather';
        }
        return <div className="row h-100 justify-content-center align-items-center">
            <div className={`${weatherName} col-12`}>
                <h1>Weather in  {this.state.name}, {this.state.country}
                </h1>
                <img src={`../weatherIcons/${this.state.icon}@2x.png`} alt={`${this.state.name}`}/>
                <p>{this.state.temp}&deg;C</p>
            </div>
            <div className="slider">
                <Slider min={-50} max={50} defaultValue={0}  onChange={this.onSliderChange}/>
            </div>
        </div>
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
            let coords = new Coords();
            coords.latitude = position.coords.latitude;
            coords.longitude = position.coords.longitude;

            weatherService.getWeather(coords).then((res: any) => {
                homeState.country = res.data.sys.country;
                homeState.name = res.data.name;
                homeState.icon = res.data.weather[0].icon;
                homeState.temp = res.data.main.temp;
                this.setState(homeState)
            });
        });
    }

}


