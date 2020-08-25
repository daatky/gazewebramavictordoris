import { Injectable } from '@angular/core'
import { UbicacionServiceRemoto } from '../../nucleo/servicios/remotos/ubicacion.service'
import { catchError, map } from 'rxjs/operators'
import { HandleError } from '../../nucleo/servicios/locales/handleError.service'
import { Observable, throwError } from 'rxjs'
import { UbicacionServiceLocal } from './../../nucleo/servicios/locales/ubicacion.service'
import { CatalogoLocalidadMapperAItemSelectorService } from './../modelo/catalogo-localidad.model'
import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface'
import { CatalogoPaisModel } from '../modelo/catalogo-pais.model'
import { CatalogoPaisEntity, CatalogoPaisMapperAItemSelectorService, CatalogoPaisMapperService } from './../entidades/catalogos/catalogo-pais.entity'

@Injectable({ providedIn: 'root'})
export class UbicacionRepository {

    constructor(
        private ubicacionServiceRemoto: UbicacionServiceRemoto,
        private ubicacionServiceLocal: UbicacionServiceLocal,
        private mapearAEntidad: CatalogoPaisMapperService,
        private mapearPaisAItemSelector: CatalogoPaisMapperAItemSelectorService,
        private mapearLocalidadAItemSelector: CatalogoLocalidadMapperAItemSelectorService
    ) {

    }

    // Obtener catalogo de paises
    obtenerCatalogoPaises(): Observable<CatalogoPaisModel[]> {
        return this.ubicacionServiceRemoto.obtenerCatalogoPaises().pipe(
            map(data => {
                return this.mapearAEntidad.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    // Obtener catalogo de paises
    obtenerCatalogoPaisesParaSelector(): Observable<ItemSelector[]> {
        return this.ubicacionServiceRemoto.obtenerCatalogoPaises().pipe(
            map(data => {
                return this.mapearPaisAItemSelector.transform(this.mapearAEntidad.transform(data.respuesta.datos))
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    // Obtener catalogo de localidades por pais
    obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais:string, query:string): Observable<ItemSelector[]> {
        return this.ubicacionServiceRemoto.obtenerCatalogoLocalidadesPorNombrePorPaises(pais, query).pipe(
            map(data => {
                return this.mapearLocalidadAItemSelector.transform(data.respuesta.datos)
            }),
            catchError(error => {
                return throwError(error)
            })
        )
    }

    // Local storage
    guardarPaisesEnLocalStorage(paises : CatalogoPaisModel[]) {
        this.ubicacionServiceLocal.guardarPaises(paises)
    }

    obtenerPaisesDelLocalStorage() : CatalogoPaisModel[] {
        return this.ubicacionServiceLocal.obtenerPaises()
    }

    obtenerPaisesDelLocalStorageParaItemSelector() : ItemSelector[] {
        return this.mapearPaisAItemSelector.transform(this.ubicacionServiceLocal.obtenerPaises())
    }
}