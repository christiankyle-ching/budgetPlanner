import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import * as Global from 'src/app/models/global';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  global = Global;
  
  constructor(
    private googleAnalytics: GoogleAnalytics
  ) { }

  ngOnInit() {
    this.googleAnalytics.trackView('About')
  }

}
