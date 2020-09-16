import { AlbumNegocio } from './../../../dominio/logica-negocio/album.negocio';
import { CatalogoTipoPerfilModel } from './../../../dominio/modelo/catalogos/catalogo-tipo-perfil.model';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { GeneradorId } from './generador-id.service';
import { DireccionModel } from '../../../dominio/modelo/entidades/direccion.model';
import { ItemSelector } from './../../../compartido/diseno/modelos/elegible.interface';
import { CodigosCatalogoTipoAlbum } from './../remotos/codigos-catalogos/catalogo-tipo-album.enum';
import { MediaModel } from '../../../dominio/modelo/entidades/media.model';
import { PerfilModel } from '../../../dominio/modelo/entidades/perfil.model';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { CodigosCatalogoEntidad, AccionEntidad, AccionAlbum } from './../remotos/codigos-catalogos/catalogo-entidad.enum'
import { Injectable } from '@angular/core'
import { CodigosCatalogosEstadoPerfiles } from '../remotos/codigos-catalogos/catalogo-estado-perfiles.enun'
import { CodigosCatalogoTipoPerfil } from '../remotos/codigos-catalogos/catalogo-tipo-perfiles.enum'
import { UsuarioModel } from 'src/app/dominio/modelo/entidades/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';
import { AlbumModel } from 'src/app/dominio/modelo/entidades/album.model';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { Router } from '@angular/router';
import { TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';

/*
    - Interfaz para metodos auxiliares del componente registro (creacion, update)
*/

@Injectable({ providedIn: 'root' })
export class RegistroService {

    constructor(
        private cuentaNegocio: CuentaNegocio,
        private formBuilder: FormBuilder,
        private generadorId: GeneradorId,
        private perfilNegocio: PerfilNegocio,
        private albumNegocio: AlbumNegocio,
    ) {

    }

    // Define el uso del album segun la accion de la entidad desde la que se accede al perfil
    definirAccionDelAlbumSegunAccionEntidad(
        entidad: CodigosCatalogoEntidad,
        accionEntidad: AccionEntidad,
    ) : AccionAlbum {
        if (entidad === CodigosCatalogoEntidad.PERFIL) {
            if (accionEntidad === AccionEntidad.REGISTRO) {
                return AccionAlbum.CREAR
            }
            
            if (accionEntidad === AccionEntidad.CREAR || accionEntidad === AccionEntidad.ACTUALIZAR) {
                return AccionAlbum.ACTUALIZAR
            }
        }

        if (entidad === CodigosCatalogoEntidad.NOTICIA) {
            // Por definir
            return 
        }

        if (entidad === CodigosCatalogoEntidad.PROYECTO) {
            // Por definir
            return 
        }
    }

    // Inicializar controles para el formulario
    inicializarControlesDelFormulario(
      perfil: PerfilModel,
      session: boolean = true
    ) : FormGroup {
        // Definir email y contrasena
        const loginInfo = this.cuentaNegocio.obtenerEmailConContrasenaDelUsuario(session)

        let direccion = ''
        if (perfil && perfil.direcciones && perfil.direcciones.length > 0) {
            direccion = perfil.direcciones[0].descripcion
        }

        const registroForm:FormGroup = this.formBuilder.group({
            nombreContacto: [
                (perfil) ? perfil.nombreContacto : '',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-z0-9 ]+$'),
                    Validators.minLength(3)
                ],
            ],
            nombre: [
                (perfil) ? perfil.nombre : '',
                [
                    Validators.pattern('^[A-Za-z ]+$'),
                    Validators.minLength(3)
                ]
            ],
            email: [
                (loginInfo) ? loginInfo.email : '',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            contrasena: [
                (loginInfo) ? loginInfo.contrasena : '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(12),
                    Validators.pattern('^[A-Za-z0-9@]{8,12}$')
                ]
            ],
            direccion: [
                direccion,
                [
                    Validators.pattern('^[A-Za-z0-9-, ]+$')
                ]
            ]
        })

        return registroForm
    }

    // Inicializar inputs del formulario
    configurarInputsDelFormulario(
        registroForm: FormGroup
    ) : Array<InputCompartido> {
        let inputsForm: Array<InputCompartido> = []
        if (registroForm) {
            inputsForm.push({
                tipo: 'text',
                error: false,
                estilo: {
                    estiloError: EstiloErrorInput.ROJO,
                    estiloInput: EstiloInput.REGISTRO
                },
                placeholder: 'Contact Name',
                data: registroForm.controls.nombreContacto,
                contadorCaracteres: {
                    mostrar: false,
                    numeroMaximo: 40,
                    contador: 0
                },
                id: this.generadorId.generarIdConSemilla(),
                errorPersonalizado: '',
                soloLectura: false
            })
            inputsForm.push({
                tipo: 'text',
                error: false,
                estilo: {
                    estiloError: EstiloErrorInput.ROJO,
                    estiloInput: EstiloInput.REGISTRO
                },
                placeholder: 'Name:',
                data: registroForm.controls.nombre,
                contadorCaracteres: {
                    mostrar: false,
                    numeroMaximo: 40,
                    contador: 0
                },
                id: this.generadorId.generarIdConSemilla(),
                errorPersonalizado: '',
                soloLectura: false
            })
            inputsForm.push({
                tipo: 'email',
                error: false,
                estilo: {
                    estiloError: EstiloErrorInput.ROJO,
                    estiloInput: EstiloInput.REGISTRO
                },
                placeholder: 'E-mail:',
                data: registroForm.controls.email,
                id: this.generadorId.generarIdConSemilla(),
                errorPersonalizado: '',
                soloLectura: false
            })
            inputsForm.push({
                tipo: 'password',
                error: false,
                estilo: {
                    estiloError: EstiloErrorInput.ROJO,
                    estiloInput: EstiloInput.REGISTRO
                },
                placeholder: 'Password:',
                data: registroForm.controls.contrasena,
                id: this.generadorId.generarIdConSemilla(),
                errorPersonalizado: '',
                soloLectura: false
            })
            inputsForm.push({
                tipo: 'text',
                error: false,
                estilo: {
                    estiloError: EstiloErrorInput.ROJO,
                    estiloInput: EstiloInput.REGISTRO
                },
                placeholder: 'Address:',
                data: registroForm.controls.direccion,
                id: this.generadorId.generarIdConSemilla(),
                errorPersonalizado: '',
                soloLectura: false
            })
        }
        return inputsForm
    }

    // Devuelve la portada del album segun el tipo del mismo
    obtenerPortadaAlbumSegunTipoDelAlbum(
        perfil: PerfilModel,
        tipoAlbum: CodigosCatalogoTipoAlbum
    ) : AlbumModel {
        let portadaPerfil: AlbumModel
        if (perfil && perfil.album) {
            perfil.album.forEach(item => {
                if (item && item.tipo.codigo === tipoAlbum) {
                portadaPerfil = item
                }
            })
        }
        return portadaPerfil
    }

    // Definir data segun portada
    definirDataItemSegunPortadaAlbum(
        album: AlbumModel
    ) : { urlMedia: string, mostrarBoton: boolean, mostrarLoader: boolean } {
        let data = {
            urlMedia: '',
            mostrarBoton: true,
            mostrarLoader: false,
        }
        if (album && album.portada && album.portada.principal && album.portada.principal.url.length > 0) {
            data.urlMedia = album.portada.principal.url
            data.mostrarBoton = false
            data.mostrarLoader = true
        }

        return data
    }

    // Obtener info ubicacion: Pais
    obtenerInformacionDeUbicacion(
        direcciones: Array<DireccionModel>,
        query: boolean = true, // True = pais, false = localidad
    ) : ItemSelector {
        let item: ItemSelector = {
            codigo: '',
            nombre: '',
            auxiliar: ''
        }
        // Si existe la direccion
        if (direcciones && direcciones.length > 0) {
            if (query) {
                // Info del pais
                item.codigo = direcciones[0].localidad.pais.codigo
                item.nombre = direcciones[0].localidad.pais.nombre
            } else {
                // Info de la localidad
                item.codigo = direcciones[0].localidad.codigo
                item.nombre = direcciones[0].localidad.nombre
                item.auxiliar = direcciones[0].localidad.codigoPostal
            }
        }
        return item
    }

    navegarAlRegistro(
        accionEntidad: AccionEntidad,
        codigoPerfil: CodigosCatalogoTipoPerfil,
        router: Router
    ) {
        let ruta = RutasLocales.REGISTRO.toString()
        ruta = ruta.replace(':accionEntidad', accionEntidad)
        ruta = ruta.replace(':codigoPerfil', codigoPerfil)
        router.navigateByUrl(ruta)
    }

    obtenerParametrosDelAppBarSegunAccionEntidad(
        codigoPerfil: string,
        accionEntidad: AccionEntidad
    ) : {
        mostrarSearchBar: boolean,
        mostrarTextoHome: boolean,
        llaveSubtitulo: string,
        mostrarNombrePerfil: boolean,
        llaveTextoNombrePerfil: string
     } {
        let appbar = {
            mostrarSearchBar: false,
            mostrarTextoHome: false,
            llaveSubtitulo: '',
            mostrarNombrePerfil: false,
            llaveTextoNombrePerfil: ''
        }

        switch (accionEntidad) {
            case AccionEntidad.REGISTRO:
                appbar.mostrarTextoHome = false
                appbar.llaveSubtitulo = this.perfilNegocio.obtenerLlaveSegunCodigoPerfil(codigoPerfil as CodigosCatalogoTipoPerfil)
                appbar.mostrarNombrePerfil = false
                break
            case AccionEntidad.CREAR:
                appbar.mostrarSearchBar = true
                appbar.mostrarTextoHome = true
                appbar.llaveSubtitulo = 'actualizar'
                appbar.mostrarNombrePerfil = true
                appbar.llaveTextoNombrePerfil = this.perfilNegocio.obtenerLlaveSegunCodigoPerfil(codigoPerfil as CodigosCatalogoTipoPerfil)
                break
            case AccionEntidad.ACTUALIZAR:
                appbar.mostrarSearchBar = true
                appbar.mostrarTextoHome = true
                appbar.llaveSubtitulo = 'actualizar'
                appbar.mostrarNombrePerfil = true
                appbar.llaveTextoNombrePerfil = this.perfilNegocio.obtenerLlaveSegunCodigoPerfil(codigoPerfil as CodigosCatalogoTipoPerfil)
                break
            default: break
        }

        return appbar
    }

    // Obtener pais seleccionado en caso de existir o no
    obtenerPaisSeleccionadoEnElPerfil(
        perfil: PerfilModel
    ) : ItemSelector {
        let item: ItemSelector = null
        if (perfil && perfil.direcciones && perfil.direcciones.length > 0) {
            item = {
                codigo: perfil.direcciones[0].localidad.pais.codigo,
                nombre: perfil.direcciones[0].localidad.pais.nombre,
            }
        }

        return item
    }

    validarPerfilParaDestruir(
        accionEntidad: AccionEntidad,
        codigoPerfil: string,
        tipoPerfil: CatalogoTipoPerfilModel,
        perfil: PerfilModel
    ) {
        if (perfil && tipoPerfil) {
            switch (accionEntidad) {
                case AccionEntidad.REGISTRO:
                    this.cuentaNegocio.validarEstadoPerfilParaDestruir(codigoPerfil, perfil.estado.codigo as CodigosCatalogosEstadoPerfiles)
                    break
                case AccionEntidad.CREAR:
                    // Pendiente de determinar caso al hacer back
                    break
                case AccionEntidad.ACTUALIZAR:
                    this.perfilNegocio.removerPerfilActivoDelLocalStorage()
                    break
                default: break;
            }
        }
    }

    validarAlbumSegunAccionEntidad(
        tipoAlbum: CodigosCatalogoTipoAlbum,
        perfil: PerfilModel,
        accionEntidad: AccionEntidad
    ) {
        switch (accionEntidad) {
            case AccionEntidad.REGISTRO:
                this.albumNegocio.validarAlbumSegunTipoEnSessionStorage(tipoAlbum, perfil)
                break
            case AccionEntidad.CREAR:
                this.albumNegocio.validarAlbumEnPerfilActivo(tipoAlbum, perfil)
                break
            case AccionEntidad.ACTUALIZAR:
                this.albumNegocio.validarAlbumEnPerfilActivo(tipoAlbum, perfil)
                break
            default: break;
        }
    }

}