import { MediaEntity } from './media.entity'
import { ConversacionEntity } from "./conversacion.entity"
import { CatalogoTipoAsociacionEntity } from "./catalogos/catalogo-tipo-asociacion"
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity"
import { ParticipanteAsociacionEntity } from "./participante-asociacion.entity"

export interface AsociacionEntity {
    id: string,
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