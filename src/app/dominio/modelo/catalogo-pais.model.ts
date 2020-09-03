import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { CatalogoPaisEntity } from '../entidades/catalogos/catalogo-pais.entity';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { Injectable } from '@angular/core';

export interface CatalogoPaisModel {
    id?: string
    codigo?: string
    estado?: CatalogoEstadoEntity
    nombre?: string
    codigoTelefono?: any
    codigoNombre?: string
}


@Injectable({ providedIn: 'root' })
export class CatalogoPaisMapperService extends MapedorService<CatalogoPaisModel, CatalogoPaisEntity> {

    protected map(entity: CatalogoPaisModel): CatalogoPaisEntity {
        return {
            codigo: entity.codigo,
        };
    }

}