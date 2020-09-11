import { ItemSelector } from './../../../compartido/diseno/modelos/elegible.interface';
import { Injectable } from '@angular/core'
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service'
import { LlavesLocalStorage } from './llaves/local-storage.enum'

@Injectable({ providedIn: 'root' })
export class UbicacionServiceLocal {

    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

    obtenerPaisesParaItemSelector() : ItemSelector[] {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.PAISES)
    }

    guardarPaisesDelItemSelector(paises: ItemSelector[]) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.PAISES, paises)
    }
    eliminarVariableStorage(llave:string){
        this.metodosLocalStorageService.remover(llave)
    }

}