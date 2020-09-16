import { TipoInput } from "../enums/tipo-input.enum";

export interface BarraInferior {
    input?:ConfiguracionInput, //PARA ENVIAR LAS CONFIGURACIONES Y EL INPUT QUE SE VA MOSTRAR
    icono?:ConfiguracionIcono, //PARA ENVIAR LAS CONFIGURACION Y EL ICONO QUE SE DEBE MOSTRAR
    activarBarra?:boolean, //PARA INACTIVAR O ACTIVAR LA BARRA INFERIORE
    variosIconos?:boolean,//PARA SABER SI EL LA BARRA TIENE VARIOS ICONOS
    enviar?:Function,
    presentarContador?:boolean
}

export interface ConfiguracionInput{
    maximo?:number,
    placeholder?:string,
    data?:DataBarraInferior,    
    tipo?:TipoInput
}
//Cuando se agrege varios icono CONFIGURAR 
export interface ConfiguracionIcono{

}

export interface DataBarraInferior{
    indice?:number,
    texto:string,
    id?:string
}