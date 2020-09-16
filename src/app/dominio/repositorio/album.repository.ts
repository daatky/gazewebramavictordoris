import { map, catchError } from 'rxjs/operators';
import { MediaModel } from '../modelo/entidades/media.model';
import { Observable, throwError } from 'rxjs';
import { AlbumModel, AlbumModelMapperService } from '../modelo/entidades/album.model';
import { AlbumServiceRemoto } from './../../nucleo/servicios/remotos/album.service'
import { AlbumServiceLocal } from './../../nucleo/servicios/locales/album.service'
import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root'})
export class AlbumRepository {

    constructor(
        private albumServiceLocal: AlbumServiceLocal,
        private albumServiceRemoto: AlbumServiceRemoto,
        private albumMapperAEntidad: AlbumModelMapperService
    ) {

    }

    // Album del perfil
    guardarAlbumActivoEnLocalStorage(album: AlbumModel) {
        this.albumServiceLocal.guardarAlbumEnLocalStorage(album)
    }

    obtenerAlbumActivoDelLocalStorage(): AlbumModel {
        return this.albumServiceLocal.obtenerAlbumEnLocalStorage()
    }

    guardarAlbumActivoEnSessionStorage(album: AlbumModel) {
        this.albumServiceLocal.guardarAlbumEnSessionStorage(album)
    }

    obtenerAlbumActivoDelSessionStorage(): AlbumModel {
        return this.albumServiceLocal.obtenerAlbumEnSessionStorage()
    }

    actualizarAlbum(album: AlbumModel) : Observable<string> {
        const albumEntity = this.albumMapperAEntidad.transform(album)
        return this.albumServiceRemoto.actualizarAlbum(albumEntity)
            .pipe(
                map(data => {
                    return data.respuesta.datos
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

}