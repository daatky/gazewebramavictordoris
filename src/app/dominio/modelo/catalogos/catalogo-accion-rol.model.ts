import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoRolesModel } from "./catalogo-roles.model";

export interface CatalogoAccionRolModel {
    id: string
    codigo: string
    estado: CatalogoEstadoModel,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    tipo: Array<CatalogoRolesModel>
}