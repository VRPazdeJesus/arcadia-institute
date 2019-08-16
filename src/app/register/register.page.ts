import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
    'nome' :[
      { type: 'required', message: 'Nome is required.' }
    ],
   'email': [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   'password': [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ],
   'passwordAgain': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ],
   'telefone': [
    { type: 'required', message: 'Telefoen is required.' }
   ],
   'nascimento': [
    { type: 'required', message: 'Nascimento is required.' }
   ]
 };

  constructor(private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      nome: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      passwordAgain: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      telefone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nascimento: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }

}
