import { Component, OnInit } from '@angular/core';
import { WeightsService } from '../weights.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'RDF Mérleg'
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  day: string;
  dateInput: string;
  weight: number;
  plate: string;
  platePresent = false;
  showToday = true;
  todayWeights = [];
  dateWeights = [];
  audio = new Audio();
  audioPlayed = false;
  state = 'on';
  notified = false;

  constructor(private WeightService: WeightsService, private Title: Title, private _pushNotifications: PushNotificationsService) {
    this._pushNotifications.requestPermission();
  }

  setDocTitle(newPlate: string) {
    if (newPlate.length === 6) {
      setInterval(() => {
        this.Title.setTitle(newPlate + ' a mérlegen!');
        setTimeout(() => {
          this.Title.setTitle('RDF Mérleg');
        }, 1000);
      }, 2000);

      if (!this.audioPlayed) {
        this.audio.play();
        this.audioPlayed = true;
      }
    } else {
      this.Title.setTitle('RDF Mérleg');
      this.audioPlayed = false;
    }

  }

  notify(plate, weight) {
    if (plate.length === 6) {
      let options = {
        body: weight,
        icon: 'assets/merleg.png'
      }
      this._pushNotifications.create(plate, options).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
  }

  speaker() {
    if (this.state === 'on') {
      this.state = 'off';
      this.audio.volume = 0;
    } else {
      this.state = 'on';
      this.audio.volume = 0.3;
    }
  }

  toggleToday() {
    this.showToday = !this.showToday
  }

  submit() {
    this.day = this.dateInput;
    console.log(this.day);
    this.WeightService.updateByDate(this.day);
  }

  ngOnInit() {

    this.audio.src = "assets/horn.wav";
    this.audio.volume = 0.3;
    this.audio.load();

    this.subscription1 = this.WeightService.getWeight().subscribe(weight$ => {
      this.weight = weight$;
      if (weight$ === 0) {
        this.plate = '';
      }
    });

    this.subscription2 = this.WeightService.getPlate().subscribe(plate$ => {
      this.plate = plate$;
      this.setDocTitle(this.plate);
      if (this.plate.length === 6) {
        this.notify(this.plate, this.weight);
        this.notified = true;
      } else {
        this.notified = false;
      }
    });

    this.subscription3 = this.WeightService.getTodayWeights().subscribe(todayWeights$ => {
      this.todayWeights = todayWeights$
    });

    this.subscription4 = this.WeightService.getDateWeights().subscribe(dateWeights$ => {
      this.dateWeights = dateWeights$
    });

  }
}
