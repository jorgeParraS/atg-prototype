import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import * as inside from 'point-in-polygon';

declare var mapboxgl;
declare var MapboxDraw;
/**
 * Generated class for the MapboxmapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
	selector: 'mapboxmap',
	templateUrl: 'mapboxmap.html'
})
export class MapboxmapComponent {

	//@ViewChild('map') mapElement: ElementRef;
	text: string;
	map: any;
	subscriptionPosition: any;
	draw: any;

	constructor(private geolocation: Geolocation, private toastCtrl: ToastController) {
		console.log('Hello MapboxmapComponent Component');
		this.text = 'Hello World';
		
	}

	getDraw(){
		console.log(this.draw.getAll());
	}

	ngAfterViewInit() {

		mapboxgl.accessToken = 'pk.eyJ1Ijoia29rZXRyaWFuaSIsImEiOiJjajVoYXU3YmwxNHQ3MnFuenp5azFuZThlIn0._6KXD04o0EoZYOIcIKI07g';
		this.map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/outdoors-v10'
		});


		// Add geolocate control to the map.
		this.map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		}));

		this.draw = new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				polygon: true,
				trash: true
			}
		});
		console.log('polygon draw', this.draw);
		this.map.addControl(this.draw);

		this.map.on('locationfound', function (e) {
			console.log('e:', e);
			//map.fitBounds(e.bounds);

			// featureLayer.setGeoJSON({
			//     type: 'Feature',
			//     geometry: {
			//         type: 'Point',
			//         coordinates: [e.latlng.lng, e.latlng.lat]
			//     },
			//     properties: {
			//         'title': 'Here I am!',
			//         'marker-color': '#ff8888',
			//         'marker-symbol': 'star'
			//     }
			// });

			// // And hide the geolocation button
			// geolocate.parentNode.removeChild(geolocate);
		});

		
	}

	geLocation(){
		this.geolocation.getCurrentPosition().then((position) => {
			console.log('position', position);
			this.map.flyTo({
				center: [ position.coords.longitude, position.coords.latitude ],
				zoom: 15
			});
		});
	}

	inPosition(){
		let watch = this.geolocation.watchPosition();
		this.subscriptionPosition = watch.subscribe((data) => {
			console.log('watch data', data);
			let position = [ data.coords.longitude, data.coords.latitude ];
			// data can be a set of coordinates, or an error (if an error occurred).
			// data.coords.latitude
			// data.coords.longitude
			let toast = this.toastCtrl.create({
                message: "location found",
                duration: 3000,
                position: 'top'
            });
			toast.present(toast);

			let firstPolygon = this.draw.getAll().features[0].geometry.coordinates[0];
			console.log("firstPolygon", firstPolygon);
			console.log("inside", inside(position,firstPolygon));
			
			this.map.flyTo({
				center: position,
				zoom: 15
			});

			var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
			
			console.dir([
				inside([ 1.5, 1.5 ], polygon),
				inside([ 4.9, 1.2 ], polygon),
				inside([ 1.8, 1.1 ], polygon)
			]);

		});
	}
}
