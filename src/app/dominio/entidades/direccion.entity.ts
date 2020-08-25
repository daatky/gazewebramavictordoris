import { CatalogoIdiomaEntity } from './catalogos/catalogo-idioma.entity';
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoLocalidadEntity } from "./catalogos/catalogo-localidad.entity";

export interface DireccionEntity {
    id?:string,
    estado?:CatalogoEstadoEntity,
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    latitud?:number,
    longitud?:number,
    traducciones?:Array<TraduccionDireccionEntity>,
    localidad:CatalogoLocalidadEntity,
}

export interface TraduccionDireccionEntity {
    id:string,
    descripcion:string,
    idioma:CatalogoIdiomaEntity, 
    original:boolean
}