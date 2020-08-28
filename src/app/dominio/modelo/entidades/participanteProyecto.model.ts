import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { RolModel } from "./rol.model";
import { ConfiguracionModel } from "./configuracion.model";
import { PerfilModel } from "../perfil.model";
import { ProyectoModel } from "./proyecto.model";
import { ComentarioModel } from "./comentario.model";

export interface ParticipanteProyectoModel {
    id?: string,
    estado?: CatalogoEstadoModel,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    roles?: Array<RolModel>,
    configuraciones?: Array<ConfiguracionModel>,
    comentarios?: Array<ComentarioModel>,
    proyecto?: ProyectoModel,
    coautor?: PerfilModel,
    totalComentarios?: number
}