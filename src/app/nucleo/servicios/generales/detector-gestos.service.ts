import * as Hammer from 'hammerjs'
import { Injectable } from '@angular/core'
import { HammerGestureConfig } from '@angular/platform-browser'

// Provider por defecto para eventos de tap, press y demas (por defecto)
@Injectable()
export class DetectorGestos extends HammerGestureConfig {
  buildHammer (element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    })
    return mc
  }
}

// Construye eventos de tap personalizados (tap, dobletap) para un mismo elemento
// Son personalizados porque el evento tap no se debe disparar al hacer dobletap en el elemento
@Injectable({ providedIn: 'root' })
export class EventoTapPersonalizado {
  construirEventosTap(elemento:HTMLElement) {
    const gestor = new Hammer.Manager(elemento)
    const tap = new Hammer.Tap({ event: 'tap' })
    const dobleTap = new Hammer.Tap({ event: 'dobletap', taps: 2 })
    
    gestor.add([dobleTap, tap])

    dobleTap.recognizeWith(tap)
    tap.requireFailure(dobleTap)

    return gestor
  }
}