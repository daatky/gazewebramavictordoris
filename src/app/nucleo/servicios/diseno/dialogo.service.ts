import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogoServicie {
    private modals: any[] = [];

    //Agrega el modal a la lista de modales activos
    add(modal: any) {
        // 
        this.modals.push(modal);
        //console.log("se agrego  en modals")
    }

    //Remueve el modal de la lista de modales activos.
    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }


    //Abre el modal por su id.
    open(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.abrir();
    }

    //Cierra el modal por su id
    close(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.cerrar();
    }
}