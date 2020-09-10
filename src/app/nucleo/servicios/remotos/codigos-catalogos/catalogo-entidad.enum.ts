
export enum CodigosCatalogoEntidad {
    PERFIL = '0',
    PROYECTO = '1',
    NOTICIA = '2',
}

export enum AccionEntidad {
    REGISTRO = '0', // Cuando el usuario esta en el proceso de crear su cuenta
    CREAR = '1', // Cuando el usuario ya inicio sesion, y selecciona un perfil que no ha creado
    ACTUALIZAR = '2', // Cuando el usuario ya inicio sesion, y selecciona  un perfil que ya ha creado para actualizar
}

export enum AccionAlbum {
    VISITA = '0',
    CREAR = '1',
    ACTUALIZAR = '2',
}