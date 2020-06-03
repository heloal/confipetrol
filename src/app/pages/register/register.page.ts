import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.models';
import { FichaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public usuario
  tiposVisitante=[];
  tiposDocumento=[]
  validarDni=[]

  constructor(
    private fichaService: FichaService,
  ) { 
    this.usuario=new Users
  }

  ngOnInit() {
 
  }

  
  registerData()
  {
    this.fichaService.getvalidarDni(this.usuario).subscribe((resp:any)=>{
      console.log(resp)
      if (resp.result==0) {
        this.fichaService.registraVisitante(this.usuario).subscribe((res:any)=>{
          //aqui muestra el mensaje que deseas cuando es 1
          console.log(resp)
          },e=>{
            console.log(e)
        })
      }else{
        //ya existe DNI
        console.log('existe dni')
      }
      },e=>{
        console.log(e)
    })
   
  }


}
