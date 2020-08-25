import { MediaSimpleModel } from './../modelo/media-simple.model';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface'
import { Injectable } from '@angular/core'
import { MediaEntity } from "./media.entity"

//Clase obsoleta, considerar su eliminacion
export interface MediaSimpleEntity extends MediaEntity {

}

@Injectable({ providedIn: 'root' })
export class MapearMediaSimpleEntity extends MapedorService<MediaSimpleEntity, MediaSimpleEntity> {
    
    protected map(entity: MediaSimpleEntity): MediaSimpleEntity {
        return entity;
    }

}