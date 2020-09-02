import { ComentarioEntity } from "./comentario.entity";
import { ProyectoEntity } from "./proyecto.entity";
import { PerfilEntity } from "./perfil.entity"
import { ConfiguracionEstiloEntity } from "./configuracion-estilo.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { RolEntidadEntity } from './rol-entidad.entity';

export interface ParticipanteProyectoEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    roles?: Array<RolEntidadEntity>,
    configuraciones?: Array<ConfiguracionEstiloEntity>,
    comentarios?: Array<ComentarioEntity>,
    proyecto?: ProyectoEntity,
    coautor?: PerfilEntity,
    totalComentarios?: number
}