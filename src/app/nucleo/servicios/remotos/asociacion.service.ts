import { APIGAZE } from './rutas/api-gaze.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { ParticipanteAsociacionEntity } from '../../../dominio/entidades/participante-asociacion.entity';
import { Observable } from 'rxjs';
import { Asociacion } from './rutas/asociacion.enum';

@Injectable({ providedIn: 'root' })
export class AsociacionService {

    constructor(
        private http: HttpClient
    ) {

    }

    obtenerMisContactos(idPerfil: string, limite: number, pagina: number): Observable<HttpResponse<RespuestaRemota<ParticipanteAsociacionEntity[]>>> {

        let params = new HttpParams();
        params = params.append('perfil', idPerfil);
        params = params.append('limite', limite.toString());
        params = params.append('pagina', pagina.toString());

        return this.http.get<RespuestaRemota<ParticipanteAsociacionEntity[]>>(APIGAZE.BASE + Asociacion.CONTACTOS.toString(), { observe: 'response', params: params });

    }

}