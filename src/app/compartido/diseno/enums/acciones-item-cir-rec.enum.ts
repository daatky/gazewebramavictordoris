export enum AccionesItemCircularRectangular {
    VISITAR_ALBUM_GENERAL = 1, // Abirir mi album de tipo general, se debe validar si es propio o de otro usuario en el componente padre
    ABRIR_ADMIN_ALBUM_PERFIL = 2, // Abrir album de tipo perfil, para edicion y demas
    ABRIR_ADMIN_ALBUM_GENERAL = 3, // Abirir mi album de tipo general, para edicion y demas
    BORRAR_ITEM = 4, // Borrar item del album
    EDITAR_DESCRIPCION = 5, // Cuando el item esta en modo preview, al darle click se empieza a editar la descripcion del item
    DEJAR_DE_EDITAR_DESCRIPCION = 6, // Cuando el item esta seleccionado para editar la descripcion, esta accion indica que se debe cancelar la edicion
    CAMBIAR_A_MODO_ALBUM_PREVIEW_ADMIN = 7, // Cuando el item esta en modo RECALBUMMINI y recibe un doble click, se debe cambiar a modo RECALBUMPREVIEW
    CAMBIAR_A_MODO_ALBUM_PREVIEW_VISITA = 8, // Cuando el item esta en modo RECALBUMMINI y recibe un doble click, se debe cambiar a modo RECALBUMPREVIEW, se debe notificar a los items para que muestren el icono de expandir foto
    SUBIR_ARCHIVO = 9, // Seleccionar imagen para actualizar el item, el archivo es enviado al padre para su subida, finalizado este proceso se debe actualizar al item
    ESTABLECER_ITEM_PREDETERMINADO = 10, // Cuando se da doble click en el item, se debe establecer como predeterminado
    ACTUALIZAR_PERFIL = 11, // Cuando se da doble click en el item (Usado en el perfil) se debe llevar a actualizar el perfil
    EXPANDIR_FOTO_DEL_ITEM = 12, // Cuando el uso del item es preview del album y en modo visitante, esta accion indica que se debe expandir la foto a pantalla completa
    TOMAR_FOTO = 13, // Indica que se debe abrir el componente para capturar foto de la camara
}