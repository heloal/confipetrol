import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nrodoc : string = "";
  userData = {"nrodoc": ""};
  toast: any;
  result:  any;

  constructor(
    private route: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public fichaService: FichaService
  ) { }

  signin(){
    this.fichaService.loginData(this.userData.nrodoc).subscribe((data:any) =>{
      //this.result = data;
      if (data.resultado===1) {
        this.loadingCtrl.create({
            duration: 2000
            }).then((res)=>{
              res.present();      
              res.onDidDismiss().then((dis)=>{
                localStorage.setItem('userData', JSON.stringify(data.detail)); 
                this.navCtrl.navigateRoot('/tabs')
                console.log(data);
                //this.route.navigate(['/home']);
              })
            })
      }else if(this.userData.nrodoc == ""){
          this.toast = this.toastCtrl.create({
            message: 'Ingrese numero de documento',
            duration: 2000,
            position: 'top',
            
          }).then((toastData)=>{
            console.log(toastData);
            toastData.present();
          });
        }
      else{
        this.toast = this.toastCtrl.create({
              message: 'El usuario no se encuentra registrado',
              duration: 2000,
              position: 'top',
            }).then((toastData)=>{
              console.log(toastData);
              toastData.present();
              console.log(this.result);
    
            })
      }
    })
  }

  openRegister(){
    this.route.navigate(['/register'])
  }

  ngOnInit() {
  }

}
