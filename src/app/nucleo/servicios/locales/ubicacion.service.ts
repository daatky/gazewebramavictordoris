import { Injectable } from '@angular/core'
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service'
import { LlavesLocalStorage } from './llaves/local-storage.enum'
import { CatalogoPaisModel } from './../../../dominio/modelo/catalogo-pais.model'

@Injectable({ providedIn: 'root' })
export class UbicacionServiceLocal {

    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

    obtenerPaises() : CatalogoPaisModel[] {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.PAISES)
    }

    guardarPaises(paises:CatalogoPaisModel[]) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.PAISES, paises)
    }

}