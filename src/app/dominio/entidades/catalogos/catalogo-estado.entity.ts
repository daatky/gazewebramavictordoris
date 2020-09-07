import { CatalogoEntidadEntity } from "./catalogo-entidad.entity";
import { CatalogoAccionEntity } from "./catalogo-accion.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoEstadoModel } from '../../modelo/catalogos/catalogo-estado.model';

export interface CatalogoEstadoEntity {
    id?: String
    codigo?: string
    nombre?: string
    entidad?: CatalogoEntidadEntity
    accion?: CatalogoAccionEntity
    descripcion?: string
    fechaCreacion?: Date
}

@Injectable({ providedIn: 'root' })
export class EstadoMapperService extends MapedorService<CatalogoEstadoEntity, CatalogoEstadoModel> {

    protected map(entity: CatalogoEstadoEntity): CatalogoEstadoModel {
        if (entity) {
            return {
                codigo: entity.codigo,
                nombre: entity.nombre,
                descripcion: entity.descripcion
            };
        }
        return null;
    }

}