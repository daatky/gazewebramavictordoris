import { CatalogoAlbumEntity } from "../../entidades/catalogos/catalogo-album.entity";
import { Injectable } from '@angular/core';
//import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { MapedorService } from '../../../nucleo/base/mapeador.interface';
export interface CatalogoAlbumModel {
    id?: string,
    codigo?: string,
    estado?: any //Catalogo estados
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    nombre?: string,
    descripcion?: string
}


@Injectable({ providedIn: 'root' })
export class CatalogoAlbumModelMapperService extends MapedorService<CatalogoAlbumModel, CatalogoAlbumEntity> {
    constructor() {
        super();
    }

    protected map(model: CatalogoAlbumModel): CatalogoAlbumEntity {
        if (model) {
            return {
                codigo: model.codigo
            };
        }
        return null;
    }
}