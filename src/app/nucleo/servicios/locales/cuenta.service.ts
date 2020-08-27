import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { UsuarioModel } from './../../../dominio/modelo/usuario.model'
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class CuentaServiceLocal {
    
    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

    // Guardar usuario en el storage
    guardarUsuario(usuario: UsuarioModel) : void {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.USUARIO, usuario)
    }

    // OBtener usuario del storage
    obtenerUsuario() : UsuarioModel {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.USUARIO)
    }
}