import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface';
import { CatalogoPaisModel } from '../modelo/catalogos/catalogo-pais.model';
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

    // Paises para selector - Remoto
    obtenerCatalogoPaisesParaSelector(): Observable<ItemSelector[]> {
        const data: ItemSelector[] = this.ubicacionRepository.obtenerPaisesDelLocalStorageParaItemSelector()
        if (data && data.length > 0) {
            return of(data)
        } else {
            return this.ubicacionRepository.obtenerCatalogoPaisesParaSelector()
        }
    }

    // Localidades por nombre y pais para selector - Remoto
    obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais:string, query:string): Observable<ItemSelector[]> {
        return this.ubicacionRepository.obtenerCatalogoLocalidadesPorNombrePorPaisParaSelector(pais, query)
    }

    // - Local
    guardarPaisesDelSelectorEnLocalStorage(paises: ItemSelector[]) {
        this.ubicacionRepository.guardarPaisesEnElLocalStorageDesdeElItemSelector(paises)
    }
    // - Local
    obtenerPaisesParaSelectorDelLocalStorage() : ItemSelector[] {
        return this.ubicacionRepository.obtenerPaisesDelLocalStorageParaItemSelector()
    }
}