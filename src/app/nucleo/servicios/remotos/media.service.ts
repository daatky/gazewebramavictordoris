import { MediaSimpleModel } from './../../../dominio/modelo/media-simple.model'
import { Media } from './rutas/media.enum'
import { APIGAZE } from './rutas/api-gaze.enum'
import { ArchivoEntity } from './../../../dominio/entidades/archivo.entity'
import { RespuestaRemota } from './../../util/respuesta'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { MediaSimpleEntity } from 'src/app/dominio/entidades/media-simple.entity'

@Injectable({ providedIn: 'root' })
export class MediaServiceRemoto {

    constructor(
        private http: HttpClient,
    ) {

    }

    obtenerListaArchivosDefault() : Observable<RespuestaRemota<ArchivoEntity[]>> {
        return this.http.get<RespuestaRemota<ArchivoEntity[]>>(APIGAZE.BASE + Media.LISTA_ARCHIVOS_DEFAULT)
    }

    subirArchivoAlservidor(body: any) : Observable<RespuestaRemota<MediaSimpleEntity>> {
        return this.http.post<RespuestaRemota<MediaSimpleEntity>>(APIGAZE.BASE + Media.SUBIR_ARCHIVO, body)
    }

}