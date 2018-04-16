import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent implements OnInit {

  public dateStart: NgbDateStruct;
  public dateEnd: NgbDateStruct;

  constructor() { }

  ngOnInit() {
    // Set datepickers to todays date to default
    const today = new Date();

    this.dateStart = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }

    this.dateEnd = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    }

  }

  /**
   * When a datepicker is changed
   * @param dateType
   * @param date
   */
  public dateChange(dateType: 'dateStart' | 'dateEnd', date: NgbDateStruct) {

    if (dateType === 'dateStart') {
      this.dateStart = date;
    } else if (dateType === 'dateEnd'){
      this.dateEnd = date;
    }

  }

}
