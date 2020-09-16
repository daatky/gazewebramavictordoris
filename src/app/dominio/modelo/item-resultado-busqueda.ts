import { CodigosCatalogoEntidad } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum"
import { Injectable } from '@angular/core';

export interface ItemResultadoBusqueda<T> {
    icono?: any,
    titulo?: string,
    subtitulo?: string,
    tipo?: CodigosCatalogoEntidad
    item: T
}


