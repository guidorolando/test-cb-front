import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  intervalId = 0;
  seconds = 0;
  @Input()
  public time: number;
  constructor() { 
    this.time = 0;
  }
  ngOnInit() {}
}
