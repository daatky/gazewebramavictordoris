import { ArchivoModel, ArchivoModeloMapperService } from './archivo.model'
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { MediaEntity } from '../../entidades/media.entity';
import { CatalogoEstadoModel } from '../catalogos/catalogo-estado.model';
import { CatalogoMediaModel } from '../catalogos/catalogo-media.model';

export interface MediaModel {
    _id?: string,
    estado?: CatalogoEstadoModel,
    tipo?: CatalogoMediaModel,
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