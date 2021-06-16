<template>
  <div style="margin-top: 20px;" class="home">
      <v-card elevation="3" class="card" style="width: 95%">
        <v-col>
            <v-row>
                <iframe style="margin-left: 20px; margin-top: 20px;" height="400px" width="600px" allow="camera;microphone" :src="enlace_cita"></iframe>
            </v-row>
            <v-row style="margin: 0 auto; margin-top: 20px">
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Anamnesis</v-expansion-panel-header>
                    <v-expansion-panel-content style="padding-top: 20px;">
                      <v-textarea
                          label="Ingrese la anamnesis"
                          v-model.trim="acto_medico.anamnesis"
                          outlined
                          color="#009900"
                          rows="3"
                          auto-grow
                        ></v-textarea>
                      <!--
                        @input="$v.egreso.$touch()"
                        @blur="$v.egreso.$touch()"
                        :error-messages="errorTextoegreso"
                      -->
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Prescripción</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Antecedentes</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <!--mi tabla-->
                      <h1>Hola</h1>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Signos vitales</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <h1>Constantes vitales</h1>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Temperatura</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.temperatura.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.temperatura.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Presión arterial</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.presion_arterial.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.presion_arterial.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Saturacion</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.saturacion.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.saturacion.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Frecuencia Cardiaca</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.frecuencia_cardiaca.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.frecuencia_cardiaca.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Frecuencia Respiratoria</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.frecuencia_respiratoria.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.constantes_vitales.frecuencia_respiratoria.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>

                      <h1>Datos antropométricos</h1>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Peso</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.peso.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.peso.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Talla</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.talla.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.talla.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Perímetro Abdominal</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.perimetro_abdominal.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.perimetro_abdominal.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>Superficie Corporal</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.superficie_corporal.valor"
                              label="Valor" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.superficie_corporal.medida"
                              label="Medida" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>
                      <v-card flat>
                        <v-row>
                          <v-col :cols="4">
                            <h2>IMC</h2>
                          </v-col>
                          <v-col :cols="3">
                            <v-text-field 
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.imc"
                              label="Valor IMC" 
                              color="#009900"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col :cols="2" align="right">
                            <v-select
                              :items="itemClasificacionIMC"
                              v-model.trim="acto_medico.signos_vitales.datos_antropometricos.clasificacion_imc"
                              label="Clasificación IMC"
                              outlined
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-card>
                      <v-divider></v-divider>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Diagnóstico</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-expansion-panels flat class="borde-fino-expansion-panel" >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Indicaciones</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-textarea
                          label="Ingrese las indicaciones"
                          v-model.trim="acto_medico.indicaciones"
                          outlined
                          color="#009900"
                          rows="3"
                          auto-grow
                        ></v-textarea>
                      <!--
                        @input="$v.egreso.$touch()"
                        @blur="$v.egreso.$touch()"
                        :error-messages="errorTextoegreso"
                      -->
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </v-col>
      </v-card>
  </div>
</template>
<script>

import axios from "axios";
import CardPaciente from '@/components/CardPaciente.vue'
//import { mapState, mapMutations } from "vuex";

export default {
  name: "IniciarAtencion",
  data: () => ({
    itemClasificacionIMC: [
      { value: "obesidad morbosa", text: "Obesidad Morbosa" },
      { value: "obesidad", text: "Obesidad" },
      { value: "sobrepeso", text: "Sobrepeso" },
      { value: "normal", text: "Normal" },
      { value: "delgadez", text: "Delgadez" },
      { value: "delgadez severa", text: "Delgadez Severa" }
    ],
    acto_medico: {
      anamnesis: "",
      indicaciones: "",
      signos_vitales: {
        constantes_vitales: {
            temperatura: {
                valor: "",
                medida: "ºC"
            },
            presion_arterial: {
                valor: "",
                medida: "mmhg"
            },
            saturacion: {
                valor: "",
                medida: "%"
            },
            frecuencia_cardiaca: {
                valor: "",
                medida: "min"
            },
            frecuencia_respiratoria: {
                valor: "",
                medida: "min"
            }
        },
        datos_antropometricos: {
            peso: {
                valor: "",
                medida: "kg"
            },
            talla: {
                valor: "",
                medida: "m"
            },
            perimetro_abdominal: {
                valor: "",
                medida: "cm"
            },
            superficie_corporal: {
                valor: "",
                medida: "m2"
            },
            imc: 0,
            clasificacion_imc: ""
        },
      },
    },
    enlace_cita: "",
     anamnesis: "",
  }),
  components : {
      
  },
  mounted () {
      
  },
  async created() {
    
    this.enlace_cita = this.$route.params.datitos.enlace_cita;
    
  },
  methods: {
    navegarto(ruta){
      this.$router.push(ruta)
    },
  },
  computed: {

  },
  filters: {
    
  },
};
</script>

<style lang="scss">
    .home {
    margin: 1%;
    display: flex;
    justify-content: space-around;   
    }
    
</style>