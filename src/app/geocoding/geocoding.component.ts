import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AgmMap, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Loc } from '../models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var google: any; 

interface Marker { 
  lat:number; 
  lng: number; 
  label?: string; 
  draggable: boolean; 
}

interface Location { 
  lat:number; 
  lng: number; 
  viewport?: Object; 
  zoom: number; 
  address_level_1?: string; 
  address_level_2?: string; 
  address_country?: string; 
  address_zip?: string; 
  address_state?: string; 
  marker?: Marker; 
}

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent implements OnInit {

  geocoder: any;
  
  baseurl: string = "http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/locations/"

  testlocs: Loc[] = [ ]

  public location:Location = {
    lat: 40.70735, 
    lng: -100.21625,
    marker: { 
      lat: 40.70735, 
      lng: -100.21625,
      draggable: false
    },
    zoom: 5
  }

   title: string = 'AGM project';
   latitude: number;
   longitude: number;
   zoom: number;
   address: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild(AgmMap) map: AgmMap;


  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper, 
    private http: HttpClient) {
      this.mapsApiLoader = mapsApiLoader; 
      this.zone = zone; 
      this. wrapper = wrapper; 
      this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      })
    }

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})}

  getLocations() { 
    this.http.get<Loc[]>(this.baseurl).subscribe(locations => {
      this.testlocs = locations
    })
  }

  ngOnInit() {
    //load Places Autocomplete
    this.mapsApiLoader.load()
    this.setCurrentLocation();
    this.getLocations(); 
 }

   //Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.location.lat;
        this.longitude = this.location.lng;
        this.zoom = 12;
      });
    }
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          console.log(this.location.lat)
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = false;
          this.location.viewport = results[0].geometry.viewport;

          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
        }
        
        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  updateClick(loc: Loc) { 
    this.findLocation(loc.city + ", " + loc.state); 
   }

  initMap() { 

  }

}