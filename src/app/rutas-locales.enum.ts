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
  ALBUM_PERFIL = 'albumperfil/:entidad/:codigo/:titulo/:accion',
  ALBUM_GENERAL = 'albumgeneral/:entidad/:codigo/:titulo/:accion',
  MENU_SELECCION_PERFILES = "menuseleccionperfiles"
}