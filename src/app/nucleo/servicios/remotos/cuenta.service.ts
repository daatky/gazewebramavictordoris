import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { Cuenta } from './rutas/cuenta.enum';
import { UsuarioEntity } from "../../../dominio/entidades/usuario.entity";

@Injectable({ providedIn: 'root' })
export class CuentaService {
    constructor(private http: HttpClient) {
    }
    ///

    // OBTENER el catalo
    iniciarSesion(datos:Object): Observable<RespuestaRemota<any>> {
        return this.http.post<RespuestaRemota<any>>(APIGAZE.BASE + Cuenta.INICIAR_SESION.toString(),datos);

    }

}