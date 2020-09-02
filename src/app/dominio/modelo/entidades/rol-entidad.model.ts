import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoAccionModel } from "../catalogos/catalogo-accion.model";
import { CatalogoEntidadModel } from "../catalogos/catalogo-entidad.model";
import { CatalogoRolEntity } from "../../entidades/catalogos/catalogo-rol.entity";

export interface RolEntidadModel{
    _id: string
    estado: CatalogoEstadoModel 
    fechaCreacion: Date
    fechaActualizacion: Date
    acciones:Array<CatalogoAccionModel>
    entidad:CatalogoEntidadModel
    rol:CatalogoRolEntity
    nombre:string
}