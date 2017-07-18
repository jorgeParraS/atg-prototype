import { Component, ViewChild, ElementRef, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupComponent } from '../pickup/pickup';
import { ToastController } from 'ionic-angular';
// import { Geofence } from '@ionic-native/geofence';

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
    currentPosition: any;
    recordInterval: any;
    recordStatus:string = "play";
    currentAction:string = "play";
    public area: Object[] = [{  a: 1 }];
    public positions: Object[] = [];

    constructor(private geolocation: Geolocation, private toastCtrl: ToastController) {}

    // Load map only after view is initialized
    ngAfterViewInit() {
        this.loadMap();
    }

    getWatch() {
        let GeolocationOptions = { frequency: 1 }
        this.watch = this.geolocation.watchPosition(GeolocationOptions);
        console.log('watch:', this.positions);
    }

    getCurrentPosition() {
        this.geolocation.getCurrentPosition().then((position) => {
            this.currentPosition = position;
        });
    }

    printPosition(all: any) {
        // this.getCurrentPosition();
        // console.log('currentPosition', this.currentPosition)
        // console.log(position);
        all.recordStatus = 'pause';
        all.currentAction = 'pause';
        console.log('all.area', all.area);
        let area = [
            { lat: -33.445068, lng: -70.654256 },
            { lat: -33.451406, lng: -70.657239 },
            { lat: -33.450349, lng: -70.650501 }
        ];

        var areaTriangle = new google.maps.Polygon({ paths: area });
        var lineCoords = [];

        all.geolocation.getCurrentPosition().then((position) => {
            
            let speed = position.coords.speed;
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            var latLng = new google.maps.LatLng(lat, lng); //Makes a latlng

            all.goTo(lat, lng);
            //let mark = new google.maps.Marker({ position: { lat: lat, lng: lng }, map: this.map });
            //mark.setMap(all.map);

            lineCoords.push(new google.maps.LatLng(lat, lng));

            var lineCoordinatesPath = new google.maps.Polyline({
                path: lineCoords,
                geodesic: true,
                strokeColor: '#2E10FF'
            });

            lineCoordinatesPath.setMap(all.map);

            var inLocation = google.maps.geometry.poly.containsLocation(latLng, areaTriangle);
            let toast = all.toastCtrl.create({
                message: 'inLocation:' + inLocation,
                duration: 3000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present(toast);
            console.log('in inLocation:', inLocation);
        });
    }

    startRecord() {
       this.recordInterval = setInterval(this.printPosition, 5000, this, this.area);
    }

    clearRecord(){
        this.currentAction = 'play';
        clearInterval(this.recordInterval);
    }
    toHome() {
        this.goTo(-33.4502784, -70.6522479);
    }

    goTo(lat, lon) {
        var latLng = new google.maps.LatLng(lat, lon); //Makes a latlng
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: 'Hello World!'
        });

        marker.setMap(this.map);

        this.map.panTo(latLng); //Make map global
    }

    goCurrentPosition() {
        this.goTo(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
    }

    getCenter() {
        console.log(this.map.getCenter().lat(), this.map.getCenter().lng());
    }

    getMap() {
        console.log(this.map);
    }

    getLocation() {

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

            /*cordenadas para el poligono*/
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

            let area = [
                { lat: -33.445068, lng: -70.654256 },
                { lat: -33.451406, lng: -70.657239 },
                { lat: -33.450349, lng: -70.650501 }
            ];

            // Construct the polygon.
            let areaTriangle = new google.maps.Polygon({
                paths: area,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            /*se agrega el poligono*/
            areaTriangle.setMap(this.map);

            /* herramienta para dibujar un poligono */
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.MARKER,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
                },
                markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 1,
                    strokeWeight: 5,
                    clickable: false,
                    editable: true,
                    zIndex: 1
                }
            });
            drawingManager.setMap(this.map);
            var elarea: Object[] = [];
            /* listener de la creacion del polygon */

            google.maps.event.addListener(drawingManager, 'polygoncomplete', ((area) => {
                // assuming you want the points in a div with id="info"
                // document.getElementById('info').innerHTML += "polygon points:" + "<br>";

                return (polygon) => {
                    elarea = [];
                    console.log('area', area);
                    for (var i = 0; i < polygon.getPath().getLength(); i++) {
                        // document.getElementById('info').innerHTML += polygon.getPath().getAt(i).toUrlValue(6) + "<br>";                        
                        //console.log(polygon.getPath().getAt(i).lat());
                        let pos: Object = { lat: polygon.getPath().getAt(i).lat(), lng: polygon.getPath().getAt(i).lng() };

                        elarea.push(pos);
                    }                    
                    area = elarea;
                }
            })(this.area));

            let GeolocationOptions = { frequency: 1 }
            /* observador de la posicion */
            // this.watch = this.geolocation.watchPosition(GeolocationOptions);
            // this.watch.subscribe(Position => {
            //     console.log('Position', Position);
            //     this.positions.push(Position);
            // });


        }, (err) => {
            console.log(err);
        });
    }

    getArea(){
        console.log('area!', this.area);
    }

}
