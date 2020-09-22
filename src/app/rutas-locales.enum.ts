export enum RutasLocales {
  BASE = '/',
  METODO_PAGO = 'metodopago',
  REGISTRO = 'registro/:accionEntidad/:codigoPerfil',
  PAGO_PAYPAL = 'pagopaypal/:codigo',
  PAGO_TARJETA = 'pagotarjeta/:codigo',
  MENU_PERFILES = 'menuperfiles',
  BIENVENIDO = 'bienvenido',
  MODULO_PENSAMIENTO = 'pensamiento',  
  MENU_PRINCIPAL = "menuprincipal",
  MIS_CONTACTOS = "miscontactos",
  ALBUM_PERFIL = 'albumperfil/:codigo/:entidad/:accionEntidad/:titulo/:accionAlbum',
  ALBUM_GENERAL = 'albumgeneral/:codigo/:entidad/:accionEntidad/:titulo/:accionAlbum',
  MENU_SELECCION_PERFILES = 'menuseleccionperfiles',
  MODULO_PROYECTOS = 'proyectos',
  PERFIL="perfil",
  PERFIL_DE_TERCERO="perfil/:id",
  MENU_PUBLICAR_PROYECTOS="menupublicarproyectos"
}