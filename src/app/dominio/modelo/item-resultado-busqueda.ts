import { CodigosCatalogoEntidad } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum"

export interface ItemResultadoBusqueda {
    icono: any,
    titulo: string,
    subtitulo: string,
    accion: Function
    tipo: CodigosCatalogoEntidad
}