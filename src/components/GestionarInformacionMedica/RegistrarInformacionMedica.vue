<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Información Medica</v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">General</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">Antecedentes<br>(opcional)</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <div class="container-user">
              <form style="margin-top: 15px">
                <v-text-field
                  v-model.trim="datos.lugar_nacimiento"
                  label="Ingrese su lugar de nacimiento"
                  outlined
                  color="#009900"
                  @input="$v.datos.lugar_nacimiento.$touch()"
                  @blur="$v.datos.lugar_nacimiento.$touch()"
                  :error-messages="error_lugar_nacimiento"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.procedencia"
                  label="Ingrese su procedencia"
                  outlined
                  color="#009900"
                  @input="$v.datos.procedencia.$touch()"
                  @blur="$v.datos.procedencia.$touch()"
                  :error-messages="error_procedencia"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.grupo_instruccion"
                  label="Ingrese su grupo de instruccion"
                  outlined
                  color="#009900"
                  @input="$v.datos.grupo_instruccion.$touch()"
                  @blur="$v.datos.grupo_instruccion.$touch()"
                  :error-messages="error_grupo_instruccion"
                ></v-text-field>
                <v-select
                  :items="['Casado','Soltero','Viudo','Divorciado']"
                  label="Ingrese su estado civil"
                  outlined
                  v-model="datos.estado_civil"
                  @input="$v.datos.estado_civil.$touch()"
                  @blur="$v.datos.estado_civil.$touch()"
                  :error-messages="error_estado_civil"
                  color="#009900"       
                ></v-select>
                <v-text-field
                  v-model.trim="datos.domicilio"
                  label="Ingrese su domicilio"
                  outlined
                  color="#009900"
                  @input="$v.datos.domicilio.$touch()"
                  @blur="$v.datos.domicilio.$touch()"
                  :error-messages="error_domicilio"
                ></v-text-field>
                <v-select
                  :items="['Grupo A','Grupo B','C','Grupo C']"
                  label="Ingrese su grupo sanguineo"
                  outlined
                  v-model="datos.grupo_sanguineo"
                  @input="$v.datos.grupo_sanguineo.$touch()"
                  @blur="$v.datos.grupo_sanguineo.$touch()"
                  :error-messages="error_grupo_sanguineo"
                  color="#009900"       
                ></v-select>
                
                <v-text-field
                  v-model.trim="datos.ocupacion"
                  label="Ingrese su ocupacion"
                  outlined
                  color="#009900"
                  @input="$v.datos.ocupacion.$touch()"
                  @blur="$v.datos.ocupacion.$touch()"
                  :error-messages="error_ocupacion"
                ></v-text-field>
                <v-expansion-panels flat class="borde-fino" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Tutores Legales</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <TablaTutoresLegales
                        :lista_tutores_legales="lista_tutores_legales"
                        ref="stefanito"
                      ></TablaTutoresLegales>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-card-actions style="padding-left:0px">
                  <v-btn
                  class="ma-2 boton-izquierda"
                  color="primary"
                  dark
                  @click="GuardarContinuar()"
                >
                  Guardar y continuar
                  <v-icon
                    dark
                    right
                  >
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-btn>
                </v-card-actions>
                <!-- BOTONES DE AVANZAR Y RETROCEDER
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                >
                  <v-icon
                    dark
                    left
                  >
                    mdi-arrow-left
                  </v-icon>Retroceder
                </v-btn>
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                >
                  Accept
                  <v-icon
                    dark
                    right
                  >
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
                -->
              </form>
            </div>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-expansion-panels flat>
              <v-expansion-panel class="borde-fino por-panel">
                <v-expansion-panel-header>Antecedentes Personales</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaAntecedentesPersonales
                    :lista_personales="lista_personales"
                  ></TablaAntecedentesPersonales>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="borde-fino por-panel">
                <v-expansion-panel-header>Antecedentes Familiares</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaAntecedentesFamiliares></TablaAntecedentesFamiliares>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="borde-fino por-panel">
                <v-expansion-panel-header>Antecedentes Psicosociales</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaAntecedentesPsicosociales></TablaAntecedentesPsicosociales>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="borde-fino por-panel">
                <v-expansion-panel-header>Antecedentes Sexuales</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaAntecedentesSexuales></TablaAntecedentesSexuales>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="borde-fino por-panel">
                <v-expansion-panel-header>Problemas Cronicos</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <TablaAntecedentesProblemasCronicos></TablaAntecedentesProblemasCronicos>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>  
    </v-card-text>
  </v-card>
</template>

<script>
import Vuelidate from "vuelidate";
//import axios from "axios";
//import vue2Dropzone from "vue2-dropzone";
//import "vue2-dropzone/dist/vue2Dropzone.min.css";
//import { mapMutations, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import TablaTutoresLegales from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaTutoresLegales"
import TablaAntecedentesPersonales from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesPersonales"
import TablaAntecedentesFamiliares from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesFamiliares"
import TablaAntecedentesPsicosociales from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesPsicosociales"
import TablaAntecedentesSexuales from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesSexuales"
import TablaAntecedentesProblemasCronicos from "@/components/GestionarInformacionMedica/ComponentesTablas/TablaAntecedentesProblemasCronicos"
//Para una sola palabra o frase
function esTexto(value) {
  return /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}
//Para oraciones o parrafos
function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value); 
}

export default {
  name:"RegistrarInformacionMedica",
  components:{
    TablaTutoresLegales,
    TablaAntecedentesPersonales,
    TablaAntecedentesFamiliares,
    TablaAntecedentesPsicosociales,
    TablaAntecedentesSexuales,
    TablaAntecedentesProblemasCronicos
  },
  data(){
    return{
      step:1,
      textoErrores:{
        requerido: 'Debe llenar el campo obligatoriamente',
        crtEspeciales:'El campo no puede contener caracteres especiales'
      },
      //Dentro del campo "antecedentes"
      lista_tutores_legales:[],
      lista_personales:[],
      lista_psicosociales:{},
      objeto_sexuales:{},
      lista_problemas_cronicos:[],

      antecedentes:{
        personales:[],
        familiares:[],
        // psicosociales:{
        //   educacion:[],
        //   laborales:[],
        //   habitos_nocivos:[],
        //   medicacion_habitual:[],
        //   habitos_generales:[],
        //   sociales:[]
        // },
        psicosociales:{},
        sexuales:{},
        problemas_cronicos:[]
      },
      datos:{
        lugar_nacimiento:'',
        procedencia:'',
        grupo_instruccion:'',
        estado_civil:'',
        domicilio:'',
        ocupacion:'',
        grupo_sanguineo:'',
        tutores_legales:[]
      },
      //tutores_legales:[]
      
    }
  },



  computed:{
    
    error_lugar_nacimiento() {
      const errors = [];
      if (!this.$v.datos.lugar_nacimiento.$dirty) return errors;
      !this.$v.datos.lugar_nacimiento.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.lugar_nacimiento.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_procedencia() {
      const errors = [];
      if (!this.$v.datos.procedencia.$dirty) return errors;
      !this.$v.datos.procedencia.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.procedencia.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_grupo_instruccion() {
      const errors = [];
      if (!this.$v.datos.grupo_instruccion.$dirty) return errors;
      !this.$v.datos.grupo_instruccion.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.grupo_instruccion.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_estado_civil() {
      const errors = [];
      if (!this.$v.datos.estado_civil.$dirty) return errors;
      !this.$v.datos.estado_civil.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_domicilio() {
      const errors = [];
      if (!this.$v.datos.domicilio.$dirty) return errors;
      !this.$v.datos.domicilio.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.domicilio.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },
    error_grupo_sanguineo() {
      const errors = [];
      if (!this.$v.datos.grupo_sanguineo.$dirty) return errors;
      !this.$v.datos.grupo_sanguineo.required &&
        errors.push(this.textoErrores.requerido);
      return errors;
    },
    error_ocupacion() {
      const errors = [];
      if (!this.$v.datos.ocupacion.$dirty) return errors;
      !this.$v.datos.ocupacion.required &&
        errors.push(this.textoErrores.requerido);
      !this.$v.datos.ocupacion.esParrafo &&
        errors.push(this.textoErrores.crtEspeciales);
      return errors;
    },

  },
  methods: {
    Limpiar(){
      this.lista_tutores_legales = [];
      
    },
    cerrarDialogo() {
      //this.$v.datos.$reset();
      this.step = 1;
      //this.datos = this.limpiarResidente();
      this.$emit("emit-close-dialog");
    },
    GuardarContinuar(){
      //this.datos.tutores_legales = this.tutores_legales;
      //this.$refs.stefanito.miau()
      //console.log(this.$refs.stefanito.lista_tutores_legales);
      this.datos.tutores_legales = this.lista_tutores_legales;
      this.step=2;
      this.Limpiar();
    },

  },
  validations(){
    return{
      datos:{
        lugar_nacimiento:{
          required,
          esParrafo
        },
        procedencia:{
          required,
          esParrafo
        },
        grupo_instruccion:{
          required,
          esParrafo
        },
        estado_civil:{
          required,
        },
        domicilio:{
          required,
          esParrafo
        },
        grupo_sanguineo:{
          required,
        },
        ocupacion:{
          required,
          esParrafo
        },
        
      },
    }
  }
}
//jum pruebita aaaaaaaaaaaa
//background-color: rgba(0,0,0,0.7);
</script>

<style scoped>
.borde-fino{
  border-color: rgba(0, 0, 0, 0.42) !important;
  border-top-color: rgba(0, 0, 0, 0.42) !important;
  border-right-color: rgba(0, 0, 0, 0.42) !important;
  border-bottom-color: rgba(0, 0, 0, 0.42) !important;
  border-left-color: rgba(0, 0, 0, 0.42) !important;
  border-style: solid !important;
  border-top-style: solid !important;
  border-right-style: solid !important;
  border-bottom-style: solid !important;
  border-left-style: solid  !important;
  border-width: thin 0 thin 0 !important;
  border-top-width: thin  !important;
  border-right-width: thin !important;
  border-bottom-width: thin !important;
  border-left-width: thin !important;
}
.por-panel{
  margin-bottom: 1%;
}
.boton-izquierda{
  float: left  !important;
  margin-left: 0px !important;
}

.boton-derecha{
  float: right !important;
  margin-right: 0px !important;
}
</style>