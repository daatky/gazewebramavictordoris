import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoConfiguracionEventoEntity{
    id:string,
    codigo:string,   
    estado:CatalogoEstadoEntity //Catalogo estados
    fechaCreacion:Date,
    fechaActualizacion:Date,
    intervalo:number,
    duracion:number,
    tipo:CatalogoTipoConfiguracionEventoEntity,
    ciclico:boolean 
}