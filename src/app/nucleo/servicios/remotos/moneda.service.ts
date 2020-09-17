import { APIGAZE } from './rutas/api-gaze.enum';
import { CatalogoTipoMonedaEntity } from './../../../dominio/entidades/catalogos/catalogo-tipo-moneda.entity';
import { RespuestaRemota } from './../../util/respuesta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from './rutas/catalogos.enum';

@Injectable({ providedIn: 'root' })
export class TipoMonedaServiceRemoto {

    constructor(
        private http: HttpClient
    ) {

    }

    obtenerCatalogoTipoMoneda() : Observable<RespuestaRemota<CatalogoTipoMonedaEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoTipoMonedaEntity[]>>(APIGAZE.BASE + Catalogo.CATALOGO_TIPO_MONEDA.toString())
    }

}