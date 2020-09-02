import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { RolEntidadModel } from "./rol-entidad.model";
import { CatalogoRolModel } from "../catalogos/catalogo-rol.model";

export interface RolSistemaModel{
    _id: string
    estado: CatalogoEstadoModel
    fechaCreacion: Date
    fechaActualizacion: Date
    rolesEspecificos:RolEntidadModel
    rol:CatalogoRolModel
    nombre:string
}