import { PerfilEntity } from "../../dominio/entidades/perfil.entity";
import { CatalogoEstadoEntity } from "../../dominio/entidades/catalogos/catalogo-estado.entity";
export interface PensamientoModel {
    id?:string,
    perfil?:PerfilEntity,
    texto?:string,
    estado?:CatalogoEstadoEntity, // CatalogoEstado
    fechaActualizacion?:Date,
    publico?:boolean
}

export interface PensamientoRemotoModel {
    perfil: string,
    texto: string,
    publico: boolean
}