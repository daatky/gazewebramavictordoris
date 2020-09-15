import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ConfiguracionEstiloModel } from "./configuracion-estilo.model";
import { PerfilModel } from "../perfil.model";
import { ProyectoModel } from "../proyecto.model";
import { ComentarioModel } from "./comentario.model";
import { RolEntidadModel } from "./rol-entidad.model";

export interface ParticipanteProyectoModel {
    id?: string,
    estado?: CatalogoEstadoModel,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    roles?: Array<RolEntidadModel>,
    configuraciones?: Array<ConfiguracionEstiloModel>,
    comentarios?: Array<ComentarioModel>,
    proyecto?: ProyectoModel,
    coautor?: PerfilModel,
    totalComentarios?: number
}