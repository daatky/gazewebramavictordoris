import { MensajeError } from './error.interface'
import { ItemSelector } from './elegible.interface'

export interface BuscadorModalInput {
    placeholder: string, // Placeholder del input donde se ingresa el texto que se va a mandar a buscar
    valor: string, // Texto que se va a mandar a buscar
}

export interface BuscadorModalInputPreview {
    mostrar: boolean, // Mostrar input con el valor de busqueda seleccionado en el componente padre
    input: BuscadorModalInput, // 
}

export interface BuscadorModalResultado {
    mostrarElegibles: boolean, // Indica si mostrar el div que contiene el resultado
    mostrarCargando: boolean, // Indica si mostrar el cargando
    error: MensajeError, // Indica el contenido del error
    items: Array<ItemSelector>, // Lista de los items que se pueden elegir del resultado
}

export interface ConfiguracionBuscadorModal {
    mostrarModal: boolean, // Indica si mostrar el modal de buscar
    seleccionado: ItemSelector, // Item seleccionado del resultado de busqueda
    inputPreview: BuscadorModalInputPreview, // Para mostrar la preview del buscador o resultado seleccionado (revisar buscador de codigos postales para referencia de uso)
    inputBuscador: BuscadorModalInput, // Donde el usuario ingresa el texto a buscar (Dentro del modal)
    resultado: BuscadorModalResultado, // Contenedor para mostrar el resultado de la busqueda
}