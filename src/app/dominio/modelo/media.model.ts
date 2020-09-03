import { ArchivoModel, ArchivoModeloMapperService } from './archivo.model'
import { CatalogoMediaEntity } from './../entidades/catalogos/catalogo-media.entity'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { MediaEntity } from '../entidades/media.entity';

export interface MediaModel {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    tipo?: CatalogoMediaEntity,
    principal?: ArchivoModel,
    miniatura?: ArchivoModel,
    enlace?: string,
    descripcion?: string,
}

@Injectable({ providedIn: 'root' })
export class MediaModelMapperServicePerfil extends MapedorService<MediaModel, MediaEntity> {
    constructor
        (
            //private estadoMapper: EstadoModelMapperService,
            private archivoMapper: ArchivoModeloMapperService
        ) {
        super();
    }

    protected map(model: MediaModel): MediaEntity {
        if (model) {
            return {
                principal: this.archivoMapper.transform(model.principal),
                _id: model._id
            };
        }
        return null;
    }

}