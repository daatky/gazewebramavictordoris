import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface';
import { CatalogoPaisModel } from '../modelo/catalogo-pais.model';
import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError, Subject, of } from 'rxjs'
import { catchError, tap, map, switchMap } from 'rxjs/operators'
import { HandleError } from '../../nucleo/servicios/locales/handleError.service'
import { UbicacionRepository } from '../../dominio/repositorio/ubicacion.repository'
import { CatalogoPaisEntity } from './../entidades/catalogos/catalogo-pais.entity'

@Injectable({ providedIn: 'root' })
export class UbicacionNegocio {
    
    constructor(
        private ubicacionRepository: UbicacionRepository,
    ) {

    }

    // Obtene catalogo de paises
    obtenerCatalogoPaises(): Observable<CatalogoPaisModel[]> {
        const data: CatalogoPaisModel[] = this.ubicacionRepository.obtenerPaisesDelLocalStorage()
        if (data && data.length > 0) {
            return of(data)
        } else {
            return this.ubicacionRepository.obtenerCatalogoPaises()
        }
    }

    // Paises
    obtenerCatalogoPaisesParaSelector(): Observable<ItemSelector[]> {
        const data: ItemSelector[] = this.ubicacionRepository.obtenerPaisesDelLocalStorage()
        if (data && data.length > 0) {
            return of(data)
        } else {
            return this.ubicacionRepository.obtenerCatalogoPaisesParaSelector()
        }
    }

    // Localidades
    obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais:string, query:string): Observable<ItemSelector[]> {
        return this.ubicacionRepository.obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais, query)
    }

    // Local Storage
    guardarPaisesEnLocalStorage(paises: CatalogoPaisModel[]) {
        this.ubicacionRepository.guardarPaisesEnLocalStorage(paises)
    }

    obtenerPaisesDelLocalStorage() : CatalogoPaisModel[] {
        return this.ubicacionRepository.obtenerPaisesDelLocalStorage()
    }

    obtenerPaisesParaSelectorDelLocalStorage() : ItemSelector[] {
        return this.ubicacionRepository.obtenerPaisesDelLocalStorageParaItemSelector()
    }
}