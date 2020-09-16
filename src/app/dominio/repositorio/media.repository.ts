import { MapearMediaEntityAlMediaModelo } from './../entidades/media.entity';
import { ArchivoModel } from './../modelo/entidades/archivo.model';
import { AlbumEntity } from './../entidades/album.entity';
import { AlbumServiceLocal } from '../../nucleo/servicios/locales/album.service';
import { MediaModel } from '../modelo/entidades/media.model';
import { Injectable } from "@angular/core"
import { Observable, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { MediaServiceRemoto } from "./../../nucleo/servicios/remotos/media.service"
import { MapearArchivoAlArchivoDefaultModelo } from "./../entidades/archivo.entity"

@Injectable({ providedIn: 'root'})
export class MediaRepository {

    constructor(
        private mediaServiceRemoto: MediaServiceRemoto,
        private mediaServiceLocal: AlbumServiceLocal,
        private mapearArchivoAlArchivoDefaultModelo: MapearArchivoAlArchivoDefaultModelo,
        private mapearMediaEntityAlMediaModelo: MapearMediaEntityAlMediaModelo
    ) {

    }

    // Obtener catalogo de paises
    obtenerListaArchivosDefault(): Observable<ArchivoModel[]> {
        return this.mediaServiceRemoto.obtenerListaArchivosDefault().pipe(
            map(data => {
                return this.mapearArchivoAlArchivoDefaultModelo.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    subirArchivoAlservidor(body: any) : Observable<MediaModel> {
        return this.mediaServiceRemoto.subirArchivoAlservidor(body).pipe(
            map(data => {
                return this.mapearMediaEntityAlMediaModelo.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }
}