import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoIdiomaEntity } from '../../entidades/catalogos/catalogo-idioma.entity';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface CatalogoIdiomaModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?: string
    nombre?: string
    codNombre?: string
}


@Injectable({ providedIn: 'root' })
export class IdiomaMapperService extends MapedorService<CatalogoIdiomaModel, CatalogoIdiomaEntity> {

    protected map(model: CatalogoIdiomaModel): CatalogoIdiomaEntity {
        if (model) {
            return {
                codigo: model.codigo,
            };
        }
        return null;
    }

}
