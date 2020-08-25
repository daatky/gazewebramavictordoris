import { ItemSelector } from './../../../compartido/diseno/modelos/elegible.interface';
import { CatalogoPaisModel } from '../../modelo/catalogo-pais.model';
import { Injectable } from '@angular/core';
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogo-idioma.entity";
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface CatalogoPaisEntity{
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
    codigoTelefono?:string
    traducciones?:Array<TraduccionCatalogoPaisEntity>
}

export interface TraduccionCatalogoPaisEntity {
    id?: string,
    nombre?: string,
    idioma?: CatalogoIdiomaEntity, //CATATLOGO IDIOMA
    original?: boolean
}

@Injectable({ providedIn: 'root' })
export class CatalogoPaisMapperService extends MapedorService<CatalogoPaisEntity, CatalogoPaisModel> {

    protected map(entity: CatalogoPaisEntity): CatalogoPaisModel {
        return {
            codigo: entity.codigo,
            nombre: entity.traducciones[0].nombre,
            codigoTelefono: entity.codigoTelefono
        };
    }

}

@Injectable({ providedIn: 'root' })
export class CatalogoPaisMapperAItemSelectorService extends MapedorService<CatalogoPaisModel, ItemSelector> {

    protected map(entity: CatalogoPaisModel): ItemSelector {
        return {
            codigo: entity.codigo,
            nombre: entity.nombre
        };
    }

}