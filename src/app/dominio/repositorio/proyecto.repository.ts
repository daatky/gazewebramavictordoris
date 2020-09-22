import { Injectable } from "@angular/core";
import { ProyectoServiceLocal } from "../../nucleo/servicios/locales/proyectos.service";
import { ProyectoServiceRemoto } from "../../nucleo/servicios/remotos/proyectos.service";
import { ProyectoModel } from "../modelo/proyecto.model";

@Injectable({ providedIn: 'root'})
export class ProyectoRepository {


    constructor(
        private proyectoServiceRemoto: ProyectoServiceRemoto,
        private proyectoServiceLocal: ProyectoServiceLocal,
    ) {

    }

    guardarProyectoActivoEnLocalStorage(proyecto: ProyectoModel) {
        this.proyectoServiceLocal.guardarProyectoActivoEnLocalStorage(proyecto)
    }

    obtenerProyectoActivoDelLocalStorage(): ProyectoModel {
        return this.proyectoServiceLocal.obtenerProyectoActivoDelLocalStorage()
    }

}