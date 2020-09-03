import { MediaModel, MediaModelMapperServicePerfil } from './media.model'
import { CatalogoAlbumEntity } from './../entidades/catalogos/catalogo-album.entity'
import { Injectable } from '@angular/core';
import { AlbumEntity } from '../entidades/album.entity';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoAlbumModelMapperService } from "../modelo/catalogos/catalogo-album.model";
export interface AlbumModel {
    id?: string
    nombre?: string,
    tipo?: CatalogoAlbumEntity,
    media?: Array<MediaModel>,
    portada?: MediaModel,
}

@Injectable({ providedIn: 'root' })
export class AlbumModelMapperServicePerfil extends MapedorService<AlbumModel, AlbumEntity> {
    constructor
        (
            //private estadoMapper: EstadoModelMapperService,
            private mediaMapper: MediaModelMapperServicePerfil,
            private catalogoAlbumMapper: CatalogoAlbumModelMapperService
        ) {
        super();
    }

    protected map(model: AlbumModel): AlbumEntity {
        if (model) {
            return {
                media: this.mediaMapper.transform(model.media),
                portada: this.mediaMapper.transform(model.portada),
                tipo: this.catalogoAlbumMapper.transform(model.tipo)                
            };
        }
        return null;
    }

}
