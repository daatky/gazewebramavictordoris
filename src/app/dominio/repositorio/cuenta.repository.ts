import { Injectable } from '@angular/core'
import { catchError, tap, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { CuentaService } from '../../nucleo/servicios/remotos/cuenta.service';
import { LocalStorage } from 'src/app/nucleo/servicios/locales/local-storage.service';
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';
import { UsuarioCrearCuentaEntity } from '../entidades/usuario.entity';
import { PagoEntity } from '../entidades/pago.entity';
import { PagoModel } from '../modelo/pago.model';
import { TokenModel } from "../modelo/token.model";
@Injectable({
    providedIn: 'root'
})
export class CuentaRepository {


    constructor(
        private cuentaService: CuentaService,
        private localStorage: LocalStorage
    ) { }
    iniciarSesion(datos: Object): Observable<any> {
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

    crearCuenta(usuario: UsuarioCrearCuentaEntity): Observable<PagoEntity> {
        return this.cuentaService.crearCuenta(usuario)
            .pipe(
                map(data => {
                    return data.respuesta.datos as PagoModel;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    activarCuenta(data: any) {
        return this.cuentaService.activarCuenta(data)
            .pipe(
                map(data => {
                    return data.respuesta.datos as PagoModel;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }

    refrescarToken(tokenRefrescar: string): Observable<TokenModel> {
        return this.cuentaService.refrescarToken(tokenRefrescar)
            .pipe(
                map(data => {
                    return data.respuesta.datos as TokenModel;
                }),
                catchError(err => {
                    return throwError(err)
                })
            )
    }
}