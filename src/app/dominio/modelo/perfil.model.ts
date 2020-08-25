import { AsociacionEntity } from './../entidades/asociacion.entity';
import { NoticiaEntity } from './../entidades/noticia.entity';
import { PensamientoEntity } from './../entidades/pensamiento.entity';
import { ProyectoEntity } from './../entidades/proyecto.entity';
import { TelefonoEntity } from './../entidades/telefono.entity';
import { DireccionEntity } from './../entidades/direccion.entity';
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity';
import { AlbumEntity } from './../entidades/album.entity';
import { UsuarioEntity } from './../entidades/usuario.entity';
import { CatalogoTipoPerfilEntity } from './../entidades/catalogos/catalogo-tipo-perfil.entity';

export interface PerfilModel {
    id?: string,
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