import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionService } from '../core/transaction/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  localData: any;

  constructor(private snackBar: MatSnackBar, 
    private dialog: MatDialog,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.initTransactions();
  }

  initTransactions(){
    this.transactionService.fetchTransactions().subscribe(
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
}

