
import { PerfilEntity } from "./perfil.entity";
import { NoticiaEntity } from "./noticia.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface VotoNoticiaEntity {
    id: string
    estado: CatalogoEstadoEntity
    fechaCreacion: Date
    fechaActualizacion: Date
    perfil: PerfilEntity
    noticia: NoticiaEntity
    traducciones: Array<TraduccionVotoNoticiaEntity>
}

export interface TraduccionVotoNoticiaEntity{
    id: string
    descripcion: string 
    idioma: CatalogoIdiomaEntity 
    original:boolean
}