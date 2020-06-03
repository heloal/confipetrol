import { Component } from '@angular/core';
import { FichaService } from '../services/ficha.service';
import { Users } from '../models/users.models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public user
  public usuario
  public pase={detail:null}
  estado_pase:number=null
  estado_result:number=null

  constructor(private fichaService: FichaService) {
    this.user=this.fichaService.getUsuarioLogeado()
    this.usuario=new Users
    this.getPase()
  }


  getPase(){
    this.fichaService.getPase(this.user)
    .subscribe((resp:any)=>{
    this.pase=resp
    this.estado_pase=resp.detail.estado
    this.estado_result=resp.result
    console.log(this.estado_result)
    console.log(this.pase)
    
    })
  }

}
