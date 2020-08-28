import { CatalogoAccionRolModel } from "../catalogos/catalogo-accion-rol.model";
import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";

export interface RolModel{
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    tipo?:CatalogoAccionRolModel
}