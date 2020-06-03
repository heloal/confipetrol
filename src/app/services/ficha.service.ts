import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Users } from '../models/users.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  loginurl = "https://tarjeta.imc-confipetrol.com/controller/FichaController.php";
   public user;
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public loadingController:LoadingController,
    public route: Router
  ) { }

  getRegister(user: Users){
    return this.http.post<any>(`${this.loginurl}?action=registra_usuario_JSON`,user);
  }
  loginData(nrodoc: string){ 
    return this.http.get(`${this.loginurl}?action=valida_logueoUsuario_JSON&nrodoc=${nrodoc}`);   
  }

  getPase(user:Users){
    return this.http.get(`${this.loginurl}?action=dtlle_fichaGenerada_JSON&idUsuario=${user.idUsuario}`);
  }
 
  registroFicha(data){
    const header=new HttpHeaders()
    .set("Content-Type","application/json")

    return this.http.post(`${this.loginurl}?action=registra_ficha_JSON`,JSON.stringify(data));
  }
  getUsuarioLogeado(){
    let userx:any=null
    if (localStorage.getItem('userData')===null) {
      return false;
    }
    this.user=new Usuario
      userx= JSON.parse(localStorage.getItem('userData'))
      if (userx!=undefined) {
      this.user.direccion=userx.direccion
      this.user.email=userx.email
      this.user.nombres=userx.nombres
      this.user.nrodoc=userx.nrodoc
      this.user.idUsuario=userx.idUsuario
      this.user.nrotelf=userx.nrotelf
      }else{
        this.user=null
      }

    return this.user


  }

  getTipoDocumento() {
    return this.http.get(`${this.loginurl}?action=lst_tipoDocumento_All_JSON`);
  }

  getTipoVisitante(){
    return this.http.get(`${this.loginurl}?action=lst_tipoUsuario_All_JSON`);
  }

  getPreguntas(){
    return this.http.get(`${this.loginurl}?action=lst_seccionesPreguntas_All_JSON`);
  }

  getDeclaracion(){
    return this.http.get(`${this.loginurl}?action=dtlle_terminoCondicion_JSON`);
  }

  getvalidarDni(user:Users){
    return this.http.get(`${this.loginurl}?action=consulta_usuario_xNroDocuento_JSON&nrodoc=${user.nrodoc}`);
  }

 

  registraVisitante(data:Users){
    let x=Object.keys(data).map(k=>{
     return encodeURIComponent(k)+'='+encodeURIComponent(data[k])
   }).join('&')
   return this.http.get(`${this.loginurl}?action=registra_usuario_JSON&${x}`);
  }

  getServicio(){
  return this.http.get(`${this.loginurl}?action=lst_servicios_All_JSON`);
  }

}
