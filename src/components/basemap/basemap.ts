import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector: 'basemap',
    templateUrl: 'basemap.html'
})
export class BasemapComponent {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(private geolocation:Geolocation) {}

    // Load map only after view is initialized
    ngAfterViewInit() {

    	this.geolocation.getCurrentPosition().then((position) => {
	        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	        let mapOptions = {
	            center: latLng,
	            zoom: 15,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            disableDefaultUI: true
	        }
	        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        });
    }
}
