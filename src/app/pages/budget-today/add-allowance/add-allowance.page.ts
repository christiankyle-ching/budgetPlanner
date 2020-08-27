import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoWhiteSpaceValidator } from 'src/app/models/no-whitespace.validator';

@Component({
  selector: 'app-add-allowance',
  templateUrl: './add-allowance.page.html',
  styleUrls: ['./add-allowance.page.scss'],
})



export class AddAllowancePage implements OnInit {

  validatorPattern = '[a-zA-Z0-9 ]*';  
  
  //#region FORM
  addAllowanceForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, NoWhiteSpaceValidator.validInput, Validators.pattern(this.validatorPattern)]),
    amount: new FormControl([], [Validators.required, Validators.min(0)])
  });

  errorMessages = {
    'name': [
      {
        type: 'required',
        message: 'Name is required.'
      },
      {
        type: 'validInput',
        message: 'Cannot contain spaces only.'
      },
      {
        type: 'pattern',
        message: 'Only letters and spaces allowed.'
      }
    ],

    'amount': [
      {
        type: 'required',
        message: 'Amount cannot be blank.'
      },
      {
        type: 'min',
        message: 'Amount cannot be less than 0.'
      }
    ]
  }

  get name() {
    return this.addAllowanceForm.get('name');
  }

  get amount() {
    return this.addAllowanceForm.get('amount');
  }

  //#endregion

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  dismiss(added: boolean, pName: string) {
    this.modalCtrl.dismiss({
      addedNewData: added,
      name: pName
    });
  }

  submit() {
    const allowance = {
      name: this.addAllowanceForm.value.name,
      amount: this.addAllowanceForm.value.amount
    }

    //show toast
    this.dismiss(true, allowance.name);
    
    this.dataService.addAllowance(allowance);
    
  }




}
