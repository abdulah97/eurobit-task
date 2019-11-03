import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { BudgetService } from '../core/budget/service/budget.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetRequest } from '../core/budget/model/budget-request';
import {CustomDateFormat} from '../core/custom-date-format';
import { TransactionRequest } from '../core/transaction/model/transaction-request';
import { TransactionService } from '../core/transaction/service/transaction.service';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  selectedBudgetId: any;
  transactionForm: FormGroup;
  minEndDate: Date = new Date();
  budgetForm: FormGroup;
  localData: any;
  configSucces: MatSnackBarConfig = {
    panelClass: ['snackbar'],    
  };
  constructor(private snackBar: MatSnackBar, 
    private budgetService: BudgetService,
    private dialog: MatDialog,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.initForms();
    this.initBudgets();
  }
  
  initForms(){
    this.budgetForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), this.noWhitespaceValidator]),
      amount: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      date_from: new FormControl('', [Validators.required]),
      date_to: new FormControl ('', [Validators.required])
    })
    this.transactionForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), this.noWhitespaceValidator]),
      type: new FormControl ('', [])
    })
  }
  
  initBudgets(){
    this.budgetService.fetchBudgets().subscribe(
      (data: any) => {
        this.localData = data;
      },
      (err) => {
        console.error(JSON.stringify(err));
      },
      () => {
        
      }
    );
  }
  addBudget(budgetFormValue){
    const budget: BudgetRequest = {
      name: budgetFormValue.name,
      amount: budgetFormValue.amount,
      date_from: budgetFormValue.date_from === '' || budgetFormValue.date_from === null ||
      budgetFormValue.date_from === undefined ? null : CustomDateFormat.CustomDateFormat(budgetFormValue.date_from.toLocaleDateString('en-US')),
      date_to: budgetFormValue.date_to === '' || budgetFormValue.date_to === null ||
      budgetFormValue.date_to === undefined ? null : CustomDateFormat.CustomDateFormat(budgetFormValue.date_to.toLocaleDateString('en-US'))
    }
    this.budgetService.createBudget(budget).subscribe(
      (data: any) => {
        this.localData = data;
      },
      (err) => {
        console.error(JSON.stringify(err));
      },
      () => {
        this.dialog.closeAll();
        this.initBudgets();
        this.openSnackBar('Budget added successfully!', 'Close');
      }
    );
  }
  addTransaction(transactionFormValue){
    const transaction: TransactionRequest = {
      amount: transactionFormValue.amount,
      description: transactionFormValue.description,
      budget: this.selectedBudgetId,
      type: transactionFormValue.type
    }
    this.transactionService.createTransaction(transaction).subscribe(
      (data: any) => {
        this.localData = data;
      },
      (err) => {
        console.error(JSON.stringify(err));
      },
      () => {
        this.dialog.closeAll();
        this.initBudgets();
        this.openSnackBar('Transaction created successfully!', 'Close')
      }
    );
  }

  setSelectedBudget(id){
    this.selectedBudgetId = id;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'snackbar',
    });
  }
  
  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
        width: '350px',
        panelClass: 'modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.budgetForm.reset();
    });
  }

  onCancelModal(){
    this.dialog.closeAll();
    this.budgetForm.reset();
  }

  startDateSelected(startDate) {
    this.minEndDate = startDate.value;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
