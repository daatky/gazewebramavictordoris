import { MetodosSessionStorageService } from './../../util/metodos-session-storage.service';
import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service';
import { AlbumModel } from '../../../dominio/modelo/entidades/album.model';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { RespuestaRemota } from '../../util/respuesta'
import { LlavesSessionStorage } from './llaves/session-storage.enum';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';

@Injectable({ providedIn: 'root' })
export class PerfilServiceLocal {

    constructor(
        private metodosLocalStorageService: MetodosLocalStorageService,
        private metodosSessionStorageService: MetodosSessionStorageService,
    ) {

    }

    guardarPerfilActivoEnLocalStorage(perfil: PerfilModel) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.PERFIL_ACTIVO, perfil)
    }

    obtenerPerfilActivoDelLocalStorage(): PerfilModel {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.PERFIL_ACTIVO)
    }

    removerPerfilActivoDelLocalStorage() {
        this.metodosLocalStorageService.remover(LlavesLocalStorage.PERFIL_ACTIVO)
    }
}