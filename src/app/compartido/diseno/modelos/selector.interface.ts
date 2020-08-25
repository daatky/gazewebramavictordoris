import { MensajeError } from './error.interface'
import { ItemSelector } from './elegible.interface'

export interface SelectorCargando {
    mostrar: boolean, // Indica si mostrar el cargando o no
    // Lo dejo como interfaz en caso se necesite mas a futuro
}

export interface SelectorModalInput {
    placeholder: string, // Placeholder del input donde se ingresa el texto que se va a mandar a buscar
    valor: string, // Texto que se va a mandar a buscar
}

export interface SelectorModalInputPreview {
    mostrar: boolean, // Mostrar input con el valor de busqueda seleccionado en el componente padre
    input: SelectorModalInput, // 
}

export interface ConfiguracionSelector {
    tituloSelector: string, // Titulo a mostrar en el selector
    mostrarModal: boolean, // Indica si mostrar o no el selector
    inputPreview: SelectorModalInputPreview,
    seleccionado: ItemSelector, // Item Seleccionado
    elegibles: Array<ItemSelector>, // Valores posibles a elegir,
    cargando: SelectorCargando, // Mostrar loader o no
    error: MensajeError, // Contenido del error
}