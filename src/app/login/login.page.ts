import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public aEmail:string;
  public aPassword:string;
  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, public toastController: ToastController) {

  }

  ngOnInit() {
    console.log("estou no ngOnInit");
    
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value){
    console.log("estou no loginUser");
    console.log(value);
    this.authService.loginUser(value)
    .then(res => {
      console.log('resposta', res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/dashboard');
    }, err => {
      this.errorMessage = err.message;
      console.log('erro', this.errorMessage);
      this.informative();
      this.aPassword = '';
      this.aEmail = '';
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/audio');
    // this.navCtrl.navigateForward('/register');
  }

  goToForgotPage(){
    this.navCtrl.navigateForward('/forgot');
  }

  async informative() {
    const toast = await this.toastController.create({
      message: 'Email ou senha incorreta',
      position: 'middle',
      buttons: [
        {
          text: 'TENTAR NOVAMENTE',
          role: 'cancel',
          cssClass: 'porra',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
