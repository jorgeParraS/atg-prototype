import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { PickupComponent } from '../components/pickup/pickup';
import { MapComponent } from '../components/map/map';
import { TabsComponent } from '../components/tabs/tabs';
import { HomeComponent } from '../components/home/home';

@NgModule({
    declarations: [
        MyApp,
        PickupComponent,
        MapComponent,
        TabsComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MapComponent,
        TabsComponent,
        HomeComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {}
