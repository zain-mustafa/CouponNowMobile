import { Injectable, NgZone } from '@angular/core';
import * as Geolocation from "nativescript-geolocation";
import { Location, distance } from "nativescript-geolocation";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

    public latitude;
    public longitude;
    public startLocation: Location = new Location();

  constructor(private zone: NgZone) {
      this.latitude = 0;
      this.longitude = 0;
   }

    private getDeviceLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            Geolocation.enableLocationRequest().then(() => {
                Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
                    resolve(location);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }

    public updateLocation() {
        this.getDeviceLocation().then(result => {
            this.latitude = result.latitude;
            this.longitude = result.longitude;
        }, error => {
            console.error(error);
        });
    }

    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      }

    distanceInKm(lat1, lon1, lat2, lon2) {
        console.log(lat1, lon1, lat2, lon2);

    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
    }
}
