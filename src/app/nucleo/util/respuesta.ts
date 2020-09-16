export interface RespuestaRemota<T> extends RespuestaCompletaRemota{
    codigoEstado: any
    respuesta: {
        datos: T
        mensaje?: string;
    }
}

export interface RespuestaCompletaRemota{
    totalDatos:number
    totalPaginas:number
    proximaPagina:boolean
    anteriorPagina:boolean
}
