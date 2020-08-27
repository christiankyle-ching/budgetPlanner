import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';


@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(
    private storage: Storage,
    private file: File,
    private plt: Platform,
    private chooser: Chooser,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {

  }

  // #region BACKUP

  backup() {
    console.log('Log All Data:');

    let storageLength = 0;

    this.storage.length().then(res => {
      storageLength = res;
    })

    let json = '';

    this.storage.forEach((val, key, i) => {

      json += `"${key}" : ${JSON.stringify(val)}`;
      if (i < storageLength) {
        json += ',';
      }


    }).then(() => {
      json = '{' + json + '}';
    }).then(() => {
      this.writeToFile(json);
    })

  }



  writeToFile(json: string) {
    // console.log('Backup JSON: ', json);
    let date = new Date;
    const filename = date.toString().slice(4, 24).replace(/[\s:]/g, '_')
    console.log('FILENAME: ', filename);

    this.file.writeFile(
      `${this.file.externalDataDirectory}`,
      `BDG_${filename}.txt`,
      `${json}`
    ).then(res => {
      console.log('Write Success: ', res);
      this.toastBackupSuccess(res.nativeURL)
    }).catch(err => {
      console.log('Write Fail: ', err);

    })

    return filename;
  }

  async toastBackupSuccess(filename) {
    const toast = await this.toastCtrl.create({
      message: `All data backed up to: ${filename}`,
      duration: 2000
    });
    toast.present();
  }

  async alertConfirmBackup() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Backup',
      message:
        `Are you sure you want to generate a new backup file?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Restore Cancelled');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.backup();
          }
        }
      ]
    });

    await alert.present();
  }

  //#endregion




  //#region RESTORE
  clear;
  overwrite;

  chooseFile(clear, overwrite) {
    //init restore options first
    this.clear = clear;
    this.overwrite = overwrite;

    this.chooser.getFile('text/plain')
      .then((value: ChooserResult) => {
        //remove data:text tags, get only btoa-encoded base64, with regex
        let raw = value.dataURI.match(/\w*$/);

        //decode base64 uri
        const decodedStr = atob(raw[0]);
        console.log('File Value: ', decodedStr);

        try {
          const jsonObj = JSON.parse(decodedStr);
          if (this.validateFile(jsonObj)) {
            this.alertConfirmRestore(jsonObj);
          } else {
            this.alertInvalidFile();
          }
        } catch {
          this.alertInvalidFile();
        }

      },
        (err) => {
          console.log('Error Reading File: ', err);
        })
  }

  restore(jsonObj) {
    console.log('RESTORING');

    console.log('Restore Options:');
    console.log('Clear All Data: ', this.clear);
    console.log('Overwrite Data (Keep): ', this.overwrite);


    if (this.clear) {

      this.storage.clear().then(() => {
        console.log('Database Cleared');

        for (let key in jsonObj) {
          console.log('SET: ', key, jsonObj[key]);
          this.storage.set(key, jsonObj[key]);
        }
      })

    } else {
      //else, keep is chosen

      if (this.overwrite) {

        for (let key in jsonObj) {

          if (key.match(/^DAY_/g)) {

            console.log('SET: ', key, jsonObj[key]);
            this.storage.set(key, jsonObj[key]);

          }
        }

      } else {
        //if not, then skip existing data

        for (let key in jsonObj) {

          if (key.match(/^DAY_/g)) {

            this.storage.get(key).then(res => {
              //if exists, then ignore
              console.log('SKIP: ', res);

            }).catch(() => {
              //if no value, then write
              console.log('SET: ', key, jsonObj[key]);

              this.storage.set(key, jsonObj[key]);
            })

          }

        }
      }

    }


    this.toastRestoreSuccess();
  }

  async alertConfirmRestore(jsonObj) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Restore',
      message:
        `Are you sure you want to restore from the file?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Restore Cancelled');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.restore(jsonObj);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertInvalidFile() {
    const alert = await this.alertCtrl.create({
      header: 'File Invalid',
      message:
        `The selected file is not a valid backup file.<br><br>
      Please select a valid file and try again.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  validateFile(jsonObj): boolean {
    console.log('Validate: ', jsonObj);

    let isValid = false;

    if (
      jsonObj.TEMPLATES != null &&
      jsonObj.PREFERS_DARK != null &&
      jsonObj.SHOW_TUTORIAL != null
    ) {
      isValid = true;
    }

    return isValid;
  }

  async toastRestoreSuccess() {
    const toast = await this.toastCtrl.create({
      message: `All data restored successfully.`,
      duration: 2000
    });
    toast.present();
  }

  //#endregion


  listDir() {
    this.file.listDir(
      `${this.file.externalDataDirectory}`,
      ``
    ).then(res => {
      console.log('Dir Contents: ', res);
    })
  }
}
