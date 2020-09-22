import { of } from 'rxjs';
import { TipoMonedaRepository } from './../repositorio/moneda.repository';
import { Injectable } from "@angular/core";
import { CatalogoTipoMonedaModel } from '../modelo/catalogos/catalogo-tipo-moneda.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipoMonedaNegocio {

    constructor(
         private tipoMonedaRepository: TipoMonedaRepository
    ) {

    }

    guardarCatalogoTipoMonedaEnLocalStorage(catalogoTipoMoneda: CatalogoTipoMonedaModel[]) {
        this.tipoMonedaRepository.guardarCatalogoTipoMonedaEnLocalStorage(catalogoTipoMoneda)
    }

    obtenerCatalogoTipoMonedaDelLocalStorage(): CatalogoTipoMonedaModel[] {
        return this.tipoMonedaRepository.obtenerCatalogoTipoMonedaDelLocalStorage()
    }

    obtenerCatalogoTipoMoneda() : Observable<CatalogoTipoMonedaModel[]>{
        const catalogo = this.obtenerCatalogoTipoMonedaDelLocalStorage()
        if (catalogo) {
            return of(catalogo)
        } else {
            // return this.tipoMonedaRepository.obtenerCatalogoTipoMoneda()
        }
    }

}