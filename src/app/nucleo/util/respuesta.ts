export interface RespuestaRemota<T> {
    codigoEstado: any
    respuesta: {
        datos: T
        error?: string;
        mensaje?: string;
        token?: string
        estado?: any
    }
}


