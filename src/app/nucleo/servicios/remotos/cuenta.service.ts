import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { Cuenta } from './rutas/cuenta.enum';
import { UsuarioEntity, UsuarioCrearCuentaEntity } from "../../../dominio/entidades/usuario.entity";
import { PagoEntity } from "../../../dominio/entidades/pago.entity";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CuentaRepository } from 'src/app/dominio/repositorio/cuenta.repository';
import { TokenEntity } from "../../../dominio/entidades/token.entity";
import { IniciarSesionEntity } from "../../../dominio/entidades/cuenta.entity";

@Injectable({ providedIn: 'root' })
export class CuentaService {

    constructor(
        private http: HttpClient
    ) {
    }
    ///

    // OBTENER el catalo
    iniciarSesion(datos: Object): Observable<RespuestaRemota<IniciarSesionEntity>> {
        return this.http.post<RespuestaRemota<IniciarSesionEntity>>(APIGAZE.BASE + Cuenta.INICIAR_SESION.toString(), datos);

    }

    crearCuenta(usuario: UsuarioCrearCuentaEntity): Observable<RespuestaRemota<PagoEntity>> {
        return this.http.post<RespuestaRemota<PagoEntity>>(APIGAZE.BASE + Cuenta.CUENTA, usuario);
    }

    activarCuenta(data: any) {
        return this.http.post<RespuestaRemota<any>>(APIGAZE.BASE + Cuenta.VALIDAR_CUENTA, data);
    }

    refrescarToken(tokenRefrescar: string): Observable<RespuestaRemota<TokenEntity>> {
        return this.http.post<RespuestaRemota<TokenEntity>>(APIGAZE.BASE + Cuenta.REFRESCAR_TOKEN, {
            "tokenRefresh": tokenRefrescar
        })
    }


}