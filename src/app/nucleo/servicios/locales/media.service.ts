import { Injectable } from '@angular/core'
import { MetodosLocalStorageService } from '../../util/metodos-local-storage.service'
import { LlavesLocalStorage } from './llaves/local-storage.enum'
import { AlbumEntity } from './../../../dominio/entidades/album.entity'

@Injectable({ providedIn: 'root' })
export class MediaServiceLocal {

    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

}