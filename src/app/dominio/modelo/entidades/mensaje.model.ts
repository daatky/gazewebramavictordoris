import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoMensajeModel } from "../catalogos/catalogo-mensaje.model";
import { ConversacionModel } from "./conversacion.model";
import { ParticipanteAsociacionModel } from "./participante-asociacion.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";

export interface MensajeModel {
    id: string
    estado: CatalogoEstadoModel
    fechaCreacion: Date
    fechaActualizacion: Date    
    tipo: CatalogoMensajeModel
    importante: boolean
    //adjuntos: Array<MediaModel> //Media
    conversacion: ConversacionModel
    propietario: ParticipanteAsociacionModel
    contenido:string,
}