import { EstiloInput } from "../enums/estilo-input.enum"
import { EstiloErrorInput } from "../enums/estilo-error-input.enum"

export interface InputCompartido{
    placeholder?:string, //Texto del placeholder del input
    estilo?:TipoEstilo, //Estilo que tiene se le va a dar un input
    tipo?:string, //Typo text, password, email etc
    error?:boolean, //Enviar por defecto false y cuando el usuario no presione el input y al presionar un boton enviar true
    //error:string,
    data?:any,
    contadorCaracteres?: { // Data para el contador de caracteres
        mostrar: boolean,
        numeroMaximo: number,
        contador: number,
    },
    id?: string, // identificador unico del input
    validarCampo?: {
        validar: boolean,
        validador?: Function // Validar campo
    },
    errorPersonalizado?: string,
}
export interface TipoEstilo{
    estiloInput:EstiloInput,
    estiloError:EstiloErrorInput
}