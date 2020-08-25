import { Injectable } from '@angular/core'
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CuentaService } from '../../nucleo/servicios/remotos/cuenta.service';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class CuentaRepository {

    constructor(
        private cuentaService: CuentaService,
        private localStorage:LocalStorage
    ) { }
        iniciarSesion(datos:Object): Observable<any> {
        return this.cuentaService.iniciarSesion(datos)
            .pipe(
                map(data => {
                    return data.respuesta;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
    guardarTokenAutenticacion(token:string){
        this.localStorage.guardarTokenAutenticacion(token)
    }
    guardarTokenRefresh(token:string){
        this.localStorage.guardarTokenRefresh(token)
    }
    //GUARDA EL TIPO LA LISTA DE PERFILES DEL CATALOGO JUNTO A LOS PERFILES QUE TIENE EL USUARIO
    almacenarCatalogoPerfiles(tipoPerfiesUser:CatalogoTipoPerfilModel[]){
        this.localStorage.almacenarCatalogoPerfiles(tipoPerfiesUser)
    }
    obtenerTipoPerfiles():Array<CatalogoTipoPerfilModel>{
       return this.localStorage.obtenerCatalogoPerfiles()
    }
}