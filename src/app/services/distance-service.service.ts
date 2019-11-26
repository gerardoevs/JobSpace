import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Distance, DistanceRow, DistanceElement} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  currentLocation;
  distanceAway;
  constructor(private http: HttpClient, private geolocation: Geolocation) { 
    this.getCurrentLocation();
  }

  getDistance(destination: any) {
    return this.http.get(`https://us-central1-jobspace-856d9.cloudfunctions.net/distance?origins=
    ${this.currentLocation}&destinations=
    ${destination}`);
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation = resp.coords.latitude + ',' + resp.coords.longitude;
     }).catch((error) => {
        console.log('Error getting location', error);
        return  null;
     });
  }
}
