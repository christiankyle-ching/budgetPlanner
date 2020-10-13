import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { BackupService } from 'src/app/services/backup.service';


@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {

  clearOption = 'clear';
  keepOption = 'overwrite';

  constructor(
    private backupService: BackupService,
    private googleAnalytics: GoogleAnalytics
  ) { }

  ngOnInit() {
    this.googleAnalytics.trackView('Backup & Restore')
  }

  doBackup() {
    this.backupService.alertConfirmBackup();
  }

  restore() {
    const clear = (this.clearOption == 'clear') ? true : false;
    const overwrite = (this.keepOption == 'overwrite') ? true : false;
    this.backupService.chooseFile(clear, overwrite);
  }

}
