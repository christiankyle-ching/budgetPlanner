import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { createAnimation, Animation } from '@ionic/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  slider;
  slideCount = 6;
  animations = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    longSwipes: false,
    parallax: true
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.toggleDarkMode();

    this.slider = document.querySelector('#slider');
    this.initAnimations();
    this.slideChanged();
  }

  toggleDarkMode() {
    this.dataService.getDarkMode().then(res => {
      console.log('dark: ', res);

      if (res) {
        if (res == true) {
          document.body.classList.add('dark');
        }
      }
    })
  }

  initAnimations() {
    for (let i = 0; i < this.slideCount; i++) {
      const id = `#slide-${i}`;
      const animation = createAnimation()
        .addElement(document.querySelector(id))
        .duration(800)
        .iterations(1)
        .easing('ease-out')
        .fromTo('transform', 'translateY(0%)', 'translateY(-100%)')
        .fromTo('opacity', '0', '1');
      this.animations.push(animation);
    }
  }

  slideChanged() {
    this.slider.getActiveIndex().then(res => {
      this.animations[res].play();
    });
  }

  slideWillChange() {
    this.slider.getPreviousIndex().then(res => {
      this.animations[res].stop();
    });
    
  }



}
