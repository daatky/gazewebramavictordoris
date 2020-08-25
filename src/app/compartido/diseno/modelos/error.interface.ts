export interface MensajeError {
    mostrarError: boolean, // Indica si se debe mostrar o no el error
    contenido: string, // El contenido del error,
    tamanoCompleto?: boolean, // Indica si el error debe ocupar el tamano completo de la caja blanca
}