import { ItemSelector } from './../../compartido/diseno/modelos/elegible.interface';
import { CodigosCatalogoTipoPerfil } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { AlbumModel } from '../modelo/entidades/album.model';
import { CodigosCatalogoTipoAlbum } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { CodigosCatalogosEstadoPerfiles } from './../../nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun';
import { CuentaNegocio } from './cuenta.negocio';
import { UsuarioModel } from '../modelo/entidades/usuario.model';
import { PerfilModel } from '../modelo/entidades/perfil.model';
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators'
import { PagoRepository } from "../repositorio/pago.repository";
import { CatalogoMetodoPagoEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity';
import { CatalogoTipoPerfilEntity } from "../entidades/catalogos/catalogo-tipo-perfil.entity";
import { PerfilRepository } from "../repositorio/perfil.repository";
import { CatalogoTipoPerfilModel } from '../modelo/catalogos/catalogo-tipo-perfil.model';
import { AccionEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { FormGroup } from '@angular/forms';
import { DireccionModel } from '../modelo/entidades/direccion.model';

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

    obtenerCatalogoTipoPerfilConPerfil(session: boolean = true): Observable<CatalogoTipoPerfilModel[]> {
        return this.obtenerCatalogoTipoPerfil().pipe(
            map((data: CatalogoTipoPerfilModel[]) => {
                let usuario = (session) ? this.cuentaNegocio.obtenerUsuarioDelSessionStorage() : this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
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

    validarPerfilModelDelSessionStorage(codigoPerfil: string): PerfilModel {
        const usuario: UsuarioModel = this.cuentaNegocio.validarUsuarioDelSesionStorage(codigoPerfil)
        let perfil: PerfilModel
        if (usuario) {
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
        }
        return perfil
    }

    obtenerIdDelPerfilSeleccionado(): string {
        const perfil: PerfilModel = this.perfilRepository.obtenerPerfilSeleccionado()
        let id = ''
        if (perfil) {
            id = perfil._id
        }
        return id
    }

    obtenerDatosDelPerfil(id: string): Observable<PerfilModel> {
        return this.perfilRepository.obtenerDatosDelPerfil(id)
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

    almacenarPerfilSeleccionado(tipoPerfil: CatalogoTipoPerfilModel) {
        if (tipoPerfil.perfil) {
            (tipoPerfil.perfil as PerfilModel).tipoPerfil.nombre = tipoPerfil.nombre
        }
        this.perfilRepository.almacenarPerfilSeleccionado(tipoPerfil.perfil);
    }

    obtenerPerfilSeleccionado(): PerfilModel {
        return this.perfilRepository.obtenerPerfilSeleccionado();
    }

    validarNombreDeContactoUnico(nombreContacto: string): Observable<string> {
        return this.perfilRepository.validarNombreDeContactoUnico(nombreContacto)
    }

    guardarPerfilActivoEnLocalStorage(perfil: PerfilModel) {
        this.perfilRepository.guardarPerfilActivoEnLocalStorage(perfil)
    }

    obtenerPerfilActivoDelLocalStorage(): PerfilModel {
        return this.perfilRepository.obtenerPerfilActivoDelLocalStorage()
    }

    removerPerfilActivoDelLocalStorage() {
        this.perfilRepository.removerPerfilActivoDelLocalStorage()
    }

    // Devuelve la llave de la traduccion del texto segun el tipo de perfil
    obtenerLlaveSegunCodigoPerfil(
        codigoPerfil: CodigosCatalogoTipoPerfil
    ) {
        switch (codigoPerfil) {
            case CodigosCatalogoTipoPerfil.CLASSIC:
                return 'clasico'
            case CodigosCatalogoTipoPerfil.PLAYFUL:
                return 'ludico'
            case CodigosCatalogoTipoPerfil.SUBSTITUTE:
                return 'sustituto'
            case CodigosCatalogoTipoPerfil.GROUP:
                return 'grupo'
            default:
                return ''
        }
    }

    validarOrigenPerfilActivo(id: string) : Observable<PerfilModel> {
        let perfil: PerfilModel = this.obtenerPerfilActivoDelLocalStorage()
        if (perfil) {
            return of(perfil)
        } else {
            return this.obtenerDatosDelPerfil(id)
        }
    }

    // Actualizar perfil antes de pasar a albunes
    guardarInformacionPerfilSegunAccionRegistro(
        perfil: PerfilModel,
        estadoPerfil: CodigosCatalogosEstadoPerfiles,
        codigoPerfil: string,
        registroForm: FormGroup,
        paisSeleccionado: ItemSelector,
        localidadSeleccionada: ItemSelector,
        codigoPostale: string,
    ) {
        const usuario: UsuarioModel = this.cuentaNegocio.validarUsuarioDelSesionStorage(codigoPerfil)
        const { contrasena, direccion, email, nombre, nombreContacto } = registroForm.value
        const itemPais = paisSeleccionado
        const itemLocalidad = localidadSeleccionada
        const codigoPostal = codigoPostale

        // Asignar data
        perfil.nombreContacto = nombreContacto
        perfil.nombre = nombre
        perfil.direcciones[0] = {
            descripcion: direccion,
            localidad: {
                nombre: (itemLocalidad) ? itemLocalidad.nombre : '',
                codigo: (itemLocalidad) ? itemLocalidad.codigo : '',
                pais: {
                    codigo: (itemPais) ? itemPais.codigo : '',
                    nombre: (itemPais) ? itemPais.nombre : ''
                },
                codigoPostal: codigoPostal,
            }
        }
        // Se cambia el estado a creado
        perfil.estado.codigo = estadoPerfil

        let pos = -1
        usuario.perfiles.forEach((perfil, i) => {
            if (perfil.tipoPerfil.codigo === perfil.tipoPerfil.codigo) {
                pos = i
            }
        })

        if (pos >= 0) {
            usuario.perfiles[pos] = perfil
        } else {
            usuario.perfiles.push(perfil)
        }

        // Actualizar email y contrasena
        usuario.email = email
        usuario.contrasena = contrasena
        this.cuentaNegocio.guardarUsuarioEnSessionStorage(usuario)
    }

    // Actualizar perfil antes de pasar a albunes
    guardarInformacionPerfilSegunAccionActualizar(
        perfil: PerfilModel,
        registroForm: FormGroup,
        paisSeleccionado: ItemSelector,
        localidadSeleccionada: ItemSelector,
        codigoPostale: string,
    ) {
        const { direccion, nombre, nombreContacto } = registroForm.value
        const itemPais = paisSeleccionado
        const itemLocalidad = localidadSeleccionada
        const codigoPostal = codigoPostale

        // Asignar data
        perfil.nombreContacto = nombreContacto
        perfil.nombre = nombre
        // Direcciones
        perfil.direcciones[0] = {
            _id: perfil.direcciones[0]?._id,
            descripcion: direccion,
            localidad: {
                nombre: (itemLocalidad) ? itemLocalidad.nombre : '',
                codigo: (itemLocalidad) ? itemLocalidad.codigo : '',
                pais: {
                    codigo: (itemPais) ? itemPais.codigo : '',
                    nombre: (itemPais) ? itemPais.nombre : ''
                },
                codigoPostal: codigoPostal,
            }
        }
        
        this.guardarPerfilActivoEnLocalStorage(perfil)
    }

    guardarInformacionPerfilSegunAccionCrear(
        perfil: PerfilModel,
        registroForm: FormGroup,
        paisSeleccionado: ItemSelector,
        localidadSeleccionada: ItemSelector,
        codigoPostale: string,
        estadoPerfil: CodigosCatalogosEstadoPerfiles
    ) {
        const { direccion, nombre, nombreContacto } = registroForm.value
        const itemPais = paisSeleccionado
        const itemLocalidad = localidadSeleccionada
        const codigoPostal = codigoPostale

        // Asignar data
        perfil.estado.codigo = estadoPerfil
        perfil.nombreContacto = nombreContacto
        perfil.nombre = nombre
        // Direcciones
        perfil.direcciones[0] = {
            _id: perfil.direcciones[0]?._id,
            descripcion: direccion,
            localidad: {
                nombre: (itemLocalidad) ? itemLocalidad.nombre : '',
                codigo: (itemLocalidad) ? itemLocalidad.codigo : '',
                pais: {
                    codigo: (itemPais) ? itemPais.codigo : '',
                    nombre: (itemPais) ? itemPais.nombre : ''
                },
                codigoPostal: codigoPostal,
            }
        }
        
        this.guardarPerfilActivoEnLocalStorage(perfil)
    }

    actualizarPerfil(perfil: PerfilModel): Observable<PerfilModel> {
        return this.perfilRepository.actualizarPerfil(perfil)
    }

    actualizarDataDelPerfilEnElUsuarioDelLocalStorage(
        perfil: PerfilModel
    ) {
        const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
        if (usuario) {
            usuario.perfiles.forEach(item => {
                if (item && item.tipoPerfil.codigo === perfil.tipoPerfil.codigo) {
                    item.estado.codigo = perfil.estado.codigo
                    item.nombre = perfil.nombre
                    item.nombreContacto = perfil.nombreContacto
                }
            })
            this.cuentaNegocio.guardarUsuarioEnLocalStorage(usuario)
        }
    }

    eliminarDataDelPerfilEnElUsuarioDelLocalStorage(
        perfil: PerfilModel
    ) {
        const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
        if (usuario) {
            let pos = -1
            usuario.perfiles.forEach((item, i) => {
                if (item.tipoPerfil.codigo === perfil.tipoPerfil.codigo) {
                    pos = i
                }
            })
            if (pos >= 0) {
                usuario.perfiles.splice(pos, 1)
            }
            this.cuentaNegocio.guardarUsuarioEnLocalStorage(usuario)
        }
    }

    eliminarHibernarElPerfil(perfil: PerfilModel) : Observable<object> {
        return this.perfilRepository.eliminarHibernarElPerfil(perfil)
    }

    inicializarPerfilActivoParaAccionCrear(tipoPerfil: CatalogoTipoPerfilModel): PerfilModel {
        let perfil : PerfilModel = this.obtenerPerfilActivoDelLocalStorage()
        if (!perfil) {
            perfil = {
                _id: '',
                nombre: '',
                nombreContacto: '',
                direcciones: [],
                telefonos: [],
                tipoPerfil: tipoPerfil,
                estado: {
                    codigo: CodigosCatalogosEstadoPerfiles.PERFIL_SIN_CREAR
                },
                album: []
            }
            this.guardarPerfilActivoEnLocalStorage(perfil)
        }
        return perfil
    }

    insertarPerfilEnElUsuario(perfil: PerfilModel) {
        const usuario: UsuarioModel = this.cuentaNegocio.obtenerUsuarioDelLocalStorage()
        if (usuario) {
            usuario.perfiles.push({
                _id: perfil._id,
                nombre: perfil.nombre,
                nombreContacto: perfil.nombreContacto,
                tipoPerfil: perfil.tipoPerfil,
                estado: perfil.estado
            })
            this.cuentaNegocio.guardarUsuarioEnLocalStorage(usuario)
        }
    }

    crearPerfilEnElUsuario(perfil: PerfilModel, usuario: UsuarioModel): Observable<PerfilModel> {
        return this.perfilRepository.crearPerfilEnElUsuario(perfil, usuario)
    }

    activarPerfil(perfil: PerfilModel): Observable<object> {
        return this.perfilRepository.activarPerfil(perfil)
    }

}