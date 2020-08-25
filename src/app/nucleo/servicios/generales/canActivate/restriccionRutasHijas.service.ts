import { CanActivateChild, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class RestriccionRutasHijas implements CanActivateChild {
  constructor(
    //private sessionService:SessionService, 
    private router: Router) { };

  canActivateChild() {  
    /*if((this.sessionService.getUser()!=null)&&(this.sessionService.getUser()!=undefined)){  
      return true;            
    }else{      
      this.router.navigateByUrl('/m1/m1v6');
      return false;  
    }*/
    return false
  }
}