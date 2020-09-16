import { CatalogoAlbumModel } from './../../modelo/catalogos/catalogo-album.model';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface CatalogoAlbumEntity {
    _id?:string,
    codigo?:string,
    estado?:any //Catalogo estados
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    nombre?:string,
    descripcion?:string
}

@Injectable({ providedIn: 'root' })
export class CatalogoAlbumEntityMapperService extends MapedorService<CatalogoAlbumEntity, CatalogoAlbumModel> {
    constructor() {
        super();
    }

    protected map(entity: CatalogoAlbumEntity): CatalogoAlbumModel {
        if (entity) {
            return {
                codigo: entity.codigo
            };
        }
        return null;
    }
}