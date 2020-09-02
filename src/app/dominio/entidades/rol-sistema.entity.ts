import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoRolEntity } from "./catalogos/catalogo-rol.entity";
import { RolEntidadEntity } from "./rol-entidad.entity";

export interface RolSistemaEntity{
    _id: string
    estado: CatalogoEstadoEntity 
    fechaCreacion: Date
    fechaActualizacion: Date
    rolesEspecificos:RolEntidadEntity
    rol:CatalogoRolEntity
    nombre:string
}