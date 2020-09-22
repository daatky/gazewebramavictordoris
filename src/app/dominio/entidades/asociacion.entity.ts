import { MediaEntity } from "./media.entity";
import { ConversacionEntity } from "./conversacion.entity";
import { CatalogoTipoAsociacionEntity } from "./catalogos/catalogo-tipo-asociacion";
import { CatalogoEstadoEntity, EstadoMapperService } from "./catalogos/catalogo-estado.entity";
import { ParticipanteAsociacionEntity } from "./participante-asociacion.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { AsociacionModel } from '../modelo/asociacion.model';

export interface AsociacionEntity {
    _id: string,
    estado: CatalogoEstadoEntity, // CatalogoEstado
    fechaCreacion: Date,
    fechaActualizacion: Date,
    tipo: CatalogoTipoAsociacionEntity, // CatalogoTipoAsociacion
    nombre: string,
    foto: MediaEntity,
    participantes: Array<ParticipanteAsociacionEntity>[], // Participante
    conversacion: ConversacionEntity, // Conversacion
    privado: boolean
}

@Injectable({ providedIn: 'root' })
export class AsosiacionEntityMapperModel extends MapedorService<AsociacionEntity, AsociacionModel> {
    constructor(
        private estadoMapperService: EstadoMapperService,
    ) {
        super();
    }

    protected map(entity: AsociacionEntity): AsociacionModel {
        return {
            id: entity._id,
            estado: this.estadoMapperService.transform(entity.estado),
            nombre: entity.nombre
        };
    }
}