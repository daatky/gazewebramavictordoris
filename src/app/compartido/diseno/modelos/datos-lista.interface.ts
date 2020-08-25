import { TamanoLista } from "../enums/tamano-lista.enum";

export interface DatosLista {
    cargando?: boolean, //True = mostrar el cargando; false= esconde cargando    
    error?: string, //En caso de existir un error enviar el error en esta variable caso contrario enviar vacio
    lista?: Array<any>, //La lista que voy a mostrar    
    cargarMas?: Function, //Para ejecutar el metodo en el padre del componete que carga la lista
    reintentar?: Function, //Para ejecutar el metodo en el padre del componete que carga la lista
    dataConfiguracion?: any, //Informacion como stylos que necesita la lista,
    tamanoLista?:TamanoLista,
}
