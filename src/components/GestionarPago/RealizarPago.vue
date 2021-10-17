<template>
  <v-card>
    <v-card class="card" >
            <div class="card-detallecita">              
                <h1 class="title-card" style="margin: 0 0 0 30px">Cita de {{pago.datos_turno.especialidad.nombre}}</h1>
                <!-- <h3><b>Especialidad</b> </h3> -->
                <div>
                  <p>
                 Seleccione "Continuar" para realizar el pago mediante Tarjeta Visa.
                   <br />
                  </p>
                  
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
              <h3 style="color:#555555	">
                    <b>Nombre del Medico: </b>  
              </h3>  
              <p style="font-size:18px;font-weight:600">{{ pago.datos_turno.datos_medico.nombre_apellido_medico }}</p>
            </div>

            <div style="margin: 10px auto 0;display:flex;width:80%">
              <div style=" border-radius: 6px;background: #BBDEFB;color: black;font-size: 18px;width:250%!important;text-align: center;" >
                Fecha de la cita :<br/>
                {{ pago.fecha_cita }}
              </div>
              <div style=" border-radius: 6px;background: #90CAF9;color: black;font-size: 18px;width: 250%!important;text-align: center;" 
              >Hora asignada:<br/>
                {{pago.datos_turno.hora_inicio}}</div>
            </div>
            <!--
               <h3 style="margin:20px 0 0">Seleccione el metodo de Pago:</h3>
             <v-radio-group >
                <v-radio
                  style="color:black"
                  label="Pago con Visa"
                  value="tipoRadioVisa"
                  v-model="tipoRadioVisa"
                ></v-radio>
                <v-radio
                 style="color:black"
                  label="Pago con Mercado pago"
                  value="tipoRadioMercado"
                  v-model="tipoRadioMercado"
                ></v-radio>
                <v-radio
                 style="color:black" 
                  label="Pago con YAPE"
                  value="tipoRadioYape"
                  v-model="tipoRadioYape"
                ></v-radio>
            </v-radio-group>
            <v-btn @click="obtenerDatosMercadoPago()" color="info">MERCADO LIBRE</v-btn>
            -->
            <form style="margin:80px 0 0 0 ">
              
              <v-row>
                <v-col>
                  <v-btn block @click="mostrarModalPago()" color="#70caee">
                    <v-icon left style="color:white">mdi-page-next-outline</v-icon>
                    <span style="color:white">Continuar con el pago</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="info">
                    <v-icon left style="color:white">mdi-close-outline</v-icon>
                    <span style="color:white">Cancelar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
         <!--    <div class="container-user" style="margin: auto" id="first-stepper">
       </div> -->
            
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

    <!--MODAL DE  PAGO CON VISA-->
    <v-dialog width="550px" v-model="tipoRadioVisa" persistent>
      <v-card height="390px">
        <v-card-title class="title-card" style="font-size:30px;font-weight:600;text-align:center;margin:0 0 30px 0"
          >Confirmación de Pago</v-card-title
        >
        <div style="margin:0 0 0 150px">
        <img src="https://media.discordapp.net/attachments/711261083175878657/860029990573965322/unknown.png" width="80%">
        </div>
        <p style="font-size:18px;margin:0 0 50px 10px;font-weight:600;text-align:center">Presione la opción "Pagar" para continuar:</p>
         <div style="display:flex;margin:20px 0 0 10px">
           <div class="container-user" style="margin: auto" id="first-stepper">
           </div>
           <div >
           <v-btn style="margin:0 100px 0 0" @click="cerrarModalPago()" color="#ededf2" > <span>Cancelar</span></v-btn>
           </div>
         </div>
      </v-card>
    </v-dialog> 
    <!--Modal de pago con mercadoPago-->

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
      tipoRadioVisa:false,
      tipoRadioMercado:false,
      tipoRadioYape:false,
      credenciales: "integraciones@niubiz.com.pe:_7z3@8fF",
      contraseña: "",
      numerotarjeta: "4919148107859067",
      mihtml: `<h3>Pago</h3>`,
      venta : {
        codigo_referencia:  "",
        pago : {
          token : "",
          sessionkey: "",
        },
        comercio:{

        }
      },
     
    };
  },
  async created() {
    
  },
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-Pago");
    },
    mostrarModalPago(){
     this.tipoRadioVisa=true;
     this.obtenerToken();

    },
    cerrarModalPago(){
     this.tipoRadioVisa=false;
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
          this.venta.pago.token = tok ;
          this.venta.pago.sessionkey = sesiontok.sessionKey;  
          console.log(this.venta + "hola zorr stefano");
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
  const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});
      await axiosInstance
        .put(
          "/Venta/token",
          venta
        )
        .then(async (res) => {          
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    async obtenerDatosMercadoPago(){
      let newscript = document.createElement("script");
          newscript.setAttribute(
            "src",
            "https://code.jquery.com/jquery-3.5.0.js");

      const xml =  "<paymentmp><pago><aplicacion>web</aplicacion><codigoreferencia> 44646546546546546546</codigoreferencia><descripcion> Pago de una cita</descripcion><monto>20</monto></pago> </paymentmp>";
     var jsonData = $.parseXML(xml);
     axios({
    method: 'get',
    url: 'http://qullanatest.com:8010/LOLIMSASER/servlet/com.lolimsaser.aws_lolimsaservices?wsdl',
    data: jsonData,
    mode:'cors'
             
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
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
.title-card {
  font-size: 35px;
  color: $blue;
  padding-top: 4%;
  text-align: center;
 
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
    width: 250%!important;
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