import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoBeneficiarioEntity{
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity
    fechaCreacion:Date,
    fechaActualizacion:Date,   
    nombre:string,
    descripcion:string
}