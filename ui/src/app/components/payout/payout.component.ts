import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Summary } from '../../model/payout-summary';

@Component({
  selector: 'payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.less']
})
export class PayoutComponent implements OnInit {

  constructor() { }


  @Output() back = new EventEmitter();
  @Output() reset = new EventEmitter();
  @Input() summary: Summary;


  navigateToExpense() {
    this.back.emit();
  }

  startNewExpenses() {
    this.reset.emit();

  }
  ngOnInit(): void {

  }

}
