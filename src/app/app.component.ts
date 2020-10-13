import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { Router } from '@angular/router'; 

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

const ANALYTICS_TRACKING_ID = 'UA-171097823-4';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private router: Router,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault(); // replaced with style light to fix black notification bar
      this.statusBar.styleLightContent();

      this.initializeGoogleAnalytics();  

      this.dataService.getShowTutorial().then(res => {
        if (res == true || res == null) {
          this.showTutorial();
        }
      })

      this.splashScreen.hide();
    });

  }

  initializeGoogleAnalytics() {
    this.googleAnalytics.startTrackerWithId(ANALYTICS_TRACKING_ID, 30)
    .then(() => {
      console.log(`Loaded Google Analytics: ${ANALYTICS_TRACKING_ID}`)
    })
    .catch(e => console.log(`Error loading Google Analytics: ${e}`));
  }

  showTutorial() {
    this.router.navigateByUrl('/tutorial');
    this.dataService.setShowTutorial(false);
  }
}
