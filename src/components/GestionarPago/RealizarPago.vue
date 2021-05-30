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
          <div class="container-user">
            <form >


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
    step:1



    }
  },
  methods:{
      cerrarDialogo() {
            this.$emit("close-dialog-Pago");
      },
        async  getTokenSecurity(credentials, visa) {
        const body = "";
        var token = "";
        await axios
            .post(config[env].APIToken, body, {
                headers: {
                    Authorization: "Basic " + credentials,
                    Accept: "*/*",
                },
            })
            .then(async(response) => {
                token = response.data;
                //res.send(responseHTML);
            })
            .catch(async(err) => {
                if (err.response) {
                    console.log(err.response.status);
                }
            });
        return token;
    }
  
  }

}
</script>

<style>

</style>