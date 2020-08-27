export interface RespuestaRemota<T> {
    codigoEstado: any
    respuesta: {
        datos: T
        mensaje?: string;
    }
}


