import { Component } from '@angular/core';
import { NavController,ToastController,NavParams ,ViewController,PopoverController} from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

import {DataElementPage} from '../data-element/data-element';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="updateData()">Update</button>
      <button ion-item (click)="logOut()">Log out</button>
    </ion-list>
  `
})

class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  updateData() {
    alert('Read to update data');
    this.viewCtrl.dismiss();
  }
  logOut(){
    alert('Ready to log out');
    this.viewCtrl.dismiss();
  }
}

/*
  Generated class for the DataElementListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/data-element-list/data-element-list.html',
  providers: [App,HttpClient,SqlLite]
})
export class DataElementListPage {

  private resource : string = "dataElements";
  private currentUser :any = {};
  private metaData : any [];
  private groupName : string;
  private dataElementsId : Array<any>;

  constructor(private popoverCtrl: PopoverController,private params: NavParams,private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.groupName = this.params.get('groupName');
    this.dataElementsId = this.params.get('dataElementsId');
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.loadingMetaData();
    })
  }


  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  loadingMetaData(){
    let databaseName = this.currentUser.currentDataBase;
    this.sqlLite.getDataFromTableByAttributes(this.resource,'id',this.dataElementsId,databaseName).then(data=>{
      this.setMetadata(data);
    },error=>{
      this.setToasterMessage('Fail to load data from local storage' );
    })
  }

  setMetadata(data){
    this.metaData = data;
  }

  goToSelectedDataElement(dataElement){
    let parameters = {
      dataElement : dataElement
    };
    this.navCtrl.push(DataElementPage,parameters);
  }

  setToasterMessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  setStickToasterMessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton : true
    });
    toast.present();
  }

}
