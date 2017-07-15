import { Component, ViewChild, ElementRef, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupComponent } from '../pickup/pickup';
import { Geofence } from '@ionic-native/geofence';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
declare var google;

@Component({
    selector: 'map',
    templateUrl: 'map.html',
})
export class MapComponent {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    watch: any;
    currentPosition:any;
    public positions: Object[] = [];

    constructor(private geolocation: Geolocation) {}

    // Load map only after view is initialized
    ngAfterViewInit() {
        this.loadMap();
    }

    getWatch(){        
        console.log('watch:', this.positions);
    }

    getCurrentPosition(){
        console.log(this.currentPosition);
    }

    toHome(){
        this.goTo(-33.4502784,-70.6522479);        
    }

    goTo(lat, lon){
        var latLng = new google.maps.LatLng(lat,lon); //Makes a latlng
        var marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Hello World!'
        });

        //marker.setMap(this.map);

        this.map.panTo(latLng); //Make map global
    }

    goCurrentPosition(){
        this.goTo(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
    }

    getCenter(){
        console.log(this.map.getCenter().lat(), this.map.getCenter().lng());
    }

    loadMap() {
        this.geolocation.getCurrentPosition().then((position) => {

            this.currentPosition = position;

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            }

            let triangleCoords = [
                { lat: -33.4138893, lng: -70.6033061 },
                { lat: -33.4122704, lng: -70.592576 },
                { lat: -33.4122703, lng: -70.592576 },
                { lat: -33.4232356, lng: -70.5844158 }
            ];

            // Construct the polygon.
            let bermudaTriangle = new google.maps.Polygon({
                paths: triangleCoords,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            bermudaTriangle.setMap(this.map);
            
            let GeolocationOptions = { frequency: 1 }
            
            this.watch = this.geolocation.watchPosition(GeolocationOptions);
            this.watch.subscribe(Position => {
                console.log('Position', Position);
                this.positions.push(Position);
            });


        }, (err) => {
            console.log(err);
        });
    }

}
