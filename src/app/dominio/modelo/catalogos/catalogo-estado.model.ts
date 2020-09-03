import { CatalogoEntidadModel } from "./catalogo-entidad.model";
import { CatalogoAccionModel } from "./catalogo-accion.model";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoEstadoEntity } from '../../entidades/catalogos/catalogo-estado.entity';

export interface CatalogoEstadoModel {
    id?: String
    codigo?: string
    nombre?: string
    entidad?: CatalogoEntidadModel
    accion?: CatalogoAccionModel
    descripcion?: string
    fechaCreacion?: Date
}

@Injectable({ providedIn: 'root' })
export class EstadoModelMapperService extends MapedorService<CatalogoEstadoModel, CatalogoEstadoEntity> {

    protected map(model: CatalogoEstadoModel): CatalogoEstadoEntity {
        if (model) {
            return {
                codigo: model.codigo,
                nombre: model.nombre,
                descripcion: model.descripcion
            };
        }
        return null;
    }

}