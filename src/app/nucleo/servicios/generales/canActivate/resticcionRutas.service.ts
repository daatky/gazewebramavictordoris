import {CanActivate, Router} from "@angular/router";
import { Injectable } from "@angular/core";

//import { AutenticacionService } from "../login/services/autenticacion.service";
@Injectable()
export class RestriccionRutas implements CanActivate { 
    //candeactivate CUANDO ANTES DE SALIR DE UN FORMULARIO PRESENTA UN DIALOGO DE SI QUIERE ABANDONAR LA PAGINA
  //resolve obtiene los datos de un api antes de que se muestre la vista y en caso de presentarse un error no permitir que navege a la nueva ruta
  constructor(
    //private sessionService:SessionService,
    private router:Router) {}; 

  canActivate() {
    /*if((this.sessionService.getUser()!=null)&&(this.sessionService.getUser()!=undefined)){           
      return true;
    }else{
      this.router.navigateByUrl('/m1/m1v6');      
        return false; 
    }      */
    return false
  }
}