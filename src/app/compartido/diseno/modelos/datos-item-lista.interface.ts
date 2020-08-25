export interface DatosItem {
    componente?:any, //Enviar el componete o nombre del componente (NombreComponent)
    dataComponente?:any, //Informacion del item
    dataConfiguracion?:any, //Informacion como stylos y cosas adicionales que necesite el ITEM
    unClick?:Function, //Para ejecutar el metodo en el padre del componete realice una accion con un click
    dobleClick?:Function,//Para ejecutar el metodo en el padre del componete realice una accion con un doble click
    clickSostenido?:Function //Para ejecutar el metodo en el padre del componete realice una accion de click largo
}


export interface DatosItemTest {
    item:any, // Componente Item de la lista
    configuracion:any, // Configuracion
    componente:any, // Tipo de componente a dibujar
    evento?:Function, // Evento a ejecutar
}