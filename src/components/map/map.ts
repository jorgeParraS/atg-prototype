import { Component, ViewChild, ElementRef, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupComponent } from '../pickup/pickup';
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
    constructor(private geolocation: Geolocation) {}

    // Load map only after view is initialized
    ngAfterViewInit() {
        this.loadMap();
    }

    getWatch(){
        console.log('watch:', this.watch);
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
            
            this.watch = this.geolocation.watchPosition();
            this.watch.subscribe(Position => {
                console.log('Position', Position);
            });


        }, (err) => {
            console.log(err);
        });
    }

}
