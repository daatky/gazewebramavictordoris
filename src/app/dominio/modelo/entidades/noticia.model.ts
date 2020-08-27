import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoLocalidadModel } from "../catalogo-localidad.model";
import { PerfilModel } from "../perfil.model";
import { VotoNoticiaModel } from "./voto-noticia.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";

export interface NoticiaModel {
    id: string
    estado: CatalogoEstadoModel
    fechaCreacion: Date
    fechaActualizacion: Date
    localidad: CatalogoLocalidadModel
    autor: string
    perfil: PerfilModel
    votos: Array<VotoNoticiaModel>
    totalVotos: number
    tituloCorto:string,
    titulo:string,
    descripcion:string,
    tags:Array<string>,
}
