import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  public onSubmit() {
    console.log('--- submit clicked');
  }

  private initForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        '',
        Validators.compose([Validators.email, Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

}
