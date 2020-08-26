export interface ConfiguracionToast {
    mostrarToast: boolean, //True para mostrar
    mostrarLoader: boolean, // true para mostrar cargando en el toast
    cerrarClickOutside: boolean, // falso para que el click en cualquier parte no cierre el toast
    texto: string //Lo que va a mostrar
}