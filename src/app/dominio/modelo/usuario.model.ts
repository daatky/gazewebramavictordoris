export interface UsuarioModel {
    id?: string,
    email?: string,
    fechaNacimiento?: Date,
    contrasena?: string,
    //idioma?: CatalogoIdiomaEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    emailVerificado?: boolean,
    aceptoTerminosCondiciones?: boolean,
    //estado?: CatalogoEstadoEntity,
    perfilGrupo?: boolean,
    menorEdad?: boolean,
    //perfiles?: Array<PerfilEntity>,
    emailResponsable?: string,
    responsableVerificado?: boolean,
    //transacciones?: Array<TransaccionEntity>,
    //suscripciones?: Array<SuscripcionEntity>,
    //dispositivos?: Array<DispositivoEntity>
}









