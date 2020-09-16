import { CatalogoIdiomaEntity } from './catalogos/catalogo-idioma.entity';
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoLocalidadEntity, CatalogoLocalidadEntitytMapperService } from "./catalogos/catalogo-localidad.entity";
import { DireccionModel } from '../modelo/entidades/direccion.model';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoLocalidadMapperService } from '../modelo/catalogos/catalogo-localidad.model';

export interface DireccionEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    latitud?: number,
    longitud?: number,
    // traducciones?: Array<TraduccionDireccionEntity>,
    descripcion?: string,
    localidad?: CatalogoLocalidadEntity,
}

export interface TraduccionDireccionEntity {
    id?: string,
    descripcion?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}

@Injectable({ providedIn: 'root' })
export class DireccionEntityMapperService extends MapedorService<DireccionEntity, DireccionModel> {
    constructor(
        private localidadMapper: CatalogoLocalidadEntitytMapperService
    ) {
        super();
    }

    protected map(entity: DireccionEntity): DireccionModel{
        if (entity) {
            const direccion: DireccionModel = {
                descripcion: entity.descripcion,
                localidad: this.localidadMapper.transform(entity.localidad)
            }

            if (entity._id) {
                direccion._id = entity._id
            }

            return direccion
        }
        return null;
    }

}