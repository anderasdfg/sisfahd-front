<template>
  <v-card>
    <v-card class="card">
            <div class="card-detallecita">              
                <h1>Cita de cardiología</h1>
                <!-- <h3><b>Especialidad</b> </h3> -->
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium tempora voluptatem ex temporibus quidem nobis, laboriosam asperiores? Debitis, rem! Quaerat saepe quasi dolorem rem blanditiis quidem fugiat sequi ea est.<br />
                  <h3>
                    <b>Costo de la cita: </b> S/. {{ pago.precio_neto }}
                  </h3>                
              </div>
              <!-- <div class="card-detallecita_right">
                <img
                  src="https://ma.com.pe/sites/default/files/noticias/que-obligaciones-tiene-el-medico-ocupacional-frente-al-covid-19.jpg"
                  alt=""
                  class="profile-medico"
                />
                <img
                  src="https://www.perutourism.com/images/experiences/estrellas/5-estrellas.png"
                  alt=""
                  class="stars-bottom"
                />
              </div> -->
            </div>

            <div class="card-datoscupo">
              <div class="card-datocupo">
                {{ pago.fecha_cita }}
              </div>
              <div class="card-datocupo">30 minutos</div>
            </div>
             <div class="container-user" style="margin: auto" id="first-stepper">
       </div>
            
          </v-card>

    
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
      cargaRegistro:false,
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
          this.registrarVenta(this.venta);        
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
     let  registro = {
    id:"",
    codigo_orden: "",
    estado: "procesado",
    detalle_estado: "aun no se paga solo se moifica",
    tipo_operacion: "",
    tipo_pago: "",
    monto: 150,
    titular: "",
    fecha_pago: "",
    moneda: "",
    codigo_referencia: venta.codigo_referencia,
    pago: {
        token: venta.pago.token,
        sessionkey: venta.pago.sessionkey
          }
  }       
      await axios
        .put(
          "/Venta/token",
          registro
        )
        .then(async (res) => {          
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    async registrarVenta(venta){
      let  registro = {
    id:"",
    codigo_orden: "",
    estado: "procesado",
    detalle_estado: "me gusta el np",
    tipo_operacion: "",
    tipo_pago: "",
    monto: 150,
    titular: "",
    fecha_pago: "",
    moneda: "",
   codigo_referencia: venta.codigo_referencia,
    pago: {
        token: venta.pago.token,
        sessionkey: venta.pago.sessionkey
          }
  }
     await axios 
     .post("/Venta",registro
     )
    .then(async (res) => {          
          console.log(res.data);
        })
        .catch((err) => console.log(err));

    }
  },
};
</script>

<style lang="scss" scoped>

.card {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.card-detallecita {
  padding: 1.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card-detallecita_left {
    display: flex;
    flex-direction: column;
    h1 {
      color: $blue;
      font-size: 20px !important;
      font-weight: normal;
    }
    h3 {
      color: $blue;
      font-size: 15px !important;
      font-weight: normal;
      margin-bottom: 2%;
    }
  }
  .card-detallecita_right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-medico {
    width: 50%;
    height: 100%;
    border-radius: 50%;
    margin: 0 0 3% 0;
  }
  .stars-bottom {
    width: 25%;
    height: 10%;
    padding: 0 0 1% 0;
  }
}
.card-datoscupo {
  display: flex;
  flex-direction: row;
  .card-datocupo {
    border-radius: 6px;
    background: $sky-blue;
    color: $black;
    font-size: 18px;
    width: 20%;
    text-align: center;
    margin: 1%;
  }
}
.button-reservar {
  margin: 1%;
  background: $blue;
  color: $white;
  text-align: center;
  border-radius: 6px !important;
  width: 42%;
  height: 5vh;
}
</style>