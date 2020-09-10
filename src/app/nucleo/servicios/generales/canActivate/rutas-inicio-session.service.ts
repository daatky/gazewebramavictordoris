import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LocalStorage } from "../../locales/local-storage.service";
import { CuentaNegocio } from "../../../../dominio/logica-negocio/cuenta.negocio";
import { RutasLocales } from "../../../../rutas-locales.enum";


/*
    Verifica que la vista pueda ser visualizar, si el usuario ya inicio session
*/
@Injectable()
export class RutasInicioSession implements CanActivate {
    //candeactivate CUANDO ANTES DE SALIR DE UN FORMULARIO PRESENTA UN DIALOGO DE SI QUIERE ABANDONAR LA PAGINA
    //resolve obtiene los datos de un api antes de que se muestre la vista y en caso de presentarse un error no permitir que navege a la nueva ruta
    constructor(
        private cuentaNegocio: CuentaNegocio,
        private router: Router) { };

    canActivate() {
        if (this.cuentaNegocio.sesionIniciada()) {
            this.router.navigateByUrl(RutasLocales.MENU_SELECCION_PERFILES);
            return false;
        } else {
            return true;
        }
    }
}