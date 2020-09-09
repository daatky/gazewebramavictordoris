import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { UsuarioModel } from './../../../dominio/modelo/usuario.model'
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service'
import { Injectable } from '@angular/core'
import { SessionStorageServicie } from './session-storage.service';
import { MetodosSessionStorageService } from '../../util/metodos-session-storage.service';
import { LlavesSessionStorage } from './llaves/session-storage.enum';

@Injectable({ providedIn: 'root' })
export class CuentaServiceLocal {
    
    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService,
        private metodosSesionStorage: MetodosSessionStorageService,
    ) {

    }

    // Guardar usuario en el storage
    guardarUsuarioEnLocalStorage(usuario: UsuarioModel) : void {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.USUARIO, usuario)
    }

    // OBtener usuario del storage
    obtenerUsuarioDelLocalStorage() : UsuarioModel {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.USUARIO)
    }

    // Guardar usuario en el storage
    guardarUsuarioEnSessionStorage(usuario: UsuarioModel): void {
        this.metodosSesionStorage.guardar(LlavesSessionStorage.USUARIO, usuario);

    }

    // OBtener usuario del storage
    obtenerUsuarioDelnSessionStorage(): UsuarioModel {
        return this.metodosSesionStorage.obtener(LlavesSessionStorage.USUARIO);
    }
}