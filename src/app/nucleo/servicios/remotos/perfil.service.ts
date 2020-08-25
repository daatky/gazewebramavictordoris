import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { CatalogoTipoPerfilEntity } from '../../../dominio/entidades/catalogos/catalogo-tipo-perfil.entity';

@Injectable({ providedIn: 'root' })
export class PerfilService {
    constructor(private http: HttpClient) {

    }

    obtenerCatalogoTipoPerfil(): Observable<RespuestaRemota<CatalogoTipoPerfilEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoTipoPerfilEntity[]>>(APIGAZE.BASE + Catalogo.TIPO_PERFIL.toString());
    }


}