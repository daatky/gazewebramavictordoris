export enum RutasLocales {
  METODO_PAGO = 'metodopago',
  REGISTRO = 'registro/:codigoPerfil',
  PAGO_PAYPAL = 'pagopaypal/:codigo',
  PAGO_TARJETA = 'pagotarjeta/:codigo',
  MENU_PERFILES = 'menuperfiles',
  BIENVENIDO = 'bienvenido',
  MODULO_PENSAMIENTO = 'pensamiento',
  CREAR_PENSAMIENTO = 'crear-pensamiento',
  MENU_PRINCIPAL = "menuprincipal/:codigoPerfil",
  MIS_CONTACTOS = "miscontactos",
  ALBUM_PERFIL = 'albumperfil/:codigoPerfil/:nombreUsuario/:accionAlbum',
  ALBUM_GENERAL = 'albumgeneral/:codigoPerfil/:nombreUsuario/:accionAlbum',
  MENU_SELECCION_PERFILES = "menuseleccionperfiles"
}