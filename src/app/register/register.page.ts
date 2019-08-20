import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';


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

  constructor(private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, public alertController: AlertController) { }

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
    console.log(value);
    
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Termos de uso',
      // subHeader: 'Subtitle',
      message: 'Arcadia Institute LTDA, inscrita no CNPJ sob o n. XX.XXX-XXX/0001-XX, com sede na Rua Alceu Amoroso Lima nº 276-A, Edf. Mondial Office sala 603, Salvador-BA, CEP: 41820-770 e proprietária do app, estabelece as presentes condições de utilização do aplicativo.<br><br>Ao utilizar o aplicativo, você, USUÁRIO, concorda com o presente Termo de Uso, caracterizando, para todos os fins, sua ciência plena, se obrigando a respeitar e cumprir integralmente as condições do presente instrumento. A não observância dos Termos de Uso pode resultar em cancelamento do seu cadastro, sua suspensão ou exclusão, de forma automática. Leia-o atentamente. <br><br>1. Objeto e Considerações Preliminares<br>O Arcadia Institute é um aplicativo de autoterapia e autoajuda online.<br>A Empresa reserva-se o direito de fazer alterações no Aplicativo e em seus Termos, a qualquer momento. Cada vez que você usar o Aplicativo, deverá visitar e rever os Termos de Uso e qualquer uso do Aplicativo, após a alteração, constituirá a sua aceitação de tais mudanças.<br><br>2. Do Registro de Assinantes e do Uso Pessoal<br>Para realizar o registro junto ao Aplicativo você, Usuário, precisará fornecer informações precisas, completas e atualizadas. Quando terminar o processo de registro, você se torna oficialmente um Usuário do Aplicativo.<br>A sua assinatura permite a aquisição e o acesso, temporário, a determinados Conteúdos e Serviços no Aplicativo. A falta de informações precisas, completas e atualizadas, pode acarretar, a critério da Empresa, a exclusão da sua conta do sistema da Empresa, portanto, do seu registro.<br>O Assinante, igualmente, não pode usar a conta (o Registro) de outro Usuário com a intenção de se fazer passar por essa pessoa. Você é o único responsável por toda a atividade em sua conta e pela segurança de seus sistemas de computador.<br><br>3. Idade Mínima e Validade dos Termos de Uso<br>Você deve ter pelo menos dezoito (18) anos de idade para se tornar um Usuário do Aplicativo. Ao se registrar, você declara e garante que tem pelo menos 18 anos de idade, e que tem a capacidade e autoridade para se responsabilizar e cumprir com os termos do presente instrumento.<br>Você certifica que está legalmente autorizado a usar e acessar o Aplicativo, assumindo a responsabilidade total para a seleção e utilização dos Serviços, Produtos, Conteúdos e Informações.<br><br>4. Conduta Online<br>Como Usuário ou Assinante, você concorda que:<br>a. vai usar o Conteúdo de uma maneira consistente com todas e quaisquer leis e regulamentos aplicáveis. O fará também de acordo com a ética, a moral, os princípios que norteiam a boa-fé, e irá considerar especialmente os costumes e práticas, a que a Empresa está vinculada, por sua nacionalidade e sua cultura;<br>b. não vai postar publicamente ou transmitir em privado qualquer Conteúdo, Serviço, Produto ou Informação do site/aplicativo, ou da empresa Código da Mente, mesmo que adquiridos os direitos de uso temporário, sem expressa anuência da Empresa. Mesmo com a autorização, não os poderá divulgar, de forma imprecisa, enganosa ou falsa, especialmente pelo fato de que os produtos, serviços e conteúdos são fornecidos de forma direcionada ao perfil de cada Assinante;<br>c. não irá difamar, abusar, assediar, perseguir, ameaçar ou violar os direitos legais de terceiros;<br>d. não irá se passar por qualquer pessoa ou entidade, incluindo, por exemplo, um empregado da Empresa ou diretor, um líder local, ou declarar falsamente ou deturpar sua afiliação com uma pessoa ou entidade;<br>e. não irá publicar mensagens contendo material impróprio, profano, difamatório, obsceno ou indecente. Isto inclui qualquer conteúdo que infrinja qualquer patente, marca, segredo comercial, direitos autorais ou outros direitos de propriedade de qualquer partido;<br>f. não irá carregar ou enviar arquivos que contenham vírus, arquivos corrompidos, ou qualquer outro software ou programas similares que possam afetar adversamente a operação de outro computador;<br>g. não irá realizar concursos, distribuir mensagens em cadeia, ou realizar "pirâmides" ou esquemas de marketing;<br>h. não irá violar qualquer lei aplicável local, estadual, nacional ou internacional.<br><br>5. Isenção de Responsabilidade Médica e Psicológica<br>Os produtos da Empresa, Serviços, Conteúdos, Informações e afins, disponíveis no Site/Aplicativo, não são uma tentativa de praticar a medicina ou psicologia ou fornecer aconselhamento médico ou psicológico específico. O uso deste Aplicativo não estabelece uma relação clínica médico-paciente. Qualquer informação sobre saúde é fornecida apenas por conveniência. Caso haja qualquer dúvida sobre a sua condição, de usar os serviços do site/aplicativo, consulte previamente o seu médico ou psicólogo.<br><br>6. Direitos de Propriedade Autoral<br>A Empresa Arcadia Insitute detém e mantem os direitos de propriedade do Conteúdo, das Informações, dos Serviços e dos Produtos, do Conteúdo em geral, salvo quando expressamente houver indicação diversa. O material do aplicativo, portanto, está protegido por direitos autorais, marcas registradas e outras informações de propriedade da Empresa Arcadia Institute. Exceto pelas informações de domínio público ou para as quais tenha sido dada autorização, você concorda que não pode copiar, modificar, publicar, transmitir, distribuir, executar, exibir a terceiros, vender, produzir trabalhos derivados, explorar de qualquer maneira, ou mesmo deixar por livre acesso, compartilhar ou manter qualquer informação contida no Aplicativo, ainda que seja dado autorização de uso, pois a mesma é para uso pessoal; portanto, você tem o direito de usar as informações do Aplicativo apenas para seu uso pessoal e não-comercial. <br><br>7. Reclamações e/ou sugestões<br>O Usuário dispõe de um canal de por meio do e-mail: contato@arcadiainsitute.com.br',
      buttons: ['OK']
    });

    await alert.present();
  }

 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }

}
