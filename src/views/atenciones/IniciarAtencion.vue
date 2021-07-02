<template>
  <div style="margin-top: 20px" class="home">
    <v-card elevation="3" class="card" style="width: 95%">
      <v-col>
        <v-row>
           <iframe
            style="margin: 0 auto; margin-top: 20px"
            height="400px"
            width="600px"
            allow="camera;microphone"
            :src="enlace_cita"
          ></iframe> 
        </v-row>
        <v-row style="margin: 0 auto; margin-top: 20px">
          <v-expansion-panels flat class="borde-fino-expansion-panel">
            <v-expansion-panel>
              <v-expansion-panel-header>Anamnesis</v-expansion-panel-header>
              <v-expansion-panel-content style="padding-top: 20px">
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
          <v-expansion-panels flat class="borde-fino-expansion-panel">
            <v-expansion-panel>
              <v-expansion-panel-header>Medicación</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mx-auto">
                  <v-toolbar color="indigo darken-1" dark>
                    <v-toolbar-title>Medicación previa</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-dialog
                      v-model="dialogmedicacionprevia"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="success" dark v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <!--<v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model.trim="medicacion_previa_item.codigo"
                                  label="Código"
                                  color="#009900"
                                  outlined
                                ></v-text-field>
                              </v-col>-->
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model.trim="medicacion_previa_item.nombre"
                                  label="Medicamento"
                                  color="#009900"
                                  outlined
                                  placeholder="Medicamento"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model.trim="medicacion_previa_item.dosis"
                                  label="Dosis"
                                  color="#009900"
                                  outlined
                                  placeholder="Dosis"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-container grid-list-md text-xs-center>
                                  <v-layout row wrap>
                                    <v-flex xs10>
                                      <v-text-field
                                        v-model.trim="observacion_item"
                                        label="Observación"
                                        color="#009900"
                                        outlined
                                        placeholder="Observación"
                                      ></v-text-field>
                                    </v-flex>
                                    <v-flex xs2>
                                      <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        color="success"
                                        @click="agregarObservacionPM"
                                      >
                                        <v-icon dark>mdi-plus</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                                <v-list flat>
                                  <v-list-item
                                    v-for="(item, i) in lista_observacion_item"
                                    :key="i"
                                    class="item-list"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title>{{
                                        item
                                      }}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                      <v-icon
                                        left
                                        color="red"
                                        @click="eliminarObservacionPM(i)"
                                        >mdi-minus-circle</v-icon
                                      >Eliminar
                                    </v-list-item-icon>
                                  </v-list-item>
                                </v-list>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="cerrarDialogMedicacionPrevia"
                          >
                            <!--@click="dialogmedicacionprevia = false"-->
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="agregarDialogMedicacionPrevia"
                            >Registrar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>

                  <v-alert
                    v-if="acto_medico.medicacion.medicacion_previa.length == 0"
                    style="margin-top: 15px"
                    text
                    outlined
                    border="left"
                    color="deep-orange"
                    width="97%"
                    class="ml-3"
                    icon="info"
                  >
                    No se ha registrado ninguna medicación previa
                  </v-alert>

                  <v-list subheader two-line rounded>
                    <v-list-item
                      v-for="(item, i) in acto_medico.medicacion
                        .medicacion_previa"
                      :key="i"
                    >
                      <v-list-item-avatar>
                        <v-avatar color="indigo">
                          <v-icon dark>mdi-message-text</v-icon>
                        </v-avatar>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.nombre"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="'Dosis:' + item.dosis"
                        ></v-list-item-subtitle>
                        <!--v-text="'Código: ' + item.codigo + '- Dosis:' + item.dosis"-->
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-row>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="blue darken-2"
                              dark
                              @click="verOBSPM(i)"
                            >
                              <v-icon dark
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="red"
                              dark
                              @click="eliminarPM(i)"
                            >
                              <v-icon dark>mdi-minus-circle</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-dialog
                  v-model="dialogverOBSmedicacionprevia"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"
                        >Observaciones de la medicación previa</span
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-list flat>
                        <v-list-item
                          v-for="(item, i) in VISlista_observacion_item"
                          :key="i"
                          class="item-list"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              >Observación {{ i + 1 }}:
                              {{ item }}</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogverOBSmedicacionprevia = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!--Reaccion adversa-->
                <v-card class="mx-auto">
                  <v-toolbar color="indigo darken-1" dark>
                    <v-toolbar-title>Reacción adversa</v-toolbar-title>

                    <v-spacer></v-spacer>
                  </v-toolbar>

                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs10>
                        <v-text-field
                          v-model.trim="reaccion_adversa_item"
                          label="Reacción adversa"
                          color="#009900"
                          outlined
                          placeholder="Reacción adversa"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          color="success"
                          @click="agregarReaccionAdversa"
                        >
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>

                  <v-alert
                    v-if="acto_medico.medicacion.reaccion_adversa.length == 0"
                    style="margin-top: 15px"
                    text
                    outlined
                    border="left"
                    color="deep-orange"
                    width="97%"
                    class="ml-3"
                    icon="info"
                  >
                    No se ha registrado ninguna reacción adversa
                  </v-alert>

                  <v-list subheader two-line rounded>
                    <v-list-item
                      v-for="(item, i) in acto_medico.medicacion
                        .reaccion_adversa"
                      :key="i"
                    >
                      <v-list-item-avatar>
                        <v-avatar color="indigo">
                          <v-icon dark>widgets</v-icon>
                        </v-avatar>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          >Reacción adversa {{ i + 1 }}</v-list-item-title
                        >

                        <v-list-item-subtitle>
                          {{ item }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-row>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="red"
                              dark
                              @click="eliminarreaccionadversas(i)"
                            >
                              <v-icon dark>mdi-minus-circle</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels flat class="borde-fino-expansion-panel">
            <v-expansion-panel>
              <v-expansion-panel-header
                >Signos vitales</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <h1>Constantes vitales</h1>
                <v-card flat>
                  <v-row>
                    <v-col :cols="4">
                      <h2>Temperatura</h2>
                    </v-col>
                    <v-col :cols="3">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .temperatura.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .temperatura.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .presion_arterial.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .presion_arterial.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .saturacion.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .saturacion.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .frecuencia_cardiaca.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .frecuencia_cardiaca.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .frecuencia_respiratoria.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.constantes_vitales
                            .frecuencia_respiratoria.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos.peso
                            .valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos.peso
                            .medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos.talla
                            .valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos.talla
                            .medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos
                            .perimetro_abdominal.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos
                            .perimetro_abdominal.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos
                            .superficie_corporal.valor
                        "
                        label="Valor"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-text-field
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos
                            .superficie_corporal.medida
                        "
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
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos.imc
                        "
                        label="Valor IMC"
                        color="#009900"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="2" align="right">
                      <v-select
                        :items="itemClasificacionIMC"
                        v-model.trim="
                          acto_medico.signos_vitales.datos_antropometricos
                            .clasificacion_imc
                        "
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
          <v-expansion-panels flat class="borde-fino-expansion-panel">
            <v-expansion-panel>
              <v-expansion-panel-header>Diagnóstico</v-expansion-panel-header>
              <v-expansion-panel-content></v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels flat class="borde-fino-expansion-panel">
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
      <v-btn
        color="success"
        elevation="2"
        style="color: white; margin-left: 15px; margin-bottom: 15px"
        @click="actualizandoAM"
      >
        <v-icon left>mdi-check</v-icon>GUARDAR
      </v-btn>
      <v-btn
        color="warning"
        elevation="2"
        style="color: white; margin-left: 15px; margin-bottom: 15px"
        @click="finalizar"
      >
        <v-icon left>mdi-check</v-icon>FINALIZAR
      </v-btn>
    </v-card>
    <v-snackbar v-model="snackbar" color="success" elevation="24" bottom>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center">
      <v-dialog v-model="dialogConfirmacion" max-width="500">
        <v-card>
          <v-card-title class="text-h2">
            ¿Esta seguro que desea finalizar?
          </v-card-title>

          <v-card-text>
            La acción no se podrá deshacer y no podrá editar más los campos.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmacion = false"
            >
              Me arrepenti
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="terminar()"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import CardPaciente from "@/components/CardPaciente.vue";
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
      { value: "delgadez severa", text: "Delgadez Severa" },
    ],
    dialogmedicacionprevia: false,
    reaccion_adversa_item: "",
    observacion_item: "",
    lista_observacion_item: [],
    VISlista_observacion_item: [],
    dialogverOBSmedicacionprevia: false,
    medicacion_previa_item: {
      codigo: "",
      nombre: "",
      dosis: "",
      observaciones: [],
    },
    acto_medico: {
      anamnesis: "",
      indicaciones: "",
      diagnostico: [],
      medicacion: {
        medicacion_previa: [],
        reaccion_adversa: [],
      },
      signos_vitales: {
        constantes_vitales: {
          temperatura: {
            valor: "",
            medida: "ºC",
          },
          presion_arterial: {
            valor: "",
            medida: "mmhg",
          },
          saturacion: {
            valor: "",
            medida: "%",
          },
          frecuencia_cardiaca: {
            valor: "",
            medida: "min",
          },
          frecuencia_respiratoria: {
            valor: "",
            medida: "min",
          },
        },
        datos_antropometricos: {
          peso: {
            valor: "",
            medida: "kg",
          },
          talla: {
            valor: "",
            medida: "m",
          },
          perimetro_abdominal: {
            valor: "",
            medida: "cm",
          },
          superficie_corporal: {
            valor: "",
            medida: "m2",
          },
          imc: 0,
          clasificacion_imc: "",
        },
      },
    },
    enlace_cita: "",
    anamnesis: "",
    dialogConfirmacion: false,
    snackbar: false,
    text: `Se guardo exitosamente! :)`,
    idHistoria: "",
    historia: {
      id: "",
      historial: [],
    },
    cita: {},
  }),
  components: {},
  mounted() {},
  async created() {
    this.enlace_cita = this.$route.params.datitos.enlace_cita;
    console.log("idcita");
    console.log(this.$route.params.datitos.cita);
    await this.obtenerActoMedico();
    await this.getCita(this.$route.params.datitos.cita);
  },
  methods: {
    async obtenerActoMedico() {
      await axios
        .get("/ActoMedico/id?id=" + this.$route.params.datitos.id_acto_medico)
        .then((x) => {
          console.log("Acto obtenido de la BD");
          console.log(x.data);
          this.acto_medico = x.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async actualizandoAM() {
      await axios
        .put("/ActoMedico/Actualizar", this.acto_medico)
        .then((x) => {
          console.log("GUARDADO PS");
          console.log(x.data);
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCita(idCita) {
      await axios
        .get(`/Cita/id?id=${idCita}`)
        .then(async (x) => {
          console.log("información de la cita");
          console.log(x.data);
          this.cita = x.data;
          await axios
            .get(`/Paciente?id=${x.data.id_paciente}`)
            .then((y) => {
              console.log("información del paciente");
              console.log(y.data);
              console.log(y.data.id_usuario);
              this.idHistoria = y.data.id_historia;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    async obtenerHistoria(idHistoria) {
      await axios
        .get("/Historia/id?id=" + idHistoria)
        .then(async (x) => {
          this.historia = x.data;
          console.log("historiaaa");
          console.log(this.historia);
          //
          this.historia.id = this.idHistoria;
          var historial = {
            fecha_cita: "",
            hora_inicio: "",
            hora_fin: "",
            datos_medico: {
              nombre_medico: "",
              id_medico: "",
              nombre_especialidad: "",
            },
            id_cita: "",
          };
          historial.fecha_cita = this.cita.fecha_cita;
          historial.hora_inicio = "8:00";
          historial.hora_fin = "8:30";
          historial.datos_medico.nombre_medico =
            this.cita.datos_turno.datos_medico.nombre_apellido_medico;
          historial.datos_medico.id_medico = "60de35894e17be0e9fa5dea4";
          historial.datos_medico.nombre_especialidad =
            this.cita.datos_turno.especialidad.nombre;
          historial.id_cita = this.cita.id;
          this.historia.historial = [];
          this.historia.historial.push(historial);
          console.log("Historia pusheada");
          console.log(this.historia);
          //hace el put c: 
          await axios
            .put("/Historia/historia", this.historia)
            .then((res) => {
              console.log("fdskjfdsfkjsdfs");
              console.log(res.data);
            })
            .catch((err) => console.log(err));


        })
        .catch((err) => console.log(err));
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    },
    agregarReaccionAdversa() {
      //this.$v.conductasemocionales.$touch();
      //if (!this.$v.conductasemocionales.$invalid) {
      let reaccionadversa = this.reaccion_adversa_item;

      this.acto_medico.medicacion.reaccion_adversa.push(reaccionadversa);

      this.reaccion_adversa_item = "";
      //this.$v.conductasemocionales.$reset();
      // }
    },
    agregarObservacionPM() {
      //this.$v.conductasemocionales.$touch();
      //if (!this.$v.conductasemocionales.$invalid) {
      let obsPM = this.observacion_item;

      this.lista_observacion_item.push(obsPM);

      this.observacion_item = "";
      //this.$v.conductasemocionales.$reset();
      // }
    },
    agregarDialogMedicacionPrevia() {
      //agregamos
      let nuevaPM = {
        codigo: this.medicacion_previa_item.codigo,
        nombre: this.medicacion_previa_item.nombre,
        dosis: this.medicacion_previa_item.dosis,
        observaciones: this.lista_observacion_item,
      };
      this.acto_medico.medicacion.medicacion_previa.push(nuevaPM);
      //cerramos y limpiamos
      this.cerrarDialogMedicacionPrevia();
    },
    eliminarreaccionadversas(index) {
      this.acto_medico.medicacion.reaccion_adversa.splice(index, 1);
    },
    eliminarObservacionPM(index) {
      this.lista_observacion_item.splice(index, 1);
    },
    eliminarPM(index) {
      this.acto_medico.medicacion.medicacion_previa.splice(index, 1);
    },
    verOBSPM(index) {
      this.VISlista_observacion_item =
        this.acto_medico.medicacion.medicacion_previa[index].observaciones;
      this.dialogverOBSmedicacionprevia = true;
    },
    cerrarDialogMedicacionPrevia() {
      //limpiar data
      this.limpiarMedicacionPreviaModal();
      //fin limpieza
      this.dialogmedicacionprevia = false;
    },
    limpiarMedicacionPreviaModal() {
      this.medicacion_previa_item = {
        codigo: "",
        nombre: "",
        dosis: "",
        observaciones: [],
      };
      this.lista_observacion_item = [];
      this.observacion_item = "";
    },
    async finalizar() {      
      this.dialogConfirmacion = true;            
    },
    terminar(){
      this.obtenerHistoria(this.idHistoria);
      this.dialogConfirmacion = false;
      this.navegarto('/');
    }
  },
  computed: {},
  filters: {},
};
</script>

<style lang="scss">
.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
</style>