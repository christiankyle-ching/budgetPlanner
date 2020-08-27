import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { Router } from '@angular/router'; 

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
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault(); - replaced with style light to fix black notification bar
      this.statusBar.styleLightContent();

      this.dataService.getShowTutorial().then(res => {
        if (res == true || res == null) {
          this.showTutorial();
        }
      })

      this.splashScreen.hide();
    });
  }

  showTutorial() {
    this.router.navigateByUrl('/tutorial');
    this.dataService.setShowTutorial(false);
  }
}
