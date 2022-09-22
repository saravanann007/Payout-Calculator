import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Summary } from '../model/payout-summary';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

  public submitPayOut(expenseArray:FormArray):Observable<Summary>{

    let expenses= expenseArray.controls.map((expenseForm)=>{return expenseForm.value;});

     return this.http.post<Summary>("http://localhost:3000/payouts",{expenses});
  }

}
