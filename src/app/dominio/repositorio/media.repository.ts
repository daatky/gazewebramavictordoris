import { AlbumEntity } from './../entidades/album.entity';
import { MediaServiceLocal } from './../../nucleo/servicios/locales/media.service';
import { MediaSimpleModel } from './../modelo/media-simple.model';
import { Injectable } from "@angular/core"
import { Observable, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { MediaServiceRemoto } from "./../../nucleo/servicios/remotos/media.service"
import { ArchivoDefaultModelo } from "../modelo/archivo-default.model"
import { MapearArchivoAlArchivoDefaultModelo } from "./../entidades/archivo.entity"
import { MediaSimpleEntity, MapearMediaSimpleEntity } from '../entidades/media-simple.entity'

@Injectable({ providedIn: 'root'})
export class MediaRepository {

    constructor(
        private mediaServiceRemoto: MediaServiceRemoto,
        private mediaServiceLocal: MediaServiceLocal,
        private mapearArchivoAlArchivoDefaultModelo: MapearArchivoAlArchivoDefaultModelo,
        private mapearMediaSimpleEntity: MapearMediaSimpleEntity
    ) {

    }

    // Obtener catalogo de paises
    obtenerListaArchivosDefault(): Observable<ArchivoDefaultModelo[]> {
        return this.mediaServiceRemoto.obtenerListaArchivosDefault().pipe(
            map(data => {
                return this.mapearArchivoAlArchivoDefaultModelo.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    subirArchivoAlservidor(body: any) : Observable<MediaSimpleEntity> {
        return this.mediaServiceRemoto.subirArchivoAlservidor(body).pipe(
            map(data => {
                return this.mapearMediaSimpleEntity.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    guardarListaAlbumEnLocalStorage(albums: AlbumEntity[]) {
        return this.mediaServiceLocal.guardarListaAlbum(albums)
    }

    obtenerListaAlbumDelLocalStorage() : AlbumEntity[] {
        return this.mediaServiceLocal.obtenerListaAlbum()
    }
}