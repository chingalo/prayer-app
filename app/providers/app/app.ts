import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {HttpClient} from '../../providers/http-client/http-client';
import {Observable} from 'rxjs/Rx';
import {SqlLite} from "../sql-lite/sql-lite";

/*
 Generated class for the App provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

@Injectable()
export class App {

  private formattedBaseUrl :string;
  private loading : any;
  private localStorage : Storage;

  constructor(private http: Http,private sqlLite:SqlLite) {
    this.localStorage = new Storage(LocalStorage);
  }

  setCurrentUser(user){
    this.localStorage.set('user',JSON.stringify(user));
    return Promise.resolve(user);
  }

  setUserData(userDataResponse){
    let userData ={
      "Name": userDataResponse.name,
      "Employer": userDataResponse.employer,
      "Job Title": userDataResponse.jobTitle,
      "Education": userDataResponse.education,
      "Gender": userDataResponse.gender,
      "Birthday": userDataResponse.birthday,
      "Nationality": userDataResponse.nationality,
      "Interests": userDataResponse.interests,
      "userRoles": userDataResponse.userCredentials.userRoles,
      "organisationUnits": userDataResponse.organisationUnits
    };

    this.localStorage.set('userData',JSON.stringify(userData));

    return Promise.resolve(userData);
  }
  getUserData(){
    return this.localStorage.get('userData');
  }

  getCurrentUser(){
    let self = this;
    return  new Promise(function(resolve,reject){
      self.localStorage.get('user').then(user=>{
        user = JSON.parse(user);
        resolve(user);
      },err=>{
        reject();
      }).catch(err=>{
        reject();
      })

    })
  }

  getFormattedBaseUrl(url){
    this.formattedBaseUrl = "";
    let urlToBeFormatted : string ="",urlArray : any =[],baseUrlString : any;
    if (!(url.split('/')[0] == "https:" || url.split('/')[0] == "http:")) {
      urlToBeFormatted = "http://" + url;
    } else {
      urlToBeFormatted = url;
    }
    baseUrlString = urlToBeFormatted.split('/');
    for(let index in baseUrlString){
      if (baseUrlString[index]) {
        urlArray.push(baseUrlString[index]);
      }
    }
    this.formattedBaseUrl = urlArray[0] + '/';
    for (let i =0; i < urlArray.length; i ++){
      if(i != 0){
        this.formattedBaseUrl = this.formattedBaseUrl + '/' + urlArray[i];
      }
    }
    return Promise.resolve(this.formattedBaseUrl);
  }

  getDataBaseName(url){
    let databaseName = url.replace('://', '_').replace('/', '_').replace('.', '_').replace(':', '_');
    return Promise.resolve(databaseName);
  }

  saveMetadata(resource,resourceValues,databaseName){
    let promises = [];
    let self = this;

    return new Promise(function(resolve, reject) {
      let counter = 1;
      resourceValues.forEach(resourceValue=>{
        promises.push(
          self.sqlLite.insertDataOnTable(resource,resourceValue,databaseName).then(()=>{
            //saving success
          },(error) => {
          })
        );
      });

      Observable.forkJoin(promises).subscribe(() => {
          resolve();
        },
        (error) => {
          reject(error.failure);
        })
    });

  }



}

