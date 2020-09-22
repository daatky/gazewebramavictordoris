import { AlbumModel } from '../modelo/entidades/album.model';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CatalogoAlbumEntity, CatalogoAlbumEntityMapperService } from "./catalogos/catalogo-album.entity";
//import { MapearMediaModelAlMediaEntity, MediaEntity, MediaPerfilEntityMapperServiceMediaModel } from "./media.entity";
import { MediaEntity, MediaPerfilEntityMapperServiceMediaModel } from "./media.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { Injectable } from '@angular/core';

export interface AlbumEntity {
    _id?:string
    fechaCreacion?:Date
    fechaActualizacion?:Date,
    traduccion?:Array<TraduccionAlbumEntity>,
    tipo?:CatalogoAlbumEntity,
    media?:Array<MediaEntity>, //MEDIA
    portada?:MediaEntity, //MEDIA
}

export interface TraduccionAlbumEntity {
    id?: string,
    nombre?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}
/*
@Injectable({ providedIn: 'root' })
export class AlbumEntityMapperService extends MapedorService<AlbumModel, AlbumEntity> {
    constructor
        (
            //private estadoMapper: EstadoModelMapperService,
            private mediaMapper: MapearMediaModelAlMediaEntity,
            private catalogoAlbumMapper: CatalogoAlbumEntityMapperService
        ) {
        super();
    }

    protected map(entity: AlbumModel): AlbumEntity {
        if (entity) {
            return {
                _id: entity?._id,
                portada: this.mediaMapper.transform(entity.portada),
                media: this.mediaMapper.transform(entity.media),
                tipo: this.catalogoAlbumMapper.transform(entity.tipo)                
            };
        }
        return null;
    }

}*/
@Injectable({ providedIn: 'root' })
export class AlbumPerfilEntityMapperServiceAlbumPerfil extends MapedorService<AlbumEntity, AlbumModel> {
    constructor(
        private mediaPerfilEntityMapperServiceMediaModel:MediaPerfilEntityMapperServiceMediaModel,
    ){
        super();
    }
    protected map(entity: AlbumEntity): AlbumModel {
        return {
            portada:this.mediaPerfilEntityMapperServiceMediaModel.transform(entity.portada),
            tipo:entity.tipo,
            media:this.mediaPerfilEntityMapperServiceMediaModel.transform(entity.media)
        }
    }
}