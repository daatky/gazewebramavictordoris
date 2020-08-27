import { ArchivoModel } from './../modelo/archivo.model'
import { Injectable } from '@angular/core'
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity"
import { CatalogoTipoMediaEntity } from "./catalogos/catalogo-tipo-media.entity"
import { MapedorService } from "./../../nucleo/base/mapeador.interface"

export interface ArchivoEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date
    fechaActualizacion?: Date,
    url?: string,
    tipo?: CatalogoTipoMediaEntity,
    peso?: number,
    relacionAspecto?: number,
    path?: string,
    catalogoArchivoDefault?: string
}

@Injectable({ providedIn: 'root' })
export class MapearArchivoAlArchivoDefaultModelo extends MapedorService<ArchivoEntity, ArchivoModel> {
    
    protected map(entity: ArchivoEntity): ArchivoModel {
        return {
            _id: entity._id,
            url: entity.url,
            catalogoArchivoDefault: entity.catalogoArchivoDefault
        };
    }

}