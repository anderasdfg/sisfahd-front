<template>
  <v-card>
    <v-card-title class="justify-center">Realizar Pago</v-card-title>
     <div class="container-user" style="margin: auto" id="first-stepper">
       </div>
    <!-- <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1"> Datos Generales </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2"> Datos Especificos </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items
        >
        <v-stepper-content step="1"
          >
          <div class="container-user" style="margin: auto" id="first-stepper">
            <form>         
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="red">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2"
          >
          <div class="container-user">
            <div v-html="mihtml"></div>
            <form>
              
              <v-row>
                <v-col>
                  <v-btn block @click="step = 1" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="red">
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper> -->
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Preparando el pago...</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "RealizarPago",
  props: ["pago"],
  data() {
    return {
      step: 1,
      credenciales: "integraciones.visanet@necomplus.com:d5e7nk$M",
      contraseña: "",
      numerotarjeta: "4919148107859067",
      mihtml: `<h3>Pago</h3>`,
      venta : {
        codigo_referencia:  "",
        pago : {
          token : "",
          sessionkey: "",
        }
      }
    };
  },
  async created() {
    this.obtenerToken();
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-Pago");
    },
    async obtenerToken() {
      console.log(this.pago);
      let body = "";
      await axios
        .post(
          "https://apitestenv.vnforapps.com/api.security/v1/security",
          body,
          {
            headers: {
              Authorization:
                "Basic " +
                window.btoa(unescape(encodeURIComponent(this.credenciales))),
              Accept: "*/*",
            },
          }
        )
        .then(async (res) => {
          var tok = "";
          tok = res.data;
          console.log(res.data);
          await this.conexionApi(tok);
        })
        .catch((err) => console.log(err));
      //console.log("a stefano le gust la gampi")
      console.log(window.btoa(unescape(encodeURIComponent(this.credenciales))));
    },
    async conexionApi(tok) {
      let body = {
        amount: this.pago.precio_neto,
        antifraud: {
          merchantDefineData: {
            MDD4: "williammqurp@gmail.com",
            MDD32: "12345678",
            MDD21: "0",
            MDD75: "REGISTRO",
            MDD77: "1",
            MDD33: "DNI",
          },
        }, //luego completar
        channel: "web",
        recurrenceMaxAmount: null,
      };
      await axios
        .post(
          "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/522591303",
          body,
          {
            headers: {
              Authorization: tok,
              Accept: "*/*",
            },
          }
        )
        .then((res) => {
          var sesiontok = "";
          sesiontok = res.data;
          console.log(sesiontok);
          this.cargaRegistro = false;


          this.venta.codigo_referencia = this.pago.id;
          this.venta.pago.token = tok;
          this.venta.pago.sessionkey = sesiontok.sessionKey;          
          this.updateVenta(this.venta);

          let payForm = document.createElement("form");

          payForm.setAttribute("method", "post");
          payForm.setAttribute(
            "action",
            `http://localhost:53170/responsevisa/${this.pago.id}`
          );

          let payScript = document.createElement("script");

          payScript.setAttribute(
            "src",
            "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true"
          );
          payScript.setAttribute(
            "data-sessiontoken",
            `${sesiontok.sessionKey}`
          );
          payScript.setAttribute("data-channel", "web");
          payScript.setAttribute(
            "data-merchantlogo",
            "https://i.ibb.co/L5MD7C5/Group-14-1.png"
          );
          payScript.setAttribute("data-merchantid", "522591303");
          payScript.setAttribute("data-formbuttoncolor", "#D80000");
          payScript.setAttribute("data-purchasenumber", this.pago.id);
          payScript.setAttribute("data-amount", this.pago.precio_neto);
          payScript.setAttribute("data-expirationminutes", "10");
          payScript.setAttribute(
            "data-timeouturl",
            "https://anderasdfg.github.io/timeout-page/"
          );

          payForm.appendChild(payScript);

          document.getElementById("first-stepper").append(payForm);
        })
        .catch((err) => console.log(err));
      console.log("a stefano le gust la gampi 2");
    },
    async updateVenta(venta) {
            
      await axios
        .put(
          "/Venta/token",
          venta
        )
        .then(async (res) => {          
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>

<style>
</style>