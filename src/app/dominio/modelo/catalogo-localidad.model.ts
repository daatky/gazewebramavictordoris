import { CatalogoPaisModel, CatalogoPaisMapperService } from './catalogo-pais.model'
import { Injectable } from '@angular/core'
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface'
import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface'
import { CatalogoLocalidadEntity } from '../entidades/catalogos/catalogo-localidad.entity';

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

@Injectable({ providedIn: 'root' })
export class CatalogoLocalidadMapperService extends MapedorService<CatalogoLocalidadModel, CatalogoLocalidadEntity> {

    constructor
        (
            private catalogoPaisMapper: CatalogoPaisMapperService
        ) {
        super();
    }

    protected map(model: CatalogoLocalidadModel): CatalogoLocalidadEntity {
        return {
            codigo: model.codigo,
            codigoPostal: model.codigoPostal,
            nombre: model.nombre,
            pais: this.catalogoPaisMapper.transform(model.pais)
        };
    }

}