import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WeightsService {

  private socket;

  public weight$ = new Rx.BehaviorSubject(0);
  public todayWeights$ = new Rx.BehaviorSubject([]);
  public dateWeights$ = new Rx.BehaviorSubject([]);
  public plate$ = new Rx.BehaviorSubject('');

  constructor() {

    this.socket = io('141.98.250.60:4147', { transports: ['websocket'], upgrade: false });

    this.socket.on('connectStatus', function (data) {
      console.log(data);
    });

    this.socket.emit('join', 'connected');

    //this.socket.on('stream', (data) => {
    //  console.log(data);
    //});

    this.socket.on('weight', (data) => {
      this.weight$.next(data);
    });

    this.socket.on('plate', (data) => {
      this.plate$.next(data);
    });

    this.socket.on('tableupdate', (data) => {
      this.todayWeights$.next(data);
    });

    this.socket.on('updatebydate', (data) => {
      this.dateWeights$.next(data);
    });

  }

  getWeight() {
    return this.weight$;
  }

  getPlate() {
    return this.plate$;
  }

  getTodayWeights() {
    return this.todayWeights$;
  }

  getDateWeights() {
    return this.dateWeights$;
  }

  public updateByDate(date) {
    this.socket.emit('dateinput', date);
  }

}
