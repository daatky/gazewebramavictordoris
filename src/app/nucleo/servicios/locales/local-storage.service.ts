import { CatalogoPaisModel } from '../../../dominio/modelo/catalogo-pais.model';
import { MetodosLocalStorageService } from '../../util/metodos-local-storage.service'
import { LlavesLocalStorage } from './llaves/local-storage.enum';
import { Injectable } from '@angular/core'
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity'
import { Subject, Observable } from 'rxjs';
import { CatalogoTipoPerfilModel } from 'src/app/dominio/modelo/catalogo-tipo-perfil.model';
import { CatalogoMetodoPagoModel } from 'src/app/dominio/modelo/catalogo-metodo-pago.model';

@Injectable({ providedIn: 'root' })
export class LocalStorage {

    private observablePaises: Subject<CatalogoPaisModel[]>
    private observableCatalogoPerfiles: Subject<CatalogoTipoPerfilModel[]>

    constructor(
        private metodosLocalStorageService: MetodosLocalStorageService
    ) {
        this.observablePaises = new Subject<CatalogoPaisModel[]>()
        this.observableCatalogoPerfiles = new Subject<CatalogoTipoPerfilModel[]>()
    }
    //=====================IDIOMA LOCAL
    obtenerIdiomaLocal(): CatalogoIdiomaEntity {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.IDIOMA)
    }

    guardarIdiomaLocal(idioma: CatalogoIdiomaEntity) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.IDIOMA, idioma)
    }

    //===================== TOKEN AUTENTICACION
    obtenerTokenAutenticacion() {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.AUTH_TOKEN)
    }
    guardarTokenAutenticacion(token: string) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.AUTH_TOKEN, token)
    }

    obtenerTokenRefresh() {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.REFRESH_TOKEN)
    }
    guardarTokenRefresh(token: string) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.REFRESH_TOKEN, token)
    }
    /*
    obtenerTipoPerfiles(){        
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.TIPO_PERFILES_USER)
    }

    guardarTipoPerfiles(tipoPerfil:Array<any>){
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.TIPO_PERFILES_USER, tipoPerfil)
    }*/

    obtenerPaises(): Observable<CatalogoPaisModel[]> {
        const data = this.metodosLocalStorageService.obtener(LlavesLocalStorage.PAISES)
        this.observablePaises.next(data)
        return this.observablePaises.asObservable()
    }

    guardarPaises(paises: CatalogoPaisModel[]) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.PAISES, paises)
    }

    almacenarCatalogoPerfiles(tipoPerfiles: CatalogoTipoPerfilModel[]) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.TIPO_PERFILES, tipoPerfiles)
    }

    obtenerCatalogoPerfiles(): CatalogoTipoPerfilModel[] {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.TIPO_PERFILES)
    }

    almacenarMetodosPago(metodos: CatalogoMetodoPagoModel[]) {
        return this.metodosLocalStorageService.guardar(LlavesLocalStorage.METODOS_PAGO, metodos);
    }

    obtenerMetodosPago(): CatalogoMetodoPagoModel[] {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.METODOS_PAGO);
    }
}