import { Coords } from "../entities/coords";

export class UserLocationService{

    getLocation(){
      return  navigator.geolocation.getCurrentPosition(
           function success(position) {
            let coords = new Coords();
            coords.latitude = position.coords.latitude;
            coords.longitude = position.coords.longitude;    
            return coords;
            })        
    }
    
    
}