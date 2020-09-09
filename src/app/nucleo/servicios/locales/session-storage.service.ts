import { Injectable } from "@angular/core";
import { MetodosSessionStorageService } from "../../util/metodos-session-storage.service"
import { UsuarioModel } from "../../../dominio/modelo/usuario.model";
import { LlavesSessionStorage } from "../locales/llaves/session-storage.enum";

@Injectable({ providedIn: 'root' })
export class SessionStorageServicie {

    constructor (
        private sesionStorage: MetodosSessionStorageService
    ) { }
}