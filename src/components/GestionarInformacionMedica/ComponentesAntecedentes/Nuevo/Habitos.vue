<template>
  <div class="container-im-user">
    <form style="margin-top: 15px">
    
      <div>
        <div class="numero-modulo">¿Cual es su nivel de consumo de tabaco?</div>
        <v-select
          style="padding:0px 0px 0px 40px; margin-bottom:0px"
          outlined
          :items="selectConsumo"
          label="Seleccione un nivel"
          v-model="habitos.consumo_tabaco.consumo" 
        ></v-select>
        <v-expand-transition>
          <div v-show="expandTabaco" class="div-expansion">
            <div style="padding:0px 0px 0px 40px;">
              <div class="numero-modulo">* Presione <span class="boton-observaciones-im" @click="dialogObservacionesTabaco=true">aquí</span> si desea agregar alguna observación</div>
                <v-dialog v-model="dialogObservacionesTabaco" max-width="55%">
                  <v-card>
                    <v-card-title>Observaciones</v-card-title>
                    <v-card-text>
                      <TablaObservaciones
                        :lista_observaciones="habitos.consumo_tabaco.observaciones"
                      ></TablaObservaciones>
                      <br>
                      <v-btn
                        dark
                        color="#4172F2"
                        style="margin-bottom:10px"
                        @click="dialogObservacionesTabaco=false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-dialog> 
            </div>
          </div>
        </v-expand-transition>
      </div>
      <div>
        <div class="numero-modulo">¿Cual es su nivel de consumo de alcohol?</div>
        <v-select
          style="padding:0px 0px 0px 40px;"
          outlined
          :items="selectConsumo"
          label="Seleccione un nivel"
          v-model="habitos.consumo_alcohol.consumo"   
        ></v-select>
        <v-expand-transition>
          <div v-show="expandAlcohol" class="div-expansion">
            <div style="padding:0px 0px 0px 40px;">
              <div class="numero-modulo">* Presione <span class="boton-observaciones-im" @click="dialogObservacionesAlcohol=true">aquí</span> si desea agregar alguna observación</div>
              <v-dialog v-model="dialogObservacionesAlcohol" max-width="55%">
                <v-card>
                  <v-card-title>Observaciones</v-card-title>
                  <v-card-text>
                    <TablaObservaciones
                      :lista_observaciones="habitos.consumo_alcohol.observaciones"
                    ></TablaObservaciones>
                    <br>
                    <v-btn
                      dark
                      color="#4172F2"
                      style="margin-bottom:10px"
                      @click="dialogObservacionesAlcohol=false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog> 
            </div>
          </div>
        </v-expand-transition>
      </div>
      <div>
        <div class="numero-modulo">¿Cual es su nivel de consumo de drogas</div>
        <v-select
          outlined
          style="padding:0px 0px 0px 40px;"
          :items="selectConsumo"
          label="Seleccione un nivel"
          v-model="habitos.consumo_drogas.consumo"   
        ></v-select>
        <v-expand-transition>
          <div v-show="expandDrogas" class="div-expansion">
            <div style="padding:0px 0px 0px 40px;">
              <div class="numero-modulo">* Presione <span class="boton-observaciones-im" @click="dialogObservacionesDrogas=true">aquí</span> si desea agregar alguna observación</div>
              <v-dialog v-model="dialogObservacionesDrogas" max-width="55%">
                <v-card>
                  <v-card-title>Observaciones</v-card-title>
                  <v-card-text>
                    <TablaObservaciones
                      :lista_observaciones="habitos.consumo_drogas.observaciones"
                    ></TablaObservaciones>
                    <br>
                    <v-btn
                      dark
                      color="#4172F2"
                      style="margin-bottom:10px"
                      @click="dialogObservacionesDrogas=false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog> 
            </div>
          </div>
        </v-expand-transition>
      </div>
      <div>
        <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
        <v-btn style="margin-left:16px" text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
      </div>
    </form>
  </div>
</template>
<script>
import Vuelidate from "vuelidate";
import axios from "axios";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
//import { mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
import TablaObservaciones from "@/components/GestionarInformacionMedica/ComponentesAntecedentes/Nuevo/Tablas/TablaObservaciones"
export default {
  name: 'Habitos',
  props:['habitos'],
  components:{
    TablaObservaciones
  },
  data(){
    return{
      selectConsumo:[
        { value: "nunca", text: 'Nunca consumo/he consumido'},
        { value: "ocasional", text: 'Consumo ocasionalmente'},
        { value: "frecuente", text: 'Consumo de forma frecuente'},
        { value: "adiccion", text: 'En adiccion'},

      ],
      dialogObservacionesTabaco:false,
      dialogObservacionesAlcohol:false,
      dialogObservacionesDrogas:false,
      expandTabaco:false,
      expandAlcohol:false,
      expandDrogas:false,
      
    }
  },
  created(){
    if(this.habitos.consumo_tabaco.consumo!="nunca"){
      this.expandTabaco = true
    }
    if(this.habitos.consumo_alcohol.consumo!="nunca"){
      this.expandAlcohol = true
    }
    if(this.habitos.consumo_drogas.consumo!="nunca"){
      this.expandDrogas = true
    }
  },
  methods:{
    CambiarSeccion(valor) {
      this.$emit("emit-cambiar-seccion",valor);
    },
  },
  watch:{
    'habitos.consumo_tabaco.consumo': function (newVal){
      if(newVal!=null||newVal!=""){
        if(newVal=="nunca"){
          this.expandTabaco = false
        }else{
          this.expandTabaco = true
        }
      }else{
        this.expandTabaco = false
      }
    },
    'habitos.consumo_alcohol.consumo': function (newVal){
      if(newVal!=null||newVal!=""){
        if(newVal=="nunca"){
          this.expandAlcohol = false
        }else{
          this.expandAlcohol = true
        }
      }else{
        this.expandAlcohol = false
      }
    },
    'habitos.consumo_drogas.consumo': function (newVal){
      if(newVal!=null||newVal!=""){
        if(newVal=="nunca"){
          this.expandDrogas = false
        }else{
          this.expandDrogas = true
        }
      }else{
        this.expandDrogas = false
      }
    },
  },
}
</script>

<style scoped>
.v-select{
  margin-bottom:0px !important;
}
</style>