import { Injectable, NgZone } from '@angular/core';
import * as Geolocation from "nativescript-geolocation";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

    public latitude: number;
    public longitude: number;

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
}
