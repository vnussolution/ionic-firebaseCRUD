import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { IItem } from './../../models/interfaces';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription'

/**
 * Generated class for the AddShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  itemSubscription: Subscription;
  item = {} as IItem;
  itemsRef: FirebaseListObservable<IItem[]>;
  itemRef: FirebaseObjectObservable<IItem>;
  text: string = '';
  constructor(private firebaseDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingPage');
  }

  addItem(i: IItem): void {
    console.log('add item', i);

    if (this.text === 'add') {
      this.itemsRef.push({
        name: i.name,
        quatity: i.quatity
      }).catch(error => console.log(' ERROR: ', error));
    } else {
      this.itemRef.update(i);//.catch(error => console.log(' update ERROR: ', error));;
    }
    this.item = {} as IItem;
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    let key = this.navParams.get('key');
    if (key) {
      console.log('edit:: ', key);
      this.text = 'edit'
      this.itemRef = this.firebaseDB.object(`shopping-list/${key}`);
      this.itemSubscription = this.itemRef.subscribe(
        data => this.item = data
      );
    } else {
      console.log('add : ');
      this.text = 'add';
      this.itemsRef = this.firebaseDB.list('shopping-list');

    }
  }

  ionViewDidLeave() {
    if (this.text === 'edit') {
      console.log('unsubscribe')
      this.itemSubscription.unsubscribe();
    }
  }
}
