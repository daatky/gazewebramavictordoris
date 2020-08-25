import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoAccionRolEntity } from "./catalogos/catalogo-accion-rol.entity";

export interface RolEntity{
    id: string
    estado: CatalogoEstadoEntity 
    fechaCreacion: Date
    fechaActualizacion: Date
    tipo:CatalogoAccionRolEntity 
}