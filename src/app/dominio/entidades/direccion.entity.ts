import { CatalogoIdiomaEntity } from './catalogos/catalogo-idioma.entity';
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoLocalidadEntity } from "./catalogos/catalogo-localidad.entity";
import { DireccionModel } from '../modelo/direccion.model';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';

export interface DireccionEntity {
    id?: string,
    estado?: CatalogoEstadoEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    latitud?: number,
    longitud?: number,
    traducciones?: Array<TraduccionDireccionEntity>,
    localidad: CatalogoLocalidadEntity,
}

export interface TraduccionDireccionEntity {
    id?: string,
    descripcion?: string,
    idioma?: CatalogoIdiomaEntity,
    original?: boolean
}