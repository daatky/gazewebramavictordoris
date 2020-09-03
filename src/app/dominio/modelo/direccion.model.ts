import { CatalogoLocalidadModel, CatalogoLocalidadMapperService } from './catalogo-localidad.model'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { Injectable } from '@angular/core';
import { DireccionEntity, TraduccionDireccionEntity } from '../entidades/direccion.entity';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface DireccionModel {
    id?: string
    estado?: CatalogoEstadoEntity
    latitud?: number
    longitud?: number
    descripcion?: string
    localidad?: CatalogoLocalidadModel
}

@Injectable({ providedIn: 'root' })
export class DireccionModelMapperService extends MapedorService<DireccionModel, DireccionEntity> {
    constructor
        (
            //private estadoMapper: EstadoModelMapperService,   
            private traduccionDireccionMapper: TraduccionDireccionModelMapperService,
            private localidadMapper: CatalogoLocalidadMapperService
        ) {
        super();
    }

    protected map(model: DireccionModel): DireccionEntity {
        if (model) {
            return {
                traducciones: [(this.traduccionDireccionMapper.transform(model))],
                localidad: this.localidadMapper.transform(model.localidad)
            };
        }
        return null;
    }

}



@Injectable({ providedIn: 'root' })
export class TraduccionDireccionModelMapperService extends MapedorService<DireccionModel, TraduccionDireccionEntity> {
    constructor
        (
            //private estadoMapper: EstadoModelMapperService,            
        ) {
        super();
    }

    protected map(model: DireccionModel): TraduccionDireccionEntity {
        if (model) {
            return {
                descripcion: model.descripcion
            };
        }
        return null;
    }

}