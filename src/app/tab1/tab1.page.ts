import { Component, OnInit } from '@angular/core';
import { FichaService } from '../services/ficha.service';
import { Pregunta } from '../models/pregunta';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  respuestas={puesto:null,idUsuario:null,idServicio:null,data:[]}
  declaracion =[];
  Preguntas:[]
  public Servicio:[]
  public paccion:number=0;
  public ficha;
  preg:Pregunta
  public user
  public seccion_preg1={title:null,detail:[],id:null}
  public seccion_preg2={title:null,detail:[],id:null}
  public seccion_preg3={title:null,detail:[],id:null}
  public seccion_preg4={title:null,detail:[],id:null}
  public puesto:string=null
  public idServicio:number=null
  constructor( private fichaService: FichaService,) {
    this.user=this.fichaService.getUsuarioLogeado()
  }

  ngOnInit() {
    this.getPreguntas()
    this.getDeclaracion()
    this.getServicio()
  }

  ira(accion){
    this.paccion=accion
  }

  getDeclaracion(){
    return this.fichaService.getDeclaracion().subscribe((resp:any)=>{
    this.declaracion=resp;     
    },e=>{
      console.log(e)
    })
  }

  getPreguntas(){
    return this.fichaService.getPreguntas().subscribe((resp:any)=>{
    this.Preguntas=resp
 
    for (let i = 0; i < resp.length; i++) {
      if (i==0) {
         this.seccion_preg1.title=resp[i].name
         this.seccion_preg1.id=resp[i].id
        
         resp[i].detail.forEach(e => {
        let pre=new Pregunta;
        pre.name=e.pregunta
        pre.preg_id=e.id
        pre.resp="0"
        pre.aclara=""
          this.seccion_preg1.detail.push(pre)
    });
      }
      if (i==1) {
        this.seccion_preg2.title=resp[i].name
        this.seccion_preg2.id=resp[i].id
        resp[i].detail.forEach(e => {
          let pre=new Pregunta;
          pre.name=e.pregunta
          pre.preg_id=e.id
          pre.resp="0"
          pre.aclara=""
            this.seccion_preg2.detail.push(pre)
      });
     }
     if (i==2) {
      this.seccion_preg3.title=resp[i].name
      this.seccion_preg3.id=resp[i].id
      resp[i].detail.forEach(e => {
        let pre=new Pregunta;
        pre.name=e.pregunta
        pre.preg_id=e.id
        pre.resp="0"
        pre.aclara=""
          this.seccion_preg3.detail.push(pre)
    });
   }

   if (i==3) {
    this.seccion_preg4.title=resp[i].name
    this.seccion_preg4.id=resp[i].id
    resp[i].detail.forEach(e => {
      let pre=new Pregunta;
      pre.name=e.pregunta
      pre.preg_id=e.id
      pre.resp="0"
      pre.aclara=""
        this.seccion_preg3.detail.push(pre)
  });
 }
      
    }
    

    },e=>{
      console.log(e)
    })
  }

  onSelected(obj){
  obj.aclara=""
  }

  puestoSelected(e){
  this.idServicio=e.detail.value
  }

  registrarFicha(){
    let data={
      "idUsuario":this.user.idUsuario,
      "puesto":this.puesto,
      "idServicio":this.idServicio,
      "preguntas":(this.seccion_preg1.detail).concat(this.seccion_preg2.detail).concat(this.seccion_preg3.detail)
    }
    this.fichaService.registroFicha(data).subscribe((resp:any)=>{
    console.log(resp)
    })

  }

  getServicio(){
    return this.fichaService.getServicio().subscribe((resp:any)=>{
      this.Servicio=resp  
      },e=>{
        console.log(e)
      })
  }

}
