import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ParticipanteProyectoModel } from "./participanteProyecto.model";
import { CatalogoTipoComentarioModel } from "../catalogos/catalogo-tipo-comentario.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";

export interface ComentarioModel {
    id: string,
    estado: CatalogoEstadoModel,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    coautor: ParticipanteProyectoModel,
    //adjuntos: Array<MediaModel>,
    importante: boolean,
    tipo: CatalogoTipoComentarioModel
    texto: string
}