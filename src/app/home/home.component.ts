import { Component, OnInit } from '@angular/core';
import { WeightsService } from '../weights.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  day: String;
  dateInput: String;
  weight: Number;
  showToday = true;
  todayWeights = [];
  dateWeights = [];

  constructor(private WeightService: WeightsService) { }

  toggleToday() {
    this.showToday = !this.showToday
  }

  submit() {
    this.day = this.dateInput;
    console.log(this.day);
    this.WeightService.updateByDate(this.day);
  }

  ngOnInit() {

    this.subscription1 = this.WeightService.getWeight().subscribe(weight$ => {
      this.weight = weight$;
    });

    this.subscription2 = this.WeightService.getTodayWeights().subscribe(todayWeights$ => {
      this.todayWeights = todayWeights$
    });

    this.subscription3 = this.WeightService.getDateWeights().subscribe(dateWeights$ => {
      this.dateWeights = dateWeights$
    });

  }
}
