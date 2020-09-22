import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { TipoMonedaServiceLocal } from '../../nucleo/servicios/locales/moneda.service';
import { TipoMonedaServiceRemoto } from '../../nucleo/servicios/remotos/moneda.service';
import { CatalogoTipoMonedaEntity, CatalogoTipoMonedaMapperService } from '../entidades/catalogos/catalogo-tipo-moneda.entity';
import { CatalogoTipoMonedaModel } from '../modelo/catalogos/catalogo-tipo-moneda.model';

@Injectable({ providedIn: 'root' })
export class TipoMonedaRepository {

    constructor(
        private tipoMonedaServiceLocal: TipoMonedaServiceLocal,
        private tipoMonedaServiceRemoto: TipoMonedaServiceRemoto,
        private catalogoTipoMonedaMapperService: CatalogoTipoMonedaMapperService
    ) {

    }

    guardarCatalogoTipoMonedaEnLocalStorage(catalogoTipoMoneda: CatalogoTipoMonedaModel[]) {
        this.tipoMonedaServiceLocal.guardarCatalogoTipoMonedaEnLocalStorage(catalogoTipoMoneda)
    }

    obtenerCatalogoTipoMonedaDelLocalStorage(): CatalogoTipoMonedaModel[] {
        return this.tipoMonedaServiceLocal.obtenerCatalogoTipoMonedaDelLocalStorage()
    }

    obtenerCatalogoTipoMoneda() : Observable<CatalogoTipoMonedaModel[]> {
        return this.tipoMonedaServiceRemoto.obtenerCatalogoTipoMoneda()
            .pipe(
                map(data => {
                    return this.catalogoTipoMonedaMapperService.transform(data.respuesta.datos)
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

}