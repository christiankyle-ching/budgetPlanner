import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { AddExpensesTemplatePage } from '../add-expenses-template/add-expenses-template.page';

@Component({
  selector: 'app-budget-today-menu',
  templateUrl: './budget-today-menu.component.html',
  styleUrls: ['./budget-today-menu.component.scss'],
})
export class BudgetTodayMenuComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() { }

  async presentAddExpensesTemplateModal() {

    const modal = await this.modalCtrl.create({
      component: AddExpensesTemplatePage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      switch (data.action) {
        case 'save':
          this.presentToast('Saved Template: ' + data.name);
          break;
        case 'edit':
          this.presentToast('Saved Changes to Template: ' + data.name);
          break;
        case 'delete':
          this.presentToast('Deleted Template: ' + data.name);
          break;
      }
    }

    //dismiss menu
    this.dismiss();

    return;
  }

  async presentToast(pMessage: string) {
    const toast = await this.toastCtrl.create({
      message: pMessage,
      translucent: true,
      duration: 2000
    });
    toast.present();
  }



  dismiss() {
    this.popoverCtrl.dismiss();
  }

}
