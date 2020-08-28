import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoConfiguracionEventoModel{
    id?:string,
    codigo?:string,   
    estado?:CatalogoEstadoModel //Catalogo estados
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    intervalo?:number,
    duracion?:number,
    tipo?:CatalogoTipoConfiguracionEventoModel,
    ciclico?:boolean 
}