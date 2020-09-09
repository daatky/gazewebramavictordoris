import { AlbumModel } from './../modelo/album.model';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { CodigosCatalogosEstadoPerfiles } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun';
import { CuentaNegocio } from './cuenta.negocio';
import { UsuarioModel } from './../modelo/usuario.model';
import { PerfilModel } from './../modelo/perfil.model';
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators'
import { PagoRepository } from "../repositorio/pago.repository";
import { CatalogoMetodoPagoEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { CatalogoTipoPerfilEntity } from "../entidades/catalogos/catalogo-tipo-perfil.entity";
import { PerfilRepository } from "../repositorio/perfil.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogo-tipo-perfil.model';

@Injectable({
    providedIn: 'root'
})
export class PerfilNegocio {

    constructor(
        private perfilRepository: PerfilRepository,
        private cuentaNegocio: CuentaNegocio,
    ) {

    }

    obtenerCatalogoTipoPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        const data: CatalogoTipoPerfilModel[] = this.perfilRepository.obtenerCatalogoTipoPerfilLocal()
        if (data) {
            return of(data)
        } else {
            return this.perfilRepository.obtenerCatalogoTipoPerfil()
                .pipe(
                    map((data: CatalogoTipoPerfilModel[]) => {
                        this.almacenarCatalogoPerfiles(data);
                        return data;
                    }),
                    catchError(err => {
                        return throwError(err)
                    })
                )
        }
        //Se debe llenar el perfil con los datos de cuenta. 
    }

    obtenerCatalogoTipoPerfilConPerfil(): Observable<CatalogoTipoPerfilModel[]> {
        return this.obtenerCatalogoTipoPerfil().pipe(
            map((data: CatalogoTipoPerfilModel[]) => {
                let usuario = this.cuentaNegocio.obtenerUsuarioDelLocalStorage();
                if (usuario) {
                    for (let perfil of usuario.perfiles) {
                        for (let tipo of data) {
                            if (tipo.codigo == perfil.tipoPerfil.codigo) {
                                tipo.perfil = perfil
                                break;
                            }
                        }
                    }
                }
                return data;
            }),
            catchError(err => {
                return throwError(err)
            })
        )
    }

    almacenarCatalogoPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        return this.perfilRepository.almacenarCatalogoPerfiles(tipoPerfiles);
    }

    obtenerCatalogoTipoPerfilLocal(): CatalogoTipoPerfilModel[] {
        return this.perfilRepository.obtenerCatalogoTipoPerfilLocal();
    }

    // Cambiar codigos quemados
    conflictoCrearPerfil(tipoPerfilCrear: CatalogoTipoPerfilModel, tipoPerfiles: CatalogoTipoPerfilModel[]) {
        if (tipoPerfilCrear.codigo == "TIPERFIL_4") {
            //Es perfil de grupo
            return tipoPerfiles.filter((p) => p.perfil != null && p.codigo != "TIPERFIL_4").length > 0;
        } else {
            //Es perfil normal
            return tipoPerfiles.filter((p) => p.perfil != null && p.codigo == "TIPERFIL_4").length > 0;
        }
    }

    limpiarPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        tipoPerfiles.forEach(tipoPerfil => tipoPerfil.perfil = null)
        this.almacenarCatalogoPerfiles(tipoPerfiles);
    }

    obtenerTipoPerfilSegunCodigo(codigoPerfil: string): CatalogoTipoPerfilModel {
        let tipoPerfil: CatalogoTipoPerfilModel
        const tipoPerfiles = this.obtenerCatalogoTipoPerfilLocal()
        tipoPerfiles.forEach(perfil => {
            if (perfil.codigo === codigoPerfil) {
                tipoPerfil = perfil
            }
        })
        return tipoPerfil
    }

    // Album del perfil
    guardarAlbumActivoEnSessionStorage(album: AlbumModel) {
        this.perfilRepository.guardarAlbumActivoEnSessionStorage(album)
    }

    obtenerAlbumActivoDelSessionStorage(): AlbumModel {
        return this.perfilRepository.obtenerAlbumActivoDelSessionStorage()
    }

    validarPerfilModelDelSessionStorage(codigoPerfil: string): PerfilModel {
        const usuario: UsuarioModel = this.cuentaNegocio.validarUsuarioDelSesionStorage(codigoPerfil)
        let perfil: PerfilModel
        usuario.perfiles.forEach(item => {
            if (item.tipoPerfil.codigo === codigoPerfil) {
                perfil = item
            }
        })

        // Si el perfil no existe, se crea y se actualiza el usuario
        if (!perfil) {
            perfil = {
                _id: '',
                nombre: '',
                nombreContacto: '',
                direcciones: [],
                telefonos: [],
                tipoPerfil: this.obtenerTipoPerfilSegunCodigo(codigoPerfil),
                estado: {
                    codigo: CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR
                },
                album: []
            }
            usuario.perfiles.push(perfil)
            this.cuentaNegocio.guardarUsuarioEnSessionStorage(usuario)
        }
        return perfil
    }

    actualizarPerfilEnUsuarioDelSessionStorage(perfil: PerfilModel) {
        const usuario: UsuarioModel = this.cuentaNegocio.validarUsuarioDelSesionStorage(perfil.tipoPerfil.codigo)
        let pos = -1
        usuario.perfiles.forEach((item, i) => {
            if (item.tipoPerfil.codigo === perfil.tipoPerfil.codigo) {
                pos = i
            }
        })
        if (pos >= 0) {
            usuario.perfiles[pos] = perfil
        }
        this.cuentaNegocio.guardarUsuarioEnSessionStorage(usuario)
    }

    insertarAlbunEnPerfilDelSessionStorage(codigoPerfil: string, album: AlbumModel) {
        const perfil: PerfilModel = this.validarPerfilModelDelSessionStorage(codigoPerfil)
        console.log(perfil)
        if (perfil) {
            let pos = -1
            perfil.album.forEach((item, i) => {
                if (item && item.tipo.codigo === album.tipo.codigo) {
                    pos = i
                }
            })
            // Si el album existe, se actualizar, caso contrario se inserta
            if (pos >= 0) {
                console.log('album ya esta creado, actualizando')
                perfil.album[pos] = album
            } else {
                console.log('album no creado, insertando')
                perfil.album.push(album)
            }
            // actualizar usuario
            this.actualizarPerfilEnUsuarioDelSessionStorage(perfil)
            this.perfilRepository.guardarAlbumActivoEnSessionStorage(null)
        }
    }

    validarAlbumSegunTipo(tipo: CodigosCatalogoTipoAlbum, perfil: PerfilModel) {
        let album: AlbumModel
        perfil.album.forEach(item => {
            if (item && item.tipo.codigo === tipo) {
                album = item
            }
        })
        // Si el album no existe, se crea y se actualiza el perfil en el usuario
        if (!album) {
            console.log('album no existe, creando')
            album = {
                id: '',
                portada: {},
                tipo: {
                    codigo: tipo,
                },
                media: []
            }
            perfil.album.push(album)
            this.actualizarPerfilEnUsuarioDelSessionStorage(perfil)
        }
        // Definir album activo
        this.guardarAlbumActivoEnSessionStorage(album)
    }

}