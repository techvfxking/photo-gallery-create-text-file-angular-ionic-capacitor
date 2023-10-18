import { Component } from '@angular/core';
import { Filesystem, Encoding } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  parentPath = 'file:///storage/emulated/0/';
  constructor(private alertController: AlertController) {}

  public async AddFolder() {
    try {
      await Filesystem.writeFile({
        path: `${this.parentPath}'IonicFolder/IonicData.txt'`,
        data: 'This is a test',
        encoding: Encoding.UTF8,
      });
    } catch (error:any) {

      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'An Error Occured',
        message: error,
        buttons: ['OK'],
      });

      await alert.present();

      await Filesystem.mkdir({
        path: `${this.parentPath}'IonicFolder`,
        recursive: false,
      });

      await Filesystem.writeFile({
        path: `${this.parentPath}'IonicFolder/IonicData.txt'`,
        data: 'This is a test',
        encoding: Encoding.UTF8,
      });

       const alert2 = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Success',
        message: 'Successfull',
        buttons: ['OK'],
      });

      await alert2.present();
    }
  }
}
