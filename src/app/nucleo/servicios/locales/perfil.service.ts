import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service';
import { AlbumModel } from './../../../dominio/modelo/album.model';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RespuestaRemota } from '../../util/respuesta'

@Injectable({ providedIn: 'root' })
export class PerfilServiceLocal {

    constructor(
        private metodosLocalStorageService: MetodosLocalStorageService
    ) {

    }

    guardarAlbum(album: AlbumModel) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.ALBUM_ACTIVO, album)
    }

    obtenerAlbum(): AlbumModel {
        return this.metodosLocalStorageService.obtener(:LlavesLocalStorage.ALBUM_ACTIVO)
    } 

}