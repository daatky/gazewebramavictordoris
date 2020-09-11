import { Injectable } from "@angular/core";
import { IdiomaRepository } from "../repositorio/idioma.repository";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CatalogoIdiomaEntity } from '../entidades/catalogos/catalogo-idioma.entity'
import { PerfilRepository } from '../repositorio/perfil.repository';
import { UbicacionRepository } from '../repositorio/ubicacion.repository';
import { PagoRepository } from '../repositorio/pago.repository';
import { LlavesLocalStorage } from 'src/app/nucleo/servicios/locales/llaves/local-storage.enum';

@Injectable({
    providedIn: 'root'
})
export class IdiomaNegocio {
    //private observadorItem$ = new BehaviorSubject<string>('');
    constructor(private idiomaRepository: IdiomaRepository,
        private perfilRepository:PerfilRepository,
        private ubicacionRepository:UbicacionRepository,
        private pagoRepository:PagoRepository
        ) { }
    /*crearObservable():Observable<string>{
      //gENERA UN OBSERBALE
      return this.observadorItem$.asObservable();
    }*/
    guardarIdiomaSeleccionado(idioma: CatalogoIdiomaEntity){
        this.idiomaRepository.guardarIdiomaLocal(idioma)
    }

    obtenerIdiomaSeleccionado():CatalogoIdiomaEntity{
        return this.idiomaRepository.obtenerIdiomaLocal()
    }
    //
    eliminarVarablesStorage(){
        this.perfilRepository.eliminarVariableStorage(LlavesLocalStorage.TIPO_PERFILES)
        this.pagoRepository.eliminarVariableStorage(LlavesLocalStorage.METODOS_PAGO)
        this.ubicacionRepository.eliminarVariableStorage(LlavesLocalStorage.PAISES)
    }
    obtenerCatalogoIdiomas():Observable<Array<CatalogoIdiomaEntity>> {
        let idiomas:Array<CatalogoIdiomaEntity>=this.idiomaRepository.obtenerIdiomas()
        if(idiomas){
            return of(this.ordenarIdioma(idiomas))
        }else{
            return this.idiomaRepository.obtenerCatalogoIdiomas()
            .pipe(
                map((data:Array<CatalogoIdiomaEntity>) => {                      
                    if(data&&data.length>0){
                        this.idiomaRepository.guardarIdiomas(data)                 
                        return this.ordenarIdioma(data)   
                    }
                    return null
                }),
                catchError(err=>{
                    return throwError(err)
                })
            )
        }
    }
    ordenarIdioma(data:Array<CatalogoIdiomaEntity>):any{
        return data.sort()
    }
}