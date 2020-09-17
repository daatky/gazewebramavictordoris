import { ParticipanteProyectoEntity } from "./participante-proyecto.entity";
import { VotoProyectoEntity } from "./votoProyecto.entity";
import { EstrategiaEntity } from "./estrategia.entity";
import { ComentarioEntity } from "./comentario.entity";
import { PerfilEntity } from "./perfil.entity";
import { AlbumEntity } from "./album.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoTipoMonedaEntity } from "./catalogos/catalogo-tipo-moneda.entity";
import { CatalogoTipoProyectoEntity } from "./catalogos/catalogo-tipo-proyecto.entity";
import { CatalogoLocalidadEntity } from "./catalogos/catalogo-localidad.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { MediaEntity } from './media.entity';

export interface ProyectoEntity {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    totalVotos?: number,
    actualizado?: boolean,
    paticipantes?: Array<ParticipanteProyectoEntity>,
    recomendadoAdmin?: boolean,
    valorEstimado?: number,
    tipo?: CatalogoTipoProyectoEntity,
    perfil?: PerfilEntity,
    adjuntos?: Array<AlbumEntity>,
    localidad?: CatalogoLocalidadEntity,
    votos?: Array<VotoProyectoEntity>,
    traducciones?: Array<TraduccionProyectoEntity>,
    estrategia?: EstrategiaEntity,
    comentarios?: Array<ComentarioEntity>,
    moneda?: CatalogoTipoMonedaEntity,
    medias?: Array<MediaEntity>,
}

export interface TraduccionProyectoEntity{
    _id?: string
    titulo?:string
    tituloCorto?:string
    descripcion?: string
    tags?:Array<string>
    idioma?:CatalogoIdiomaEntity
    original?:boolean
}