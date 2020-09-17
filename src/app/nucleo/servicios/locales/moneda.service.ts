import { CatalogoTipoMonedaModel } from './../../../dominio/modelo/catalogos/catalogo-tipo-moneda.model';
import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { ProyectoModel } from '../../../dominio/modelo/proyecto.model';
import { MetodosLocalStorageService } from '../../util/metodos-local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TipoMonedaServiceLocal {

    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

    guardarCatalogoTipoMonedaEnLocalStorage(catalogoTipoMoneda: CatalogoTipoMonedaModel[]) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.TIPO_MONEDA, catalogoTipoMoneda)
    }

    obtenerCatalogoTipoMonedaDelLocalStorage(): CatalogoTipoMonedaModel[] {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.TIPO_MONEDA)
    }

}