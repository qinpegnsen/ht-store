import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  validateForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.validateForm = this.fb.group({
      epName              : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      sellerAcct          : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      shopCode            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      email               : [ '', [ this.emailValidator ] ],
      phone               : [ '', [ this.phoneValidator ] ],
      password            : [ '', [ Validators.required ] ],
      passwordConfirmation: [ '', [ this.passwordConfirmationValidator ] ],
      isBoss              : [ true ]
    });
  }
  ngOnInit() {

  }
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    console.log(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    })
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true }
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };
  phoneValidator = (control: FormControl): any => {
    const PHONE = /^1[0-9]{10}$/;
    if (!control.value) {
      return { required: true }
    } else if (!PHONE.test(control.value)) {
      return { phone: true, error: true }
    }
  };


}
