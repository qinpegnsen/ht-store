import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.validateForm = this.fb.group({
      sellerAcct          : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      shopCode            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      phone               : [ '', [ this.phoneValidator ] ],
      smsCode             : [ '', [ this.samCodeValidator ] ],
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

  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  samCodeValidator = (control: FormControl): any => {
    const SMS = /\d{6}/;
    if (!control.value) {
      return { required: true }
    } else if (!SMS.test(control.value)) {
      return { smsCode: true, error: true }
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
