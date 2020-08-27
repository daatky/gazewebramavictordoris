import { CatalogoPaisModel } from './catalogo-pais.model'
import { Injectable } from '@angular/core'
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface'
import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface'

export interface CatalogoLocalidadModel {
    id?: string
    codigo?: string
    nombre?: string
    codigoPostal?: string
    pais?: CatalogoPaisModel,
}

@Injectable({ providedIn: 'root' })
export class CatalogoLocalidadMapperAItemSelectorService extends MapedorService<CatalogoLocalidadModel, ItemSelector> {

    protected map(entity: CatalogoLocalidadModel): ItemSelector {
        return {
            codigo: entity.codigo,
            nombre: entity.nombre,
            auxiliar: entity.codigoPostal
        };
    }

}