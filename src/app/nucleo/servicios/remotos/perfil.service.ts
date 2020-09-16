import { PerfilEntity } from './../../../dominio/entidades/perfil.entity';
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable, Subject, of } from 'rxjs'
import { APIGAZE } from './rutas/api-gaze.enum';
import { Catalogo } from './rutas/catalogos.enum';
import { Perfiles } from './rutas/perfiles.enum';
import { RespuestaRemota } from '../../util/respuesta';
import { CatalogoTipoPerfilEntity } from '../../../dominio/entidades/catalogos/catalogo-tipo-perfil.entity';
import { MediaEntity } from 'src/app/dominio/entidades/media.entity';
import { PerfilModel } from 'src/app/dominio/modelo/entidades/perfil.model';
import { UsuarioModel } from 'src/app/dominio/modelo/entidades/usuario.model';
import { UsuarioEntity } from 'src/app/dominio/entidades/usuario.entity';
import { debounceTime, map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PerfilServiceRemoto {
    constructor(
        private http: HttpClient
    ) {

    }

    obtenerCatalogoTipoPerfil(): Observable<RespuestaRemota<CatalogoTipoPerfilEntity[]>> {
        return this.http.get<RespuestaRemota<CatalogoTipoPerfilEntity[]>>(APIGAZE.BASE + Catalogo.TIPO_PERFIL.toString())
    }

    validarNombreDeContactoUnico(nombreContacto: string): Observable<RespuestaRemota<string>> {
        return this.http.get<RespuestaRemota<string>>(APIGAZE.BASE + Perfiles.NOMBRE_CONTACTO_UNICO + '/' + nombreContacto)
    }

    obtenerDatosDelPerfil(id: string): Observable<RespuestaRemota<PerfilEntity>> {
        return this.http.get<RespuestaRemota<PerfilEntity>>(APIGAZE.BASE + Perfiles.OBTENER_DATOS_DEL_PERFIL + '/' + id)
    }

    actualizarPerfil(perfil: PerfilEntity): Observable<RespuestaRemota<PerfilEntity>> {
        return this.http.patch<RespuestaRemota<PerfilEntity>>(APIGAZE.BASE + Perfiles.ACTUALIZAR_PERFIL, perfil)
    }

    eliminarHibernarElPerfil(perfil: PerfilEntity): Observable<RespuestaRemota<string>> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: perfil
        }
        return this.http.delete<RespuestaRemota<string>>(APIGAZE.BASE + Perfiles.HIBERNAR_O_ELIMINAR_PERFIL, httpOptions)
    }

    crearPerfilEnElUsuario(perfil: PerfilEntity, usuario: UsuarioEntity): Observable<RespuestaRemota<PerfilEntity>> {
        return this.http.post<RespuestaRemota<PerfilEntity>>(APIGAZE.BASE + Perfiles.CREAR_PERFIL_EN_USUARIO + '/' + usuario._id, perfil)
    }

    activarPerfil(perfil: PerfilEntity): Observable<RespuestaRemota<string>> {
        return this.http.put<RespuestaRemota<string>>(APIGAZE.BASE + Perfiles.DESHIBERNAR_PERFIL + '/' + perfil._id, {})
    }
    
    buscarPerfiles(palabra: string, limite: number, pagina: number): Observable<HttpResponse<RespuestaRemota<PerfilEntity[]>>> {
        return this.http.get<RespuestaRemota<PerfilEntity[]>>(APIGAZE.BASE + Perfiles.BUSCAR_PERFILES + '/' + palabra + '/' + limite + '/' + pagina, { observe: 'response' })
    }

}