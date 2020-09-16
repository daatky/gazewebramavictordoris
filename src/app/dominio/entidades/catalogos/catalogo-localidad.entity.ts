import { CatalogoPaisModel } from './../../modelo/catalogos/catalogo-pais.model';
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoPaisEntity, CatalogoPaisMapperService } from "./catalogo-pais.entity";
import { CatalogoIdiomaEntity } from "./catalogo-idioma.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoLocalidadModel } from '../../modelo/catalogos/catalogo-localidad.model';

export interface CatalogoLocalidadEntity {
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?: string
    codigoPostal?: string
    catalogoPais?: CatalogoPaisEntity
    nombre?: string
}

@Injectable({ providedIn: 'root' })
export class CatalogoLocalidadEntitytMapperService extends MapedorService<CatalogoLocalidadEntity, CatalogoLocalidadModel> {

    constructor(
        private catalogoPaisMapper: CatalogoPaisMapperService
    ) {
        super()
    }

    protected map(entity: CatalogoLocalidadEntity): CatalogoLocalidadModel {
        return {
            codigo: entity.codigo,
            codigoPostal: entity.codigoPostal,
            nombre: entity.nombre,
            pais: this.catalogoPaisMapper.transform(entity.catalogoPais)
        };
    }

}