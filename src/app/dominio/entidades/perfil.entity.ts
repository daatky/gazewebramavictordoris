import { UsuarioEntity } from "./usuario.entity";
import { AlbumEntity } from "./album.entity"
import { TelefonoEntity } from "./telefono.entity"
import { DireccionEntity } from "./direccion.entity";
import { ProyectoEntity } from "./proyecto.entity";
import { PensamientoEntity } from "./pensamiento.entity";
import { AsociacionEntity } from "./asociacion.entity";
import { NoticiaEntity } from "./noticia.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoTipoPerfilEntity } from "./catalogos/catalogo-tipo-perfil.entity";

export interface PerfilEntity {
  _id?: string,
  nombreContacto?: string,
  nombre?: string,
  tipoPerfil?: CatalogoTipoPerfilEntity,
  usuario?: UsuarioEntity,
  albums?: Array<AlbumEntity>[],
  estado?: CatalogoEstadoEntity,
  direcciones?: Array<DireccionEntity>[],
  telefonos?: Array<TelefonoEntity>[],
  proyectos?: Array<ProyectoEntity>[],
  pensamientos?: Array<PensamientoEntity>[],
  noticias?: Array<NoticiaEntity>[],
  asociaciones?: Array<AsociacionEntity>[],
  fechaCreacion?: Date,
  fechaActualizacion?: Date
}

export interface PerfilCrearCuentaEntity {
  nombreContacto: string,
  nombre: string,
  tipoPerfil: string,
  albums: Array<AlbumEntity>[]
}