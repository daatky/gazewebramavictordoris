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
import { MetodoPagoStripeEntity, PagoFacturacion } from 'src/app/dominio/entidades/catalogos/catalogo-metodo-pago.entity';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { DialogoContenido } from 'src/app/compartido/componentes/dialogo-contenido/dialogo-contenido.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdiomaNegocio } from 'src/app/dominio/logica-negocio/idioma.negocio';
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { PagoModel } from 'src/app/dominio/modelo/pago.model';
import { CodigosEstadoMetodoPago, CodigosCatalogoMetodoPago } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-metodo-pago.enum";
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss']
})
export class MetodoPagoComponent implements OnInit {

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

  dataDialogo: DialogoContenido;
  dataLista: DatosLista;
  dialogoPaypalId = "paypaldialog";
  dialogoTarjetaId = "tarjetadialog";

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  dataBoton: BotonCompartido;
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
    private modalService: DialogoServicie,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private idiomaNegocio: IdiomaNegocio
  ) {
    this.preperarLista()
    this.obtenerCatalogoMetodosPago()
    this.configurarAppBar()
    this.configurarBotonPago()
    this.configurarDialogoContenido();
    this.obtenerIdioma();

  }

  navegarMetodoPago(metodoPago: CatalogoMetodoPagoModel) {
    this.codigoPago = metodoPago.codigo;
    switch (this.codigoPago) {
      case CodigosCatalogoMetodoPago.PAYPAL.toString():
        this.dataDialogo.titulo = "PAGO CON PAYPAL";
        this.modalService.open(this.dialogoPaypalId);
        break;
      case CodigosCatalogoMetodoPago.TARJETA.toString():
        this.dataDialogo.titulo = "PAGO CON TARJETA"
        this.modalService.open(this.dialogoTarjetaId);
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

  ngOnInit(): void {
    this.initConfigPaypal()
    this.pagoForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(5)]],
      telefono: [""],
      direccion: [""],
      email: ["", [Validators.required, Validators.email]],
    });

    this.inputNombre = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'NOMBRE TARJETA', data: this.pagoForm.controls.nombre }
    this.inputTelefono = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'TELEFONO', data: this.pagoForm.controls.telefono }
    this.inputDireccion = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'DIRECCION DE FACTURACION', data: this.pagoForm.controls.direccion }
    this.inputEmail = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'EMAIL', data: this.pagoForm.controls.email }

  }

  configurarAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
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
    this.payPalConfig = {
      clientId: "ATFYWrmZeBoByifZnWG3CobzUiAoVtTo9U6pEnN7pSFi898Rwr83uZgVyhJDvPYyohdvNiH5FMwL4975",
      currency: "USD",
      createOrderOnServer: (data) =>
        this.cuentaNegocio.crearCuenta(CodigosCatalogoMetodoPago.PAYPAL.toString()).toPromise().then(
          (res) => res.idPago),
      //this.pagoNegocio.prepararPagoPaypal({}).toPromise(),
      //.then((res) => res.json())
      //.then((order) => order.orderID),
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
        console.log("onClientAuthorization - transacción autorizada", data
        );
        // this.showSuccess = true;
        /*
        this.crearCuenta(this.pagoForm.value).subscribe((cuenta) =>
          console.log(cuenta, "cuenta creada")
        );
        */
        //this.activarCuenta();
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log("OnError", err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
        this.modalService.close(this.dialogoPaypalId);
        // this.resetStatus();
      },

    };
  }
  preparePaypay(): Promise<string> {
    return this.pagoNegocio.prepararPagoPaypal({}).toPromise();
  }

  configurarBotonPago() {
    this.dataBoton = {
      colorTexto: ColorTextoBoton.AMARRILLO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "PAGAR",
      ejecutar: () => this.pagarStripe(),
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }

  pagarStripe(): void {
    if (this.pagoForm.valid) {
      let datosPago: PagoFacturacion = {
        nombres: this.pagoForm.value.nombre,
        telefono: this.pagoForm.value.telefono,
        direccion: this.pagoForm.value.direccion,
        email: this.pagoForm.value.nombre.email,
      }
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
    this.dataDialogo = {
      titulo: "PAGAR CON TARJETA",
    }
  }

  obtenerIdioma() {
    this.idiomaSeleccionado = this.idiomaNegocio.obtenerIdiomaSeleccionado()
    if (this.idiomaSeleccionado) {
      this.elementsOptions.locale = this.idiomaSeleccionado.codNombre as StripeElementLocale;
    }
  }

  activarCuenta(idTransaccion: string) {
    this.cuentaNegocio.activarCuenta(idTransaccion).subscribe((data) => {
      console.log(data, "Cuenta creada"); // redirigir o prensertar mensaje
    });
  }
}
