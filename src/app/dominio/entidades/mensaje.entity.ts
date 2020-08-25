import { ConversacionEntity } from "./conversacion.entity";
import { ParticipanteAsociacionEntity } from "./participante-asociacion.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { MediaEntity } from "./media.entity";
import { CatalogoMensajeEntity } from "./catalogos/catalogo-mensaje.entity"
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface MensajeEntity {
    id: string
    estado: CatalogoEstadoEntity
    fechaCreacion: Date
    fechaActualizacion: Date
    traducciones: Array<TraduccionMensajeEntity>
    tipo: CatalogoMensajeEntity //CatalogoMensaje
    importante: boolean
    adjuntos: Array<MediaEntity> //Media
    conversacion: ConversacionEntity
    propietario: ParticipanteAsociacionEntity //Participante Asociacion
}

export interface TraduccionMensajeEntity {
    id:string,
    contenido:string,
    idioma:CatalogoIdiomaEntity, // CatalogoIdioma
    original:boolean
}