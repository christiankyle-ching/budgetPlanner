import { Component, OnInit } from '@angular/core';
import * as Global from 'src/app/models/global';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  global = Global;
  
  constructor() { }

  ngOnInit() {
    
  }

}
