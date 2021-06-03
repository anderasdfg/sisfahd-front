<template>
<v-card>
    <v-card-title class="justify-center">Realizar Pago</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Datos Generales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Datos Especificos
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items
        ><!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON dos-->
        <v-stepper-content step="1"
          ><!--CONTIENE EL STEPPERS 1 -->
          <div class="container-user" style="margin:auto" id="first-stepper">
            <form>
              
               <!-- Botones de cada step-->
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
          ><!--CONTIENE EL STEPPERS 2 -->
          <div class="container-user">
            <div  v-html="mihtml"></div>
            <form>
              
           

               <!-- Botones de cada step-->
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
  </v-stepper> 
   <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Preparando el pago...</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>    
</v-card>

</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "RealizarPago",
  props: ["pago"],
  data(){
  return{
    step:1,
    credenciales:"integraciones.visanet@necomplus.com:d5e7nk$M",
    contraseña:"",
    numerotarjeta:"",
     mihtml:`<h3>Pago</h3>`,
     cargaRegistro:true,
           
    }
  },
  async created() {
    this.obtenerToken();
    

    
  },
  methods:{
      cerrarDialogo() {
            this.$emit("close-dialog-Pago");
      },
      async obtenerToken(){
        let body = "";
         await axios
         .post("https://apitestenv.vnforapps.com/api.security/v1/security", body,{
            headers: {
                Authorization: "Basic " + window.btoa(unescape(encodeURIComponent(this.credenciales))) ,
                 Accept: "*/*",
            },
          })
          .then(async(res) => {
            var tok =""
            tok=res.data
            console.log(res.data);
           await this.conexionApi(tok);
       })
       .catch(err => console.log(err));
        //console.log("a stefano le gust la gampi")
        console.log(window.btoa(unescape(encodeURIComponent(  this.credenciales))))
        
    }
  ,
   async conexionApi(tok){
       let body = {
        amount: "20",
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
         .post("https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/522591303", body
         ,{
            headers: {
                Authorization:tok ,
                 Accept: "*/*",
            },
          })
          .then(res => {
            var sesiontok =""
            sesiontok=res.data
            console.log(sesiontok);
             this.cargaRegistro=false;

            let payForm = document.createElement('form');

            payForm.setAttribute('method', 'post');
            payForm.setAttribute('action', `/responsevisa/${this.numerotarjeta}`);

            let payScript = document.createElement('script');

            payScript.setAttribute('src', 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true');
            payScript.setAttribute('data-sessiontoken', `${sesiontok.sessionKey}`);
            payScript.setAttribute('data-channel', 'web');
            payScript.setAttribute('data-merchantid', '522591303');
            payScript.setAttribute('data-formbuttoncolor', '#D80000');
            payScript.setAttribute('data-purchasenumber', '123');
            payScript.setAttribute('data-amount', '20.98');
            payScript.setAttribute('data-expirationminutes', '10');
            payScript.setAttribute('data-timeouturl', 'https://anderasdfg.github.io/timeout-page/');

            payForm.appendChild(payScript);

            document.getElementById('first-stepper').append(payForm);

            // this.mihtml=`
            // <form  method='post' action='/responsevisa/${this.numerotarjeta}'>
            //     <script src='https://static-content.vnforapps.com/v2/js/checkout.js'
            //     data-sessiontoken='${sesiontok.sessionKey}'
            //     =''
            //     data-merchantid='522591303'
                
            //     data-merchantlogo= '../../../src/assets/logo-s.svg'
            //     data-formbuttoncolor='#D80000'
            //     data-purchasenumber='${this.contraseña}'
            //     data-amount='20.98'
            //     data-expirationminutes='5'
            //     data-timeouturl = 'https://anderasdfg.github.io/timeout-page/'
            //     ><\/script> 
            //   </form>`
            //   console.log(this.mihtml)
           
       })
       .catch(err => console.log(err));
        console.log("a stefano le gust la gampi 2")
    },
    
   }
  }


  
</script>

<style>

</style>