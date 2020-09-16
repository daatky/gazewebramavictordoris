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
        validar: boolean, // Indica si se debe o no validar el valor del campo al perder el focus
        validador?: Function // Validar campo
    },
    errorPersonalizado?: string, // Cuando se requiere mostrar un error personalizado
    soloLectura?:boolean, // true indica que el input es de solo lectura, false indica que el input es editable
}
export interface TipoEstilo{
    estiloInput:EstiloInput,
    estiloError:EstiloErrorInput
}