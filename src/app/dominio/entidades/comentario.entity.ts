import { ParticipanteProyectoEntity } from "./participante-proyecto.entity";
import { CatalogoTipoComentarioEntity } from "./catalogos/catalogo-tipo-comentario.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { MediaEntity } from "./media.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface ComentarioEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    coautor?: ParticipanteProyectoEntity,
    adjuntos?: Array<MediaEntity>,
    importante?: boolean,
    traducciones?: Array<TraduccionComentarioEntity>,
    tipo?: CatalogoTipoComentarioEntity
}

export interface TraduccionComentarioEntity {
    _id: string
    texto: string
    idioma: CatalogoIdiomaEntity 
    original: boolean
}