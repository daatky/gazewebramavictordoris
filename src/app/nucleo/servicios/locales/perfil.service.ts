import { MetodosSessionStorageService } from './../../util/metodos-session-storage.service';
import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service';
import { AlbumModel } from './../../../dominio/modelo/album.model';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RespuestaRemota } from '../../util/respuesta'
import { LlavesSessionStorage } from './llaves/session-storage.enum';

@Injectable({ providedIn: 'root' })
export class PerfilServiceLocal {

    constructor(
        private metodosLocalStorageService: MetodosLocalStorageService,
        private metodosSessionStorageService: MetodosSessionStorageService,
    ) {

    }

    guardarAlbumEnLocalStorage(album: AlbumModel) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.ALBUM_ACTIVO, album)
    }

    obtenerAlbumEnLocalStorage(): AlbumModel {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.ALBUM_ACTIVO)
    }

    // metodosSessionStorageService
    guardarAlbumEnSessionStorage(album: AlbumModel) {
        this.metodosSessionStorageService.guardar(LlavesSessionStorage.ALBUM_ACTIVO, album)
    }

    obtenerAlbumEnSessionStorage(): AlbumModel {
        return this.metodosSessionStorageService.obtener(LlavesSessionStorage.ALBUM_ACTIVO)
    }

}