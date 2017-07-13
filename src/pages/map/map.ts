import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(public navCtrl: NavController, public geolocation: Geolocation) {

    }

    startJob(){
        console.log('start Job!');  
    }

    ionViewDidLoad() {
        console.log('aca');
        this.loadMap();
    }

    loadMap() {

        this.geolocation.getCurrentPosition().then((position) => {

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            }

            var triangleCoords = [
	            { lat: -33.4138893, lng: -70.6033061 },
	            { lat: -33.4122704, lng: -70.592576 },
	            { lat: -33.4122703, lng: -70.592576 },
	            { lat: -33.4232356, lng: -70.5844158 }
	        ];

	        // Construct the polygon.
	        var bermudaTriangle = new google.maps.Polygon({
	            paths: triangleCoords,
	            strokeColor: '#FF0000',
	            strokeOpacity: 0.8,
	            strokeWeight: 2,
	            fillColor: '#FF0000',
	            fillOpacity: 0.35
	        });
	        
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	        
	        bermudaTriangle.setMap(this.map);


        }, (err) => {
            console.log(err);
        });      
    }

}
