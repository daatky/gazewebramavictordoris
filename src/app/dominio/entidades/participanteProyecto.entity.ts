import { ComentarioEntity } from "./comentario.entity";
import { ProyectoEntity } from "./proyecto.entity";
import { PerfilEntity } from "./perfil.entity"
import { RolEntity } from "./rol.entity";
import { ConfiguracionEntity } from "./configuracion.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";

export interface ParticipanteProyectoEntity {
    id: string,
    estado: CatalogoEstadoEntity,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    roles: Array<RolEntity>,
    configuraciones: Array<ConfiguracionEntity>,
    comentarios: Array<ComentarioEntity>,
    proyecto: ProyectoEntity,
    coautor: PerfilEntity,
    totalComentarios: number
}