import { CanActivateChild, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LocalStorage } from "../../locales/local-storage.service";

@Injectable()
export class RestriccionRutasHijas implements CanActivateChild {
  constructor(
    private localStorage:LocalStorage,
    private router: Router) { };

  canActivateChild() {  
    if((this.localStorage.obtenerCatalogoPerfiles()!=null)&&(this.localStorage.obtenerCatalogoPerfiles()!=undefined)){  
      return true;            
    }else{      
      this.router.navigateByUrl('');
      return false;  
    }
  }
}