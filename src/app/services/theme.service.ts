import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = false;

  constructor(
    private platform: Platform,
    private dataService: DataService
  ) {

    this.platform.ready().then(() => {

      this.dataService.getDarkMode().then(res => {
        if (res) {
          this.darkMode = res;
          this.setAppTheme(this.darkMode);
        } else {
          //if no key set, then make one
          throw '';
        }

      })
        .catch(() => {
          console.log('Create theme...');
          this.dataService.setDarkMode(false);
        });

      //listener when os system changes preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addListener(e => {
        console.log('matches: ', e);
        this.setAppTheme(e.matches);
      })

    })

  }

  toggleAppTheme() {
    //invert darkmode state
    this.darkMode = !this.darkMode;
    this.setAppTheme(this.darkMode);
  }

  setAppTheme(dark) {
    this.darkMode = dark;

    if (this.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    this.dataService.setDarkMode(this.darkMode);
  }

}