import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { App } from '../../providers/app/app';
import {SqlLite} from "../../providers/sql-lite/sql-lite";
import {HttpClient} from '../../providers/http-client/http-client';

import {DataElementGroupsSetPage} from '../data-element-groups-set/data-element-groups-set';


/*
 Generated class for the SetupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/setup/setup.html',
  providers: [App,SqlLite,HttpClient]
})
export class SetupPage {

  private data : any = {};
  private loadingData: boolean;
  private loadingMessages : any = [];

  constructor(private httpClient: HttpClient,private app : App,private sqlLite: SqlLite,private navCtrl: NavController,private toastCtrl: ToastController) {
    this.loadingData = false;
    this.data.setUpTitle = "Prayer App 1.0";
    this.data.setUpShortDescription = "It's just simple setup page";
    //this.data.logoUrl = 'img/prayer.jpg';
    this.app.getCurrentUser().then(user=>{
      console.log(user);
      this.reAuthenticateUser(user);
    })
  }

  reAuthenticateUser(user){
    if(user.hasData){
      this.navCtrl.setRoot(DataElementGroupsSetPage);
    }else if(user.serverUrl){
      this.data.serverUrl = user.serverUrl;
      if(user.username){
        this.data.username = user.username;
      }
    }
  }

  loginToServer(){
    this.data.hasData = false;
    if(this.data.serverUrl){
      this.app.getFormattedBaseUrl(this.data.serverUrl)
        .then(formattedBaseUrl =>{
          this.data.serverUrl = formattedBaseUrl;
          if(!this.data.username){
            this.setToasterMessage('Please Enter username');
          }else if (!this.data.password){
            this.setToasterMessage('Please Enter password');
          }else{
            this.loadingData = true;
            this.loadingMessages = [];
            this.app.getDataBaseName(this.data.serverUrl).then(databaseName=>{
              //generate tables
              this.setLoadingMessages('Opening database');
              this.sqlLite.generateTables(databaseName).then(()=>{
                this.data.currentDataBase = databaseName;
                this.setLoadingMessages('Authenticating user');
                let fields = "fields=[:all],userCredentials[userRoles[name,programs[id,name]]";
                this.httpClient.get('/api/me.json?'+fields,this.data).subscribe(userData=>{
                  this.downLoadDataElementGroupSets();
                },error=>{
                  this.loadingData = false;
                  this.setStickToasterMessage('Fail to login Fail to load System information, please checking your network connection');
                  console.log(error);
                })
              },error=>{
                //error on create database
                this.loadingData = false;
                this.setStickToasterMessage('Fail to open database');
                console.log(error);
              });
            });

          }
        });
    }else{
      this.setToasterMessage('Please Enter server url');
    }
  }

  downLoadDataElementGroupSets(){
    this.setLoadingMessages('Downloading data element group sets');
    let resource = 'dataElementGroupSets';
    let tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
    let fields = tableMetadata.fields;

    this.httpClient.get('/api/'+resource+'.json?paging=false&fields='+fields,this.data).subscribe(
      data => {
        let responseData = data.json();
        this.setLoadingMessages('Starting saving '+responseData[resource].length+' data element group sets');
        this.app.saveMetadata(resource,responseData[resource],this.data.currentDataBase).then(()=>{
          this.downLoadDataElementGroups();
        },error=>{
          this.loadingData = false;
          this.setStickToasterMessage('Fail to save data element group sets :: ' + JSON.stringify(error));
        });
      },
      error => {
        this.loadingData = false;
        this.setStickToasterMessage('Fail to login Fail to downloading data element group sets');
        console.log(error);
      }
    );
  }

  downLoadDataElementGroups(){
    this.setLoadingMessages('Downloading data element groups');
    let resource = 'dataElementGroups';
    let tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
    let fields = tableMetadata.fields;

    this.httpClient.get('/api/'+resource+'.json?paging=false&fields='+fields,this.data).subscribe(
      data => {
        let responseData = data.json();
        this.setLoadingMessages('Starting saving '+responseData[resource].length+' data element groups');
        this.app.saveMetadata(resource,responseData[resource],this.data.currentDataBase).then(()=>{
          this.downLoadDataElements();
        },error=>{
          this.loadingData = false;
          this.setStickToasterMessage('Fail to save data element groups :: ' + JSON.stringify(error));
        });
      },
      error => {
        this.loadingData = false;
        this.setStickToasterMessage('Fail to login Fail to data element groups');
        console.log(error);
      }
    );
  }

  downLoadDataElements(){
    this.setLoadingMessages('Downloading  data elements');
    let resource = 'dataElements';
    let tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
    let fields = tableMetadata.fields;

    this.httpClient.get('/api/'+resource+'.json?paging=false&fields='+fields,this.data).subscribe(
      data => {
        let responseData = data.json();
        this.setLoadingMessages('Starting saving '+responseData[resource].length+' data elements');
        this.app.saveMetadata(resource,responseData[resource],this.data.currentDataBase).then(()=>{
          this.data.hasData = true;
          this.app.setCurrentUser(this.data).then(user=>{
            this.navCtrl.setRoot(DataElementGroupsSetPage);
          })
        },error=>{
          this.loadingData = false;
          this.setStickToasterMessage('Fail to save data elements :: ' + JSON.stringify(error));
        });
      },
      error => {
        this.loadingData = false;
        this.setStickToasterMessage('Fail to login Fail to downloading data elements');
        console.log(error);
      }
    );
  }

  setLoadingMessages(message){
    this.loadingMessages.push(message);
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
