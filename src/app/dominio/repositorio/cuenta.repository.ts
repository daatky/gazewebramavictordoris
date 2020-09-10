import { SessionStorageServicie } from './../../nucleo/servicios/locales/session-storage.service';
import { UsuarioModel } from './../modelo/usuario.model';
import { CuentaServiceLocal } from './../../nucleo/servicios/locales/cuenta.service';
import { Injectable } from '@angular/core'
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CuentaServiceRemoto } from '../../nucleo/servicios/remotos/cuenta.service';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { PagoEntity } from '../entidades/pago.entity';
import { PagoModel } from '../modelo/pago.model';
import { TokenModel } from "../modelo/token.model";
import { IniciarSesionModel } from "../modelo/iniciar-sesion.model";
import { IniciarSesionMapperService } from '../entidades/iniciar-sesion.entity';
import { UsuarioEntity } from '../entidades/usuario.entity';
@Injectable({
    providedIn: 'root'
})
export class CuentaRepository {


    constructor(
        private localStorage: LocalStorage,
        private cuentaServiceRemoto: CuentaServiceRemoto,
        private cuentaServiceLocal: CuentaServiceLocal,
        private iniciarSesionMapperService: IniciarSesionMapperService
    ) {

    }

    iniciarSesion(datos: Object): Observable<IniciarSesionModel> {
        return this.cuentaServiceRemoto.iniciarSesion(datos)
            .pipe(
                map(data => {
                    return this.iniciarSesionMapperService.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
    guardarTokenAutenticacion(token: string) {
        this.localStorage.guardarTokenAutenticacion(token)
    }
    obtenerTokenRefresh(): string {
        return this.localStorage.obtenerTokenRefresh();
    }
    obtenerTokenAutenticacion(): string {
        return this.localStorage.obtenerTokenAutenticacion();
    }

    guardarTokenRefresh(token: string) {
        this.localStorage.guardarTokenRefresh(token)
    }

    //GUARDA EL TIPO LA LISTA DE PERFILES DEL CATALOGO JUNTO A LOS PERFILES QUE TIENE EL USUARIO
    almacenarCatalogoPerfiles(tipoPerfiesUser: CatalogoTipoPerfilModel[]) {
        this.localStorage.almacenarCatalogoPerfiles(tipoPerfiesUser)
    }
    obtenerTipoPerfiles(): Array<CatalogoTipoPerfilModel> {
        return this.localStorage.obtenerCatalogoPerfiles()
    }

    crearCuenta(usuario: UsuarioEntity): Observable<PagoEntity> {
        return this.cuentaServiceRemoto.crearCuenta(usuario)
            .pipe(
                map(data => {
                    return data.respuesta.datos as PagoModel;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    activarCuenta(data: any): Observable<IniciarSesionModel> {
        return this.cuentaServiceRemoto.activarCuenta(data)
            .pipe(
                map(data => {
                    return this.iniciarSesionMapperService.transform(data.respuesta.datos);
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    refrescarToken(tokenRefrescar: string): Observable<TokenModel> {
        return this.cuentaServiceRemoto.refrescarToken(tokenRefrescar)
            .pipe(
                map(data => {
                    return data.respuesta.datos as TokenModel;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    // Guardar usuario en el local storage
    guardarUsuarioEnLocalStorage(usuario: UsuarioModel) {
        this.cuentaServiceLocal.guardarUsuarioEnLocalStorage(usuario)
    }

    // Obtener usuario del local storage
    obtenerUsuarioDelLocalStorage(): UsuarioModel {
        return this.cuentaServiceLocal.obtenerUsuarioDelLocalStorage()
    }

    // Guardar usuario en el session storage
    guardarUsuarioEnSessionStorage(usuario: UsuarioModel) {
        this.cuentaServiceLocal.guardarUsuarioEnSessionStorage(usuario)
    }

    // Obtener usuario del session storage
    obtenerUsuarioDelSessionStorage(): UsuarioModel {
        return this.cuentaServiceLocal.obtenerUsuarioDelnSessionStorage()
    }

    validarEmailUnico(email: string): Observable<string> {
        return this.cuentaServiceRemoto.validarEmailUnico(email)
            .pipe(
                map(data => {
                    return data.respuesta.datos
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
}