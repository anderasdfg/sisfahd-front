<template>
  <v-card>
    <h1 class="title-card">¿Olvidaste tu contraseña?</h1>
    <div class="estilo-stepper">
    <v-stepper v-model="step">
      <v-stepper-header>
          <v-stepper-step step="1" :complete="step>1">
           Reestablecer contraseña
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step>2">
            Obtener codigo de verificacion
          </v-stepper-step>
          <v-stepper-step step="3" :complete="step>3">
            Reestablecer contraseña
          </v-stepper-step>
      </v-stepper-header>
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
         <img src="../../assets/img_login.png" alt="login image">
     
      <v-row class="filas">
        <v-col align="left">
          <button class="btn-registrar" block @click="obtenerContraseña">REESTABLECER CONTRASEÑA</button>
        </v-col>
        <v-col align="right">
          <button class="btn-volver" block @click="cerrarDialogo()">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card-text>
                 <h1 >Se le enviara un codigo de verificacion al correo ********@gmail.com</h1>  

        <v-row class="filas2">
        <v-col align="left">
          <button class="btn-volver" block @click="step = 1">Volver</button>
        </v-col>
        <v-col align="right">
          <button class="btn-registrar" block @click="obtenerCodigo">Enviar Codigo</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>

         <v-stepper-content step="3">
        <v-card-text>

             <v-text-field
          v-model.trim="model.contraseña"
          label="Contraseña"
          outlined
          @input="$v.model.contraseña.$touch()"
          @blur="$v.model.contraseña.$touch()"
          :error-messages="errorContraseña"
          color="#009900"
        ></v-text-field>

         <v-text-field
          v-model.trim="model.nueva"
          label="Confirmacion de contraseña"
          outlined
          @input="$v.model.nueva.$touch()"
          @blur="$v.model.nueva.$touch()"
          :error-messages="errorNueva"
          color="#009900"
        ></v-text-field>
                

        <v-row class="filas2">
        <v-col align="left">
          <button class="btn-volver" block @click="step = 1">Volver</button>
        </v-col>
        <v-col align="right">
          <button class="btn-registrar" block @click="obtenerNueva">Siguiente</button>
        </v-col>
      </v-row>
    </v-card-text>

      </v-stepper-items>
    </v-stepper>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando contraseña</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="blue"
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
import {
  required,
} from "vuelidate/lib/validators";
export default {
  name: "RContraseña",
  props: ["Model"],
  data() {
    return {
    };
  },
  async created(){
    
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },
   
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },   
        
        
   
     
   
  },
   
  computed:{
  },
  validations() {
     
    },
}
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper{
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas{
  margin: 2% 8% 5% 8%;
}
.filas2{
  margin-top: 4%;
  margin-bottom: 1%;
}
.btn-registrar {
  background: $green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-volver {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>
