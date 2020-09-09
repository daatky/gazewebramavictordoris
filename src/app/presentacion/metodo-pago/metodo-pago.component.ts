import { BotonCompartido } from '../../compartido/diseno/modelos/boton.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface'
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { PagoNegocio } from '../../dominio/logica-negocio/pago.negocio'
import { EstiloDelTextoServicio } from "../../nucleo/servicios/diseno/estilo-del-texto.service";
import { Router } from '@angular/router';
import { CatalogoMetodoPagoModel } from 'src/app/dominio/modelo/catalogo-metodo-pago.model';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { IPayPalConfig } from 'ngx-paypal';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';
import {
  StripeService,
  StripeCardNumberComponent,
  StripeCardComponent,
} from "ngx-stripe";
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';

import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  StripeElementLocale,
} from "@stripe/stripe-js";
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { MetodoPagoStripeEntity, PagoFacturacionEntity } from 'src/app/dominio/entidades/catalogos/catalogo-metodo-pago.entity';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { ModalContenido } from 'src/app/compartido/componentes/dialogo-contenido/dialogo-contenido.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdiomaNegocio } from 'src/app/dominio/logica-negocio/idioma.negocio';
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { PagoModel } from 'src/app/dominio/modelo/pago.model';
import { CodigosEstadoMetodoPago, CodigosCatalogoMetodoPago } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-metodo-pago.enum";
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';
import { UsuarioModel } from 'src/app/dominio/modelo/usuario.model';
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { Location } from '@angular/common'
import { ToastComponent } from 'src/app/compartido/componentes/toast/toast.component';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss']
})
export class MetodoPagoComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent
  public payPalConfig?: IPayPalConfig;
  configuracionAppBar: ConfiguracionAppbarCompartida;
  listaMetodoPago: CatalogoMetodoPagoModel[];
  codigosEstadoMetodoPago = CodigosEstadoMetodoPago;
  codigoPago: string
  pagoForm: FormGroup;
  idiomaSeleccionado: CatalogoIdiomaEntity;
  inputNombre: InputCompartido
  inputTelefono: InputCompartido
  inputDireccion: InputCompartido
  inputEmail: InputCompartido

  dataModalPaypal: ModalContenido;
  dataModalStripe: ModalContenido;

  configuracionToast: ConfiguracionToast

  dataLista: DatosLista;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        color: "#03486b",
        fontSmoothing: "antialiased",
        fontSize: "18px",
        fontFamily: 'Source Sans Pro, sans-serif',
        "::placeholder": {
          color: "#03486b",
        },
        fontWeight: "bold"
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "en",
  };


  constructor(
    private pagoNegocio: PagoNegocio,
    private cuentaNegocio: CuentaNegocio,
    public estiloTexto: EstiloDelTextoServicio,
    private router: Router,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private idiomaNegocio: IdiomaNegocio,
    private _location: Location,
  ) {
    this.preperarLista()
    this.obtenerCatalogoMetodosPago()
    this.configurarAppBar()
    this.configurarDialogoContenido();
    this.obtenerIdioma();
    this.configurarToast();

  }


  ngOnInit(): void {
    this.initConfigPaypal()
    this.pagoForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(5)]],
      telefono: [""],
      direccion: [""],
      email: ["", [Validators.required, Validators.email]],
    });

    this.inputNombre = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.DEFECTO }, placeholder: 'NOMBRE TARJETA', data: this.pagoForm.controls.nombre }
    this.inputTelefono = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.DEFECTO }, placeholder: 'TELEFONO', data: this.pagoForm.controls.telefono }
    this.inputDireccion = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.DEFECTO }, placeholder: 'DIRECCION DE FACTURACION', data: this.pagoForm.controls.direccion }
    this.inputEmail = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.DEFECTO }, placeholder: 'EMAIL', data: this.pagoForm.controls.email }

  }


  navegarMetodoPago(metodoPago: CatalogoMetodoPagoModel) {
    this.codigoPago = metodoPago.codigo;
    switch (this.codigoPago) {
      case CodigosCatalogoMetodoPago.PAYPAL.toString():
        this.dataModalPaypal.abierto = true;
        this.toast.abrirToast("abrir metodo pago");
        break;
      case CodigosCatalogoMetodoPago.TARJETA.toString():
        this.dataModalStripe.abierto = true;
        break;
    }
  }



  obtenerCatalogoMetodosPago() {
    this.dataLista.cargando = true
    this.pagoNegocio.obtenerCatalogoMetodoPago()
      .subscribe((res: CatalogoMetodoPagoModel[]) => {
        console.log(res)
        this.dataLista.cargando = false
        this.listaMetodoPago = res;
      }, error => {
        this.dataLista.cargando = false
        this.dataLista.error = error;
        console.log(error)
      })
  }

  configurarAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        mostrarSearchBar: false,
        nombrePerfil: {
          mostrar: false
        },
        mostrarDivBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: 'pago'
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
      }
    }
  }

  preperarLista() {
    this.dataLista = {
      cargando: true,
      reintentar: this.obtenerCatalogoMetodosPago,
      lista: this.listaMetodoPago,
      tamanoLista: TamanoLista.TIPO_PERFILES
    }
  }

  private initConfigPaypal(): void {
    let idTransaccion = "";
    this.payPalConfig = {
      clientId: "ATFYWrmZeBoByifZnWG3CobzUiAoVtTo9U6pEnN7pSFi898Rwr83uZgVyhJDvPYyohdvNiH5FMwL4975",
      currency: "USD",
      createOrderOnServer: (data) =>
        this.cuentaNegocio.crearCuenta(CodigosCatalogoMetodoPago.PAYPAL.toString(), null).toPromise().then(
          (res) => {
            idTransaccion = res.idTransaccion;
            console.log("se creao la cuenta y se retonor el id para confirmar")
            return res.idPago
          }
        ).catch((error) => {
          console.log(error);
          this.toast.abrirToast(error)
          return error.toString();
        }),
      advanced: {
        commit: "true",
        extraQueryParams: [{ name: 'disable-funding', value: 'card' }]
      },
      style: {
        label: "paypal",
        size: "responsive",
        layout: "horizontal",
      },

      onApprove: (data, actions) => {
        this.toast.abrirToast("Transaccion aprobada, pero no autoriazada")

        console.log(
          "onApprove - Transaccion ha sido aprovada, pero no autorizada",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log("onApprove - you can get full order details inside onApprove: ", details);
        });
      },
      onClientAuthorization: (data) => {
        this.toast.abrirToast("Transaccion autoriazada");
        console.log("onClientAuthorization - transacción autorizada", data);
        this.activarCuenta(idTransaccion);
      },
      onCancel: (data, actions) => {
        this.toast.abrirToast("Transaccion cancelada")
      },
      onError: (err) => {
        this.toast.abrirToast("Error al procesar el pago")
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
        this.dataModalPaypal.abierto = false;
      },

    };
  }

  pagarStripe(): void {
    if (this.pagoForm.valid) {
      let datosPago: PagoFacturacionEntity = {
        nombres: this.pagoForm.value.nombre,
        telefono: this.pagoForm.value.telefono,
        direccion: this.pagoForm.value.direccion,
        email: this.pagoForm.value.email,
      }
      this.dataModalStripe.abierto = false;
      this.cuentaNegocio.crearCuenta(this.codigoPago, datosPago).subscribe(
        (pagoModel: PagoModel) => {
          console.log(pagoModel, "paymentintent and custumer");
          this.stripeService.confirmCardPayment(pagoModel.idPago, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: datosPago.nombres,
                email: datosPago.email,
              },
            },
          }).subscribe((result) => {
            if (result.error) {
              console.log(result.error?.message); // Mostrar un error al cleinte
            } else {
              if (result.paymentIntent?.status === "succeeded") {

                this.activarCuenta(pagoModel.idTransaccion);

              }
            }
          });
        },
        (err) => {
          console.log(err, "error servidor");
        }
      );

    }
  }

  configurarDialogoContenido() {
    this.dataModalStripe = {
      titulo: "PAGAR CON TARJETA",
      abierto: false,
      bloqueado: false,
      id: "pagotarjeta"
    }
    this.dataModalPaypal = {
      titulo: "PAGAR CON PAYPAL",
      abierto: false,
      bloqueado: false,
      id: "pagopaypal"
    }
  }

  obtenerIdioma() {
    this.idiomaSeleccionado = this.idiomaNegocio.obtenerIdiomaSeleccionado()
    if (this.idiomaSeleccionado) {
      this.elementsOptions.locale = this.idiomaSeleccionado.codNombre as StripeElementLocale;
    }
  }

  activarCuenta(idTransaccion: string) {
    /*
    this.toast.abrirToast("Procesando Pago para crear la cuenta", true)
    this.cuentaNegocio.activarCuenta(idTransaccion)
      .subscribe((res: UsuarioModel) => {
        this.toast.cerrarToast();
        this._location.replaceState('/'); // clears browser history so they can't navigate with back button                
        this.router.navigateByUrl(RutasLocales.MENU_SELECCION_PERFILES);
      }, error => {
        this.configuracionToast.texto = error.toString();
        this.toast.abrirToast(error.toString())
        console.log(error)
      })
      */
  }

  configurarToast() {
    this.configuracionToast = {
      cerrarClickOutside: false,
      bloquearPantalla: false,
      mostrarLoader: false,
      mostrarToast: false,
      texto: ""
    }
  }

}
