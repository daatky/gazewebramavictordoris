import { CodigosCatalogoTipoProyecto } from './../../nucleo/servicios/remotos/codigos-catalogos/codigos-catalogo-tipo-proyecto.enum';
import { Injectable } from "@angular/core"
import { ProyectoModel } from "../modelo/proyecto.model";
import { ProyectoRepository } from "../repositorio/proyecto.repository";
import { PerfilModel } from '../modelo/entidades/perfil.model';

@Injectable({ providedIn: 'root'})
export class ProyectoNegocio {

    constructor(
        private proyectoRepository: ProyectoRepository
    ) {

    }

    guardarProyectoActivoEnLocalStorage(proyecto: ProyectoModel) {
        this.proyectoRepository.guardarProyectoActivoEnLocalStorage(proyecto)
    }

    obtenerProyectoActivoDelLocalStorage(): ProyectoModel {
        return this.proyectoRepository.obtenerProyectoActivoDelLocalStorage()
    }

    validarProyectoActivoSegunAccionCrear(
        codigoTipoProyecto: CodigosCatalogoTipoProyecto,
        perfil: PerfilModel
    ): ProyectoModel {
        let proyecto: ProyectoModel = this.obtenerProyectoActivoDelLocalStorage()
        if (!proyecto) {
            proyecto = {
                id: '',
                tituloCorto: '',
                titulo: '',
                localidad: {
                    codigo: '',
                    codigoPostal: '',
                    nombre: '',
                    pais: {
                        codigo: '',
                        nombre: '',
                    }
                },
                adjuntos: [],
                valorEstimado: 0,
                tipo: {
                    codigo: codigoTipoProyecto
                },
                perfil: perfil,
                descripcion: '',
                medias: [],
                moneda: {
                    codigo: ''
                },
            }
            this.guardarProyectoActivoEnLocalStorage(proyecto)
        }

        return proyecto
    }
}