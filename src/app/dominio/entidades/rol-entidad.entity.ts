import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoEntidadEntity } from "./catalogos/catalogo-entidad.entity";
import { CatalogoAccionEntity } from "./catalogos/catalogo-accion.entity";
import { CatalogoRolEntity } from "./catalogos/catalogo-rol.entity";

export interface RolEntidadEntity{
    _id: string
    estado: CatalogoEstadoEntity 
    fechaCreacion: Date
    fechaActualizacion: Date
    acciones:Array<CatalogoAccionEntity>
    entidad:CatalogoEntidadEntity
    rol:CatalogoRolEntity
    nombre:string
}