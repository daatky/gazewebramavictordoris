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
    //=======================IDIOMAS
    obtenerIdiomas(): Array<CatalogoIdiomaEntity> {
        return this.metodosLocalStorageService.obtener(LlavesLocalStorage.IDIOMAS)
    }

    guardarIdiomas(idiomas: Array<CatalogoIdiomaEntity>) {
        this.metodosLocalStorageService.guardar(LlavesLocalStorage.IDIOMAS, idiomas)
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

    eliminarUsuario() {
        return this.metodosLocalStorageService.remover(LlavesLocalStorage.USUARIO);
    }

    eliminarRefreshToken() {
        return this.metodosLocalStorageService.remover(LlavesLocalStorage.REFRESH_TOKEN);
    }
    eliminarAutenticacionToken() {
        return this.metodosLocalStorageService.remover(LlavesLocalStorage.AUTH_TOKEN);
    }
}