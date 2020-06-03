import { Component } from '@angular/core';
import { FichaService } from '../services/ficha.service';
import { Users } from '../models/users.models';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public user
  public usuario

  constructor(private fichaService: FichaService,) {
    this.user=this.fichaService.getUsuarioLogeado();
    
  }

 

}
