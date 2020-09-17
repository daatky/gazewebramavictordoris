import { MapedorService } from '../../../nucleo/base/mapeador.interface';
import { Injectable } from '@angular/core';
import { CatalogoTipoMonedaModel } from '../../modelo/catalogos/catalogo-tipo-moneda.model';
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoMonedaEntity {
    _id?: string,
    codigo?: string,
    nombre?: string,
    predeterminado?: boolean,
    estado?: CatalogoEstadoEntity //Catalogo estados
    fechaCreacion?: Date,
    fechaActualizacion?: Date
}


@Injectable({ providedIn: 'root' })
export class CatalogoTipoMonedaMapperService extends MapedorService<CatalogoTipoMonedaEntity, CatalogoTipoMonedaModel> {

    protected map(entity: CatalogoTipoMonedaEntity): CatalogoTipoMonedaModel {
        if (entity) {
            const model : CatalogoTipoMonedaModel = {
                codigo: entity.codigo,
                nombre: entity.nombre,
                estado: entity.estado,
            }

            if (entity._id) {
                model.id = entity._id
            }

            return model
        }
        return null
    }
}