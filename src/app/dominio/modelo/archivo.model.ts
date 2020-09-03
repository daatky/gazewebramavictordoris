import { CatalogoTipoMediaEntity } from './../entidades/catalogos/catalogo-tipo-media.entity';
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { ArchivoEntity } from '../entidades/archivo.entity';

export interface ArchivoModel {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    url?: string,
    tipo?: CatalogoTipoMediaEntity,
    peso?: number,
    relacionAspecto?: number,
    path?: string,
    catalogoArchivoDefault?: string
}


@Injectable({ providedIn: 'root' })
export class ArchivoModeloMapperService extends MapedorService<ArchivoModel, ArchivoEntity> {

    protected map(entity: ArchivoModel): ArchivoEntity {
        return {
            _id: entity._id,
            url: entity.url,
            //catalogoArchivoDefault: entity.catalogoArchivoDefault
        };
    }

}