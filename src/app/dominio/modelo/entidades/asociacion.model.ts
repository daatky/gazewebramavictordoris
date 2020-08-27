import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoTipoAsociacionModel } from "../catalogos/catalogo-tipo-asociacion.model";
import { ParticipanteAsociacionModel } from "./participante-asociacion.model";
import { ConversacionModel } from "./conversacion.model";

export interface AsociacionModel {
    id: string,
    estado: CatalogoEstadoModel, // CatalogoEstado
    fechaCreacion: Date,
    fechaActualizacion: Date,
    tipo: CatalogoTipoAsociacionModel, // CatalogoTipoAsociacion
    nombre: string,
    //foto: MediaModel,
    participantes: Array<ParticipanteAsociacionModel>[], // Participante
    conversacion: ConversacionModel, // Conversacion
    privado: boolean
}