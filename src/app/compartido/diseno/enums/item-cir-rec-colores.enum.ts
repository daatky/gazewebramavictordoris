
export enum ColorDeBorde {
    BORDER_TRANSPARENTE = 'borde-transparente',
    BORDER_ROJO = 'borde-rojo',
    BORDER_AZUL = 'borde-azul',
    BORDER_AMARILLO = 'borde-amarillo',
    BORDER_NEGRO = 'borde-negro',
}


// Cuando el album de perfil no tiene foto de portada, se va a asignar un color de fondo debajo del icono del rostro,
// el color de fondo es de origen aleatorio.
// Para anadir un nuevo color de fondo, anadir el valor al enum, enviar en la configuracion y anadir la clase al archivo .scss del componente item circular o rectangular
export enum ColorDeFondo {
    FONDO_TRANSPARENTE = 'fondo-transparente',
    FONDO_BLANCO = 'fondo-blanco',
}