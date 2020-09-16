import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";
import { NoticiaModel } from "../noticia.model";
import { PerfilModel } from "../entidades/perfil.model";

export interface VotoNoticiaModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    perfil?: PerfilModel
    noticia?: NoticiaModel
    descripcion?: string 
}
