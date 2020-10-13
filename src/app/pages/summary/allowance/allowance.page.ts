import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as Chart from 'chart.js';
import { setColors } from 'src/app/models/global';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.page.html',
  styleUrls: ['./allowance.page.scss'],
})
export class AllowancePage implements OnInit {

  @ViewChild('pieCanvas', {static: false}) pieCanvas: ElementRef;
  pieChart: Chart;

  topAllowances = [];
  showChart = false;

  constructor(
    private dataService: DataService,
    private googleAnalytics: GoogleAnalytics,
  ) {

  }

  ngOnInit() {
    this.googleAnalytics.trackView('Summary - Allowance')
    
    this.dataService.getTempItem('topAllowances').then(res => {
      this.topAllowances = res;
    }).then(() => {
      this.initChart();
    });

    
  }

  initChart() {
    let topData = [];
    this.topAllowances.forEach(el => {
      topData.push(el.amount)
    });

    let topLabels = [];
    this.topAllowances.forEach(el => {
      topLabels.push(el.name)
    });

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: topData,
            backgroundColor: setColors
          },
          
        ],

        labels: topLabels
      },
      options: {
        legend: {
          display: false
        },
      }
    })
  }

}
