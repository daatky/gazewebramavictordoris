import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoBeneficiarioModel{
    id:string,
    codigo:string,
    estado:CatalogoEstadoModel
    fechaCreacion:Date,
    fechaActualizacion:Date,   
    nombre:string,
    descripcion:string
}