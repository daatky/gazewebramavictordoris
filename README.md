**Gazelook Web**

# Referencia

Arquitectura basada en el [siguiente articulo](https://dev.to/phodal/clean-architecture-for-frontend-in-action-1aop).

# Descripcion general
Lib
    Idioma estatico (Internacionalizacion) se utiliza la siguiente libreria
        @ngx-translate/core  ==> https://github.com/ngx-translate/core
    

# Arbol de contenidos

```bash
============= Arbol de contenidos ======================================================================================================
src
    L app
        L compartido                                // Los archivos comunes como listas genericas, botones, etc.
            L componentes                           // Componentes reutilizables
            L directivas                            // 
            L diseno                                // Recursos para elementos de diseno
                L enums                             //  
                L modelos                           // 
            L interceptores                         // 
            L paginas                               // Paginas publicas como 404, 505, etc.
            L tuberias                              // Formatear data
        L dominio                                   // Capa de dominio, entidades y su logica, independiente del framework
            L entidades                             // Para almacenar los datos cuando provienen del backend. Basados en el diagrama de clases
                L catalogos
            L logica-negocio                        // Casos de uso, recibe y mapea la data de modelo a entidad segun el caso de uso que se 
            L modelo                                // Modelos para presentar datos en la vista.
            L repositorio                           // Llamadas al API, recibe y mapea la data de entidad a modelo segun el repositorio que se ejecute
        L nucleo
            L base                                  
                L mapear.interface.ts               // Metodos abstractos sin implementacion
                L usuario
                    L caso-uso.interface.ts         // Metodos abstractos sin implementacion de la logica de negocio
                    L respositorio.interface.ts     // Metodos abstractos sin implementacion del repositorio
            L servicios                             
                L diseno                            // Servicios genericos para componentes graficos
                L locales                           // Servicios genericos para el almacenamiento en el localStorage
                    L claves.enun.ts                // Rutas para acceder a datos en el localstorage
                    L loca-storage.service.ts       // Metodo genericos para el localstorage
                L remotos                           // Servicios genericos para comunicacion con el API
                    L usuario.servicie.ts
                    L rutas                         //Carpeta enums
                        L   usuario.enum.ts         //Enums de las rutas
                L generales                         // Servicios comunes que no tengan nada que ver con consumo, almacenamiento o diseno
            L util                                  // Todo lo que no sepas donde ponerlo, lo pones en utils.
        L presentacion                              // Vistas en general, validaciones en formularios
```