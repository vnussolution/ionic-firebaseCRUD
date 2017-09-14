import { IItem } from './../../models/interfaces';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  itemRef: FirebaseListObservable<IItem[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private firebaseDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.itemRef = this.firebaseDB.list('shopping-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  gotoAddShopping() {
    this.navCtrl.push('AddShoppingPage');
  }

  actionSheet(item: IItem) {
    this.actionSheetCtrl.create({
      title: `title:${item.name}`,
      subTitle: ` subtitle: :)`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log(' actionSheet: item: ', item);
            this.navCtrl.push('AddShoppingPage', { test: 'test', key: item.$key })
          }
        },
        {
          text: 'Delete',
          role: 'desctructive',
          handler: () => { this.itemRef.remove(item.$key) }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('cancelling....') }
        }
      ]

    }).present();

  }
}
