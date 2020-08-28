import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoEntidadModel } from "../catalogos/catalogo-entidad.model";
import { EstiloModel } from "./estilo.model";
import { CatalogoConfiguracionModel } from "../catalogos/catalogo-configuracion.model";

export interface ConfiguracionModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?: string
    entidad?: CatalogoEntidadModel
    silenciada?: boolean
    tonoNotificacion?: string
    estilos?: Array<EstiloModel>
    tipo?: CatalogoConfiguracionModel
}