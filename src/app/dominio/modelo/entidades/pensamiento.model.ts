import { PerfilModel } from '../perfil.model';
import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";

export interface PensamientoModel {
    id?:string,
    perfil?:PerfilModel,
    texto?:string,
    estado?:CatalogoEstadoModel,
    fechaActualizacion?:Date,
    publico?:boolean
}
