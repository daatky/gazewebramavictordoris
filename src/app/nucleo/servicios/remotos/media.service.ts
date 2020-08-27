import { Media } from './rutas/media.enum'
import { APIGAZE } from './rutas/api-gaze.enum'
import { ArchivoEntity } from './../../../dominio/entidades/archivo.entity'
import { RespuestaRemota } from './../../util/respuesta'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { MediaEntity } from './../../../dominio/entidades/media.entity'

@Injectable({ providedIn: 'root' })
export class MediaServiceRemoto {

    constructor(
        private http: HttpClient,
    ) {

    }

    obtenerListaArchivosDefault() : Observable<RespuestaRemota<ArchivoEntity[]>> {
        return this.http.get<RespuestaRemota<ArchivoEntity[]>>(APIGAZE.BASE + Media.LISTA_ARCHIVOS_DEFAULT)
    }

    subirArchivoAlservidor(body: any) : Observable<RespuestaRemota<MediaEntity>> {
        return this.http.post<RespuestaRemota<MediaEntity>>(APIGAZE.BASE + Media.SUBIR_ARCHIVO, body)
    }

}