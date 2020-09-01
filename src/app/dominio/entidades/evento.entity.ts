import { ProyectoEntity } from "./proyecto.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { ConfiguracionEventoEntity } from "./catalogos/configuracion-evento.entity";

export interface EventoEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    fechaInicio?: Date,
    fechaFin?: Date,
    configuracionEvento?: ConfiguracionEventoEntity,
    proyectos?: Array<ProyectoEntity>
}