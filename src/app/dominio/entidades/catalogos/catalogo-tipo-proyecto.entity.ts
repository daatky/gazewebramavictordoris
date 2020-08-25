import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogo-idioma.entity";

export interface CatalogoTipoProyectoEntity {
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity, 
    fechaCreacion:Date,
    fechaActualizacion:Date,
    traducciones:Array<TraduccionCatalogoTipoProyectoEntity>[] // TraduccionCatalogoTipoProyecto
}
export interface TraduccionCatalogoTipoProyectoEntity{
    id:string,
    nombre:string,
    idioma:CatalogoIdiomaEntity,
    original:boolean,
    descripcion:string
}