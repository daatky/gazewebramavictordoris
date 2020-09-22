import { CatalogoEstadoModel } from "./catalogos/catalogo-estado.model";
import { PerfilModel } from "./perfil.model";
import { ConfiguracionEstiloModel } from "./entidades/configuracion-estilo.model";
import { RolEntidadModel } from "./entidades/rol-entidad.model";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { CodigosCatalogoEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { ItemResultadoBusqueda } from './item-resultado-busqueda';
import { AsociacionModel } from "../modelo/asociacion.model"

export interface ParticipanteAsociacionModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    roles?: Array<RolEntidadModel>
    invitadoPor?: ParticipanteAsociacionModel
    configuraciones?: Array<ConfiguracionEstiloModel>
    perfil?: PerfilModel
    sobrenombre?: string,
    asociacion?: AsociacionModel
}


@Injectable({ providedIn: 'root' })
export class ParticipanteAsosiacionMapperResultadoBusqueda extends MapedorService<ParticipanteAsociacionModel, ItemResultadoBusqueda<ParticipanteAsociacionModel>> {
    protected map(model: ParticipanteAsociacionModel): ItemResultadoBusqueda<ParticipanteAsociacionModel> {
        return {
            titulo: model.perfil.nombreContacto,
            subtitulo: model.perfil.nombre,
            tipo: CodigosCatalogoEntidad.PARTICIPANTE_ASOCIACION,
            item: model
        };
    }
}
