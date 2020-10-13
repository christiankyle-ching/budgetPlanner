import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavParams, ModalController } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-summary-day',
  templateUrl: './summary-day.page.html',
  styleUrls: ['./summary-day.page.scss'],
})
export class SummaryDayPage implements OnInit {

  key;
  date;
  item;

  txtTitle;
  txtNote;

  txtTotalAllowances = 0;
  txtTotalExpenses = 0;
  txtTotalSavings = 0;

  constructor(
    private dataService: DataService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private googleAnalytics: GoogleAnalytics,
  ) {

  }

  ngOnInit() {
    this.googleAnalytics.trackView('Summary - Specific Day')

    this.key = this.navParams.get('key');
    this.date = this.navParams.get('date');

    this.item = this.dataService.reloadDayItemWithKey(this.key).then((res) => {
      if (res) {
        this.item = res;
        this.loadData();

        console.log('Loaded With Data: ', this.item);
      } else {
        throw '';
      }

    })
      .catch(() => {
        this.item = {
          allowances: [],
          expenses: [],
          savings: 0,
          date: this.date,
          note: ''
        };

        console.log('Loaded With Blank: ', this.item);

        this.loadData();
      });
  }

  loadData() {
    console.log(this.item.allowances);


    this.item.expenses.forEach(e => {
      this.txtTotalExpenses += Number(e.amount);
    });



    this.item.allowances.forEach(a => {
      this.txtTotalAllowances += Number(a.amount);
    });

    this.txtTotalSavings = this.txtTotalAllowances - this.txtTotalExpenses;
    
    this.txtNote = this.item.note;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
