import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable, Subject, of } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { Perfiles } from './rutas/perfiles.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { CatalogoTipoPerfilEntity } from '../../../dominio/entidades/catalogos/catalogo-tipo-perfil.entity';
import { PerfilEntity } from 'src/app/dominio/entidades/perfil.entity';
import { debounceTime, map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PerfilServiceRemoto {
    constructor(private http: HttpClient) {

    }

    obtenerCatalogoTipoPerfil(): Observable<RespuestaRemota<CatalogoTipoPerfilEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoTipoPerfilEntity[]>>(APIGAZE.BASE + Catalogo.TIPO_PERFIL.toString());
    }

    validarNombreDeContactoUnico(nombreContacto: string): Observable<RespuestaRemota<string>> {
        return this.http.get<RespuestaRemota<string>>(APIGAZE.BASE + Perfiles.NOMBRE_CONTACTO_UNICO + '/' + nombreContacto)
    }

    buscarPerfiles(palabra: string, limite: number, pagina: number): Observable<HttpResponse<RespuestaRemota<PerfilEntity[]>>> {
        return this.http.get<RespuestaRemota<PerfilEntity[]>>(APIGAZE.BASE + Perfiles.BUSCAR_PERFILES + '/' + palabra + '/' + limite + '/' + pagina, { observe: 'response' })
    }

}