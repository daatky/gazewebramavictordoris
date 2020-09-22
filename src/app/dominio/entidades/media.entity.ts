import { MediaModel } from '../modelo/entidades/media.model';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { Injectable } from '@angular/core';
import { ArchivoEntity } from "./archivo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoMediaEntity, CatalogoMediaEntityMapperServiceCatalogoMediaModel } from "./catalogos/catalogo-media.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface MediaEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    catalogoMedia?: CatalogoMediaEntity,
    principal?: ArchivoEntity,
    miniatura?: ArchivoEntity,
    enlace?: string,
    traducciones?: Array<TraduccionMediaEntity>
}

export interface TraduccionMediaEntity {
    _id?: string,
    descripcion?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}

@Injectable({ providedIn: 'root' })
export class MapearMediaEntityAlMediaModelo extends MapedorService<MediaEntity, MediaModel> {
    
    protected map(entity: MediaEntity): MediaModel {
        return entity;
    }

}

/*
@Injectable({ providedIn: 'root' })
export class MapearMediaModelAlMediaEntity extends MapedorService<MediaModel, MediaEntity> {
    
    protected map(model: MediaModel): MediaEntity {
        return model
    }

}*/

@Injectable({ providedIn: 'root' })
export class MediaPerfilEntityMapperServiceMediaModel extends MapedorService<MediaEntity,MediaModel> {
    constructor(
        private catalogoMediaEntityMapperServiceCatalogoMediaModel:CatalogoMediaEntityMapperServiceCatalogoMediaModel
    ){
        super();
    }
    
    protected map(model: MediaEntity): MediaModel {
        return {
            //tipo:model.catalogoMedia,
            tipo:this.catalogoMediaEntityMapperServiceCatalogoMediaModel.transform(model.catalogoMedia),
            principal:model.principal,
            miniatura:model.miniatura,
            enlace:model.enlace
        }
    }

}