import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoLocalidadModel } from "../catalogo-localidad.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";
export interface DireccionModel {
    id?:string,
    estado?:CatalogoEstadoModel,
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    latitud?:number,
    longitud?:number,
    localidad:CatalogoLocalidadModel,
    descripcion:string,
}