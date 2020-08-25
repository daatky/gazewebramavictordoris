export interface ItemSelector {
    codigo: string, // Id del item elegible
    nombre: string, // Texto a mostrar en el item, por ejemplo Ecuador del selector de paises
    auxiliar?: string, // En caso de enviar subtitulo
}