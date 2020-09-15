import { CodigosCatalogoEntidad } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum"
import { Injectable } from '@angular/core';

export interface ItemResultadoBusqueda {
    icono?: any,
    titulo?: string,
    subtitulo?: string,
    accion?: Function
    tipo?: CodigosCatalogoEntidad
}


