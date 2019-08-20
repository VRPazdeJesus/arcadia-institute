import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ]
 };

  constructor(private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  forgotPassword(value){
    console.log(value);
    
    this.authService.passwordToEmail(value)
     .then(res => {
       console.log(res);
      //  this.errorMessage = "";
      //  this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
      //  this.errorMessage = err.message;
      //  this.successMessage = "";
     })
  }

  goLoginPage(){
    this.navCtrl.navigateBack('');
  }

}
