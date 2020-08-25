import { MediaEntity } from "./media.entity";
import { ArchivoEntity } from "./archivo.entity";

//Clase obsoleta, considerar su eliminacion
export interface MediaCompuestoEntity extends MediaEntity {
    miniatura:ArchivoEntity, // Archivo
}