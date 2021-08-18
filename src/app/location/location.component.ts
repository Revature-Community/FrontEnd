import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

import { Loc } from '../models/location';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  // Implement validation based upon actual city names

  allLocations: string = 'all';

  locationdata: any = [];
  city = '';
  state = '';
  states = [
    'Alabama',
    'Arkansas',
    'Arizona',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Iowa',
    'Idaho',
    'Illinois',
    'Indiana',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Massachusetts',
    'Maryland',
    'Maine',
    'Michigan',
    'Minnesota',
    'Missouri',
    'Mississippi',
    'Montana',
    'Nebraska',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'Nevada',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'Wisconsin',
    'West Virginia',
    'Wyoming',
  ];



  getData() {
    this.locationService.getLocations().subscribe(res => {
      this.locationdata = res;
      console.log(this.locationdata);
    });
  }

  constructor(
    private locationService: LocationService,
  ) {
    this.locationdata = this.getData(); 
  }

  ngOnInit(): void {
    this.getData();
  }

  addLocation() {
    let location = new Loc(this.city, this.state);
    console.log("Hello I am location "+location);

    this.locationService.saveLocation(location).subscribe((data: any) => {
      location = data;
    });
    //this.location = new Loc();
  }

  switch() {
    if (this.allLocations.match('all')) {
      this.allLocations = 'create';
    } else if (this.allLocations.match('create')) {
      this.allLocations = 'all';
    }
  }
}
