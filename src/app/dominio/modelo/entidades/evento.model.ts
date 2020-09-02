import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ConfiguracionEventoModel } from "../catalogos/configuracion-evento.model";
import { ProyectoModel } from "./proyecto.model";

export interface EventoModel {
    id?: string,
    estado?: CatalogoEstadoModel,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    fechaInicio?: Date,
    fechaFin?: Date,
    configuracionEvento?: ConfiguracionEventoModel,
    proyectos?: Array<ProyectoModel>
}