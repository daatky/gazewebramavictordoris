import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core'
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Directive({
    selector: '[gestorEventos]'
})
export class GestorEventosDirective implements OnInit, OnDestroy {

    @Input() tiempoDeEspera: number
    @Output() eventoTap: EventEmitter<any>
    @Output() dobleTap: EventEmitter<any>

    private taps = new Subject()
    private subscripcion: Subscription
    private contadorTaps: number

    constructor() { 
        this.tiempoDeEspera = 250
        this.eventoTap = new EventEmitter<any>()
        this.dobleTap = new EventEmitter<any>()
        this.contadorTaps = 0
    }

    ngOnInit() {
        this.subscripcion = this.taps
            .pipe(debounceTime(this.tiempoDeEspera))
            .subscribe(e => {
                console.warn(this.contadorTaps)
                if (this.contadorTaps >= 2) {
                    this.dobleTap.emit(e)
                } else if (this.contadorTaps === 1) {
                    this.eventoTap.emit(e)
                }
                this.contadorTaps = 0
            })
    }

    ngOnDestroy() {
        this.subscripcion.unsubscribe()
    }

    @HostListener('tap', ['$event'])
    clickEvent(evento:any) {
        evento.preventDefault()
        this.contadorTaps += 1
        this.taps.next(event)
    }

    
}