import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { setColors } from 'src/app/models/global';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  @ViewChild('pieCanvas', {static: false}) pieCanvas: ElementRef;

  topExpenses = [];
  showChart = false;
  pieChart: Chart;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getTempItem('topExpenses').then(res => {
      this.topExpenses = res;
    }).then(() => {
      this.initChart();
    });
  }
  
  initChart() {
    let topData = [];
    this.topExpenses.forEach(el => {
      topData.push(el.amount)
    });

    let topLabels = [];
    this.topExpenses.forEach(el => {
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
