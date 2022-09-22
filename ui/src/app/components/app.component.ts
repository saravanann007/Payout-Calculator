import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Summary } from '../model/payout-summary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  expenseList!: FormGroup;
  expenseArray!: FormArray<FormGroup>;
  isPayoutReady: boolean;
  payOutSummary: Summary;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private expService: ExpenseService) {

  }

  ngOnInit() {
    this.intializeForm();
  }

  intializeForm(): void {
    this.expenseArray = this.formBuilder.array([this.createExpense()]);
    this.expenseList = this.formBuilder.group({ expenses: this.expenseArray });
  }
  createExpense(): FormGroup<{ name: FormControl<string | null>; amount: FormControl<number | null>; }> {
    return this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, Validators.required]
    });
  }

  addExpense(): void {
    this.expenseArray.push(this.createExpense());
  }

  removeExpense(index: number) {
    this.expenseArray.removeAt(index);
  }

  navigateToExpense(): void {
    this.isPayoutReady = false;
  }

  startNewExpenses(): void {
    this.intializeForm();
    this.navigateToExpense();
  }

  submitExpense(): void {

    if (this.expenseArray.length > 1) {
      this.expService.submitPayOut(this.expenseArray).subscribe({
        next: payOutSummary => {
          this.clearErrorMessage();
          this.isPayoutReady = true;
          this.payOutSummary = payOutSummary;
        },
        error: error => {
          this.showError(`System Error Occurred.Please try again`);
        }
      });
    }
    else {
      this.showError(`Please add more than one expenses`)
    }

  }

  showError(message: string): void {
    this.errorMessage = message;
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

}
