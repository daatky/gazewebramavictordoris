import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { ProyectoModel } from './../../../dominio/modelo/proyecto.model';
import { MetodosLocalStorageService } from './../../util/metodos-local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProyectoServiceLocal {

    constructor(
        private metodosLocalStorageService:MetodosLocalStorageService
    ) {

    }

    guardarProyectoActivoEnLocalStorage(proyecto: ProyectoModel) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.PROYECTO_ACTIVO, proyecto)
    }

    obtenerProyectoActivoDelLocalStorage(): ProyectoModel {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.PROYECTO_ACTIVO)
    }

}