import { ConfiguracionEstiloEntity } from "./configuracion-estilo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { ParticipantePerfilEntityMapperServicePerfilModel, PerfilEntity } from "./perfil.entity";
import { RolEntidadEntity } from './rol-entidad.entity';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { ParticipanteAsociacionModel } from '../modelo/participante-asociacion.model';

export interface ParticipanteAsociacionEntity {
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    roles?: Array<RolEntidadEntity> 
    invitadoPor?:ParticipanteAsociacionEntity
    configuraciones?:Array<ConfiguracionEstiloEntity>
    perfil?:PerfilEntity
    sobrenombre?:string 
}

@Injectable({ providedIn: 'root' })
export class ParticipanteAsociacionPerfilEntityMapperServicePerfilModel extends MapedorService<ParticipanteAsociacionEntity, ParticipanteAsociacionModel> {
    constructor(
        private participantePerfilEntityMapperServicePerfilModel:ParticipantePerfilEntityMapperServicePerfilModel,
    ){
        super()
    }
    protected map(entity: ParticipanteAsociacionEntity): ParticipanteAsociacionModel {
        return {
            perfil:this.participantePerfilEntityMapperServicePerfilModel.transform(entity.perfil),
            estado:entity.estado
        }
    }
}