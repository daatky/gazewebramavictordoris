import { UsuarioModel } from './../modelo/usuario.model';
import { CuentaServiceLocal } from './../../nucleo/servicios/locales/cuenta.service';
import { Injectable } from '@angular/core'
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CuentaServiceRemoto } from '../../nucleo/servicios/remotos/cuenta.service';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class CuentaRepository {

    constructor(
        private cuentaServiceRemoto: CuentaServiceRemoto,
        private cuentaServiceLocal: CuentaServiceLocal,
        private localStorage:LocalStorage
    ) {

    }
    
    iniciarSesion(datos:Object): Observable<any> {
        return this.cuentaServiceRemoto.iniciarSesion(datos)
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
    almacenarCatalogoPerfiles(tipoPerfiesUser: CatalogoTipoPerfilModel[]){
        this.localStorage.almacenarCatalogoPerfiles(tipoPerfiesUser)
    }

    obtenerTipoPerfiles():Array<CatalogoTipoPerfilModel>{
       return this.localStorage.obtenerCatalogoPerfiles()
    }

    // Guardar usuario en el local storage
    guardarUsuarioEnLocalStorage(usuario: UsuarioModel) {
        this.cuentaServiceLocal.guardarUsuario(usuario)
    }

    // Obtener usuario del local storage
    obtenerUsuarioDelLocalStorage() : UsuarioModel {
        return this.cuentaServiceLocal.obtenerUsuario()
    }
}