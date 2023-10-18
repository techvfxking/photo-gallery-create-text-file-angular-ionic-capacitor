import { Component } from '@angular/core';
import { Filesystem, Encoding, Directory } from '@capacitor/filesystem';
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
      let wrf1 = await Filesystem.writeFile({
        path: `IonicFolder/IonicData.txt`,
        data: 'This is a test',
        encoding: Encoding.UTF8,
        directory: Directory.Documents
      });
    } catch (error: any) {

      console.log(error.error);

      let mkdir = await Filesystem.mkdir({
        path: `IonicFolder`,
        recursive: false,
        directory: Directory.Documents
      });

      let wrF = await Filesystem.writeFile({
        path: `${this.parentPath}'IonicFolder/IonicData.txt`,
        data: 'This is a test',
        encoding: Encoding.UTF8,
        directory: Directory.Documents
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
