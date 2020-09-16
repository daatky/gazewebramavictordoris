import { CatalogoEstadoModel } from "./catalogos/catalogo-estado.model";
import { CatalogoTipoAsociacionModel } from "./catalogos/catalogo-tipo-asociacion.model";
import { ConversacionModel } from "./entidades/conversacion.model";
import { ParticipanteAsociacionModel } from "./participante-asociacion.model";

export interface AsociacionModel {
    id?: string,
    estado?: CatalogoEstadoModel, // CatalogoEstado
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    tipo?: CatalogoTipoAsociacionModel, // CatalogoTipoAsociacion
    nombre?: string,
    //foto: MediaModel,
    participantes?: Array<ParticipanteAsociacionModel>[], // Participante
    conversacion?: ConversacionModel, // Conversacion
    privado?: boolean
}