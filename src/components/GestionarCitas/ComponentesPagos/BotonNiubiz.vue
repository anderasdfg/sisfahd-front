<template>
  <div class="container-user" style="margin: auto" id="first-stepper"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: "BotonNiubiz",
  props: ["pago"],
  data() {
    return {
      credenciales: "integraciones@niubiz.com.pe:_7z3@8fF",
      venta: {
        codigo_referencia: "",
        pago: {
          token: "",
          sessionkey: "",
        },
        comercio: {},
      },
    };
  },
  async created() {
    this.obtenerToken();
  },
  methods: {
    async obtenerToken() {
      console.log("Query de pago");
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
      console.log(window.btoa(unescape(encodeURIComponent(this.credenciales))));
    },
    async conexionApi(tok) {
      let body = {
        amount: this.pago.precio_neto,
        antifraud: {
          merchantDefineData: {
            MDD4: this.pago.datos_paciente.usuario,
            MDD32: "12345678", //aumentar en el json desde el back para que traiga el dato
            MDD21: "0",
            MDD75: "REGISTRO",
            MDD77: "1",
            MDD33: "DNI",
          },
        },
        channel: "web",
        recurrenceMaxAmount: null,
      };
      console.log("body para el token");
      console.log(body);
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
            `http://localhost:53170/api/Venta/Test/${this.pago.id}`
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
          payScript.setAttribute("data-purchasenumber", "123");
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
    },
    async updateVenta(venta) {
      await axios
        .put("/Venta/token", venta)
        .then(async (res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>