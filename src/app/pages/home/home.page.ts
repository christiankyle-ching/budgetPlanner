import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  darkMode: boolean;

  pages = [
    {
      title: 'Budget Today',
      url: '/home/budget-today',
      icon: 'basket'
    },
    {
      title: 'Summary',
      url: '/home/summary',
      icon: 'bar-chart'
    },
    {
      header: 'MISC',
      children: [
        {
          title: 'Backup & Restore',
          url: '/home/backup',
          icon: 'save'
        },
        {
          title: 'Help & Feedback',
          url: '/home/help',
          icon: 'help-circle'
        },
        {
          title: 'About',
          url: '/home/about',
          icon: 'information-circle'
        },

      ]
    }

  ];

  selectedPath = '';

  constructor(
    private router: Router,
    private plt: Platform,
    private themeService: ThemeService,
    private dataService: DataService,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
    this.initApp();
  }

  initApp() {
    this.dataService.getDarkMode().then(res => {
      this.darkMode = res;
      this.toggleDarkMode();
    })
  }

  toggleDarkMode() {
    this.themeService.setAppTheme(this.darkMode);
  }

  // EXIT APP THRU BACK BUTTON

  backButtonSubscription: any;

  ionViewDidEnter() {
    console.log('ENTER SUB')

    this.backButtonSubscription = this.plt.backButton.subscribe(() => {
      
    })
  }

  ionViewWillLeave() {
    console.log('CANCEL SUB');

    this.backButtonSubscription.unsubscribe();
  }

  exitApp() {
    navigator['app'].exitApp();
  }

}
