import { ConfiguracionEstiloEntity } from "./configuracion-estilo.entity";
import { CatalogoEstadoEntity, EstadoMapperService } from "./catalogos/catalogo-estado.entity";
import { PerfilEntity, PerfilEntityMapperServicePerfil } from "./perfil.entity";
import { RolEntidadEntity } from './rol-entidad.entity';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { ParticipanteAsociacionModel } from '../modelo/participante-asociacion.model';
import { AsociacionEntity, AsosiacionEntityMapperModel } from './asociacion.entity';

export interface ParticipanteAsociacionEntity {
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    roles?: Array<RolEntidadEntity>
    invitadoPor?: ParticipanteAsociacionEntity
    configuraciones?: Array<ConfiguracionEstiloEntity>
    perfil?: PerfilEntity,
    asociacion?: AsociacionEntity
    sobrenombre?: string
}

@Injectable({ providedIn: 'root' })
export class ParticipanteAsosiacionEntityMapperModel extends MapedorService<ParticipanteAsociacionEntity, ParticipanteAsociacionModel> {
    constructor(
        private estadoMapperService: EstadoMapperService,
        private perfilEntityMapperServicePerfil: PerfilEntityMapperServicePerfil,
        private asosiacionEntityMapperModel: AsosiacionEntityMapperModel
    ) {
        super();
    }


    protected map(entity: ParticipanteAsociacionEntity): ParticipanteAsociacionModel {
        return {
            id: entity._id,
            estado: this.estadoMapperService.transform(entity.estado),
            perfil: this.perfilEntityMapperServicePerfil.transform(entity.perfil),
            asociacion: this.asosiacionEntityMapperModel.transform(entity.asociacion)
        };
    }
}