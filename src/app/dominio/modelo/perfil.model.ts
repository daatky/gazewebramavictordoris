import { TelefonoModel } from './telefono.model';
import { DireccionModel } from './direccion.model';
import { AlbumModel } from './album.model';
import { UsuarioModel } from './usuario.model';
import { CatalogoTipoPerfilModel } from './catalogo-tipo-perfil.model'
import { AsociacionEntity } from './../entidades/asociacion.entity'
import { NoticiaEntity } from './../entidades/noticia.entity'
import { PensamientoEntity } from './../entidades/pensamiento.entity'
import { ProyectoEntity } from './../entidades/proyecto.entity'
import { TelefonoEntity } from './../entidades/telefono.entity'
import { DireccionEntity } from './../entidades/direccion.entity'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { AlbumEntity } from './../entidades/album.entity'
import { UsuarioEntity } from './../entidades/usuario.entity'

export interface PerfilModel {
    _id?: string,
    nombreContacto?: string,
    nombre?: string,
    tipoPerfil?: CatalogoTipoPerfilModel,
    usuario?: UsuarioModel,
    albums?: Array<AlbumModel>,
    estado?: CatalogoEstadoEntity,
    direcciones?: Array<DireccionModel>,
    telefonos?: Array<TelefonoModel>,
    // Pendiente las opciones de abajo de crear modelos cuando se vaya a utilizar, por ahora dejo con la entidad
    proyectos?: Array<ProyectoEntity>,
    pensamientos?: Array<PensamientoEntity>,
    noticias?: Array<NoticiaEntity>,
    asociaciones?: Array<AsociacionEntity>,
}