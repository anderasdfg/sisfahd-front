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
                              <v-col cols="12" sm="6" md="6">
                                <v-autocomplete
                                  label="Medicamento"
                                  outlined
                                  v-model="medicamento"
                                  :loading="loadingSearch"
                                  :search-input.sync="searchMedicamento"
                                  :items="listMedicamento"
                                  item-text="nombre"
                                  item-value="codigo"
                                  hide-no-data
                                  hide-selected
                                  return-object
                                >
                                  <template v-slot:item="item">
                                    <v-list-item-avatar
                                      color="primary"
                                      class="headline font-weight-light white--text"
                                    >
                                      {{ item.item.nombre.charAt(0) }}
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        class="black--text">
                                        {{ item.item.nombre }}
                                      </v-list-item-title>
                                      <v-list-item-subtitle
                                        class="font-weight-light black--text">
                                        {{ item.item.concentracion  }} - {{ item.item.formula_farmaceutica }}
                                      </v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
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
                          v-for="tag in splitJoin(item.nombre)" :key="tag"
                        >
                          {{ tag }}
                        </v-list-item-title>

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
                <h2>Constantes vitales</h2>
                <v-card flat>
                  <v-row>
                    <v-col :cols="4">
                      <h4>Temperatura</h4>
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
                      <h4>Presión arterial</h4>
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
                      <h4>Saturacion</h4>
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
                      <h4>Frecuencia Cardiaca</h4>
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
                      <h4>Frecuencia Respiratoria</h4>
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

                <h2>Datos antropométricos</h2>
                <v-card flat>
                  <v-row>
                    <v-col :cols="4">
                      <h4>Peso</h4>
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
                      <h4>Talla</h4>
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
                      <h4>Perímetro Abdominal</h4>
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
                      <h4>Superficie Corporal</h4>
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
                      <h4>IMC</h4>
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
              <v-expansion-panel-content>
                <v-card class="mx-auto">
                  <v-toolbar color="indigo darken-1" dark>
                    <v-toolbar-title>Diagnóstico médico</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialogdiagnosticolista"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="success" dark v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <h2 class="title-card"> Registro de Diagnóstico</h2>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="4" md="4">
                                <v-autocomplete
                                  label="Código de enfermedad"
                                  outlined
                                  v-model="enfermedadDiagnostico"
                                  :loading="loadingSearchEnfermedad"
                                  :search-input.sync="searchEnfermedadByCodigo"
                                  :items="listEnfermedad"
                                  item-text="codigo_cie"
                                  item-value="codigo_cie"
                                  hide-no-data
                                  hide-selected
                                  return-object
                                >
                                  <!--@input="$v.residente.id.$touch()"
                                  @blur="$v.residente.id.$touch()"
                                  :error-messages="errorResidente"
                                  {{ item.nombre.charAt(0) }}-->
                                  <template v-slot:item="item">
                                    <v-list-item-avatar
                                      color="primary"
                                      class="headline font-weight-light white--text"
                                    >
                                      {{ item.item.descripcion.charAt(0) }}
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        >Código: {{ item.item.codigo_cie }}
                                      </v-list-item-title>
                                      <v-list-item-subtitle
                                        >Nombre: {{ item.item.descripcion }}
                                      </v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                <v-text-field
                                  v-model="enfermedadDiagnostico.descripcion"
                                  label="Nombre de enfermedad"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-combobox
                                  outlined
                                  v-model.trim="diagnostico_medico_lista.tipo"
                                  label="Tipo"
                                  :items="tipoDiagnostico"
                                ></v-combobox>                               
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-combobox
                                  outlined
                                  v-model.trim="diagnostico_medico_lista.frecuencia"
                                  label="Frecuencia"
                                  :items="tipoFrecuencia"
                                ></v-combobox>                                
                              </v-col>
                              <v-col cols="12">
                                <v-container grid-list-md text-xs-center>
                                  <v-layout row wrap>
                                    <v-flex xs10>
                                      <v-text-field
                                        v-model="observacion_item_diagnostico"
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
                                        @click="agregarObservacionDiagnostico"
                                      >
                                        <v-icon dark>mdi-plus</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                                <v-list flat>
                                  <v-list-item
                                    v-for="(item, i) in lista_observacion_item_diagnostico"
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
                                        @click="eliminarObservacionDiagnostico(i)"
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
                            @click="cerrarDialogDiagnosticoLista"
                          >
                            <!--@click="dialogmedicacionprevia = false"-->
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="agregarDialogDiagnostico"
                            >Registrar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                  <v-alert
                    v-if="acto_medico.diagnostico.length == 0"
                    style="margin-top: 15px"
                    text
                    outlined
                    border="left"
                    color="deep-orange"
                    width="97%"
                    class="ml-3"
                    icon="info"
                  >
                    No se ha registrado ningún diagnostico
                  </v-alert>

                  <v-list subheader two-line rounded>
                    <v-list-item
                      v-for="(item, i) in acto_medico.diagnostico"
                      :key="i"
                    >
                    
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Código enfermedad'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.codigo_enfermedad"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Nombre enfermedad'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.nombre_enfermedad"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Tipo'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.tipo"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Frecuencia'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.frecuencia"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                  
                      <v-list-item-action>
                        <v-row>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="blue darken-2"
                              dark
                              @click="verOBSDiagnostico(i)"
                            >
                              <v-icon dark
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="deep-purple"
                              dark
                              @click="verExamenesAuxiliaresDiagnostico(i)"
                            >
                              <v-icon dark>mdi-clipboard-text-search</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="orange"
                              dark
                              @click="verPrescripciónDiagnostico(i)"
                            >
                              <v-icon dark>mdi-pill</v-icon>
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="red"
                              dark
                              @click="eliminarDiagnostico(i)"
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
                  v-model="dialogverOBSDiagnostico"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"
                        >Observaciones del diagnostico</span
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-list flat>
                        <v-list-item
                          v-for="(item, i) in VISlista_observacion_item_diagnostico"
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
                        @click="dialogverOBSDiagnostico = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--Dialogo Examenes-->
                <template v-if="acto_medico.diagnostico.length != 0">
                <v-dialog
                  v-model="dialogverExamenesDiagnostico"
                  persistent
                  max-width="1200px"
                >
                  <v-card>
                  <v-card-title>
                    <h2 class="title-card"> Examenes Auxiliares</h2>
                  </v-card-title>
                  <v-card-text>
                  <v-toolbar color="indigo darken-1" dark>
                    <v-toolbar-title>Examenes Auxiliares</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialogexameneslista"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="success" dark v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <h2 class="title-card"> Registro de Exámen Auxiliar</h2>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">                               

                                <v-autocomplete
                                  label="Examen"
                                  outlined
                                  v-model="examenes_auxiliares_lista"
                                  :loading="loadingSearchExamenes"
                                  :search-input.sync="searchExamenesByNombre"
                                  :items="listExamenes"
                                  item-text="procedimiento"
                                  item-value="id"
                                  hide-no-data
                                  hide-selected
                                  return-object
                                >
                                  <template v-slot:item="item">
                                    <v-list-item-avatar
                                      color="primary"
                                      class="headline font-weight-light white--text"
                                    >
                                      {{ item.item.procedimiento.charAt(0) }}
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        >{{ item.item.procedimiento }}
                                      </v-list-item-title>                                      
                                    </v-list-item-content>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                              <!-- <v-col cols="12" sm="8" md="8">
                                <v-text-field
                                  v-model.trim="examenes_auxiliares_lista.procedimiento"
                                  label="Nombre"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model.trim="examenes_auxiliares_lista.nombre_grupo"
                                  label="Tipo"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col> -->
                              <v-col cols="12">
                                <v-container grid-list-md text-xs-center>
                                  <v-layout row wrap>
                                    <v-flex xs10>
                                      <v-text-field
                                        v-model="observacion_item_examenes"
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
                                        @click="agregarObservacionExamenes"
                                      >
                                        <v-icon dark>mdi-plus</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                                <v-list flat>
                                  <v-list-item
                                    v-for="(item, i) in lista_observacion_item_examenes"
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
                                        @click="eliminarObservacionExamenes(i)"
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
                            @click="cerrarDialogExamenesLista"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="agregarDialogExamenes"
                            >Registrar</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                  <v-alert
                    v-if="acto_medico.diagnostico[indice_auxiliar_examenes].examenes_auxiliares.length == 0"
                    style="margin-top: 15px"
                    text
                    outlined
                    border="left"
                    color="deep-orange"
                    width="97%"
                    class="ml-3"
                    icon="info"
                  >
                    No se ha registrado ningún exámen auxiliar en el diagnóstico
                  </v-alert>

                  <v-list subheader two-line rounded>
                    <v-list-item
                      v-for="(item, i) in acto_medico.diagnostico[indice_auxiliar_examenes].examenes_auxiliares"
                      :key="i"
                    >
                    
                        <!-- <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Código'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.codigo"
                          ></v-list-item-subtitle>
                        </v-list-item-content> -->
                      
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Nombre'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.nombre"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                       <!-- <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                         <v-list-item-content>
                          <v-list-item-title
                            v-text="'Tipo'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.tipo"
                          ></v-list-item-subtitle>
                        </v-list-item-content> -->
              
                      <v-list-item-action>
                        <v-row>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="blue darken-2"
                              dark
                              @click="verOBSExamenes(i)"
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
                              @click="eliminarExamen(i)"
                            >
                              <v-icon dark>mdi-minus-circle</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogverExamenesDiagnostico = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <!-- Ver Observaciones de Examens -->
                <v-dialog
                  v-model="dialogverOBSExamenes"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"
                        >Observaciones del Exámen Auxiliar</span
                      >
                    </v-card-title>
                    <v-card-text>
                      <v-list flat>
                        <v-list-item
                          v-for="(item, i) in VISlista_observacion_item_examenes"
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
                        @click="dialogverOBSExamenes = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--Dialogo Prescripción-->
                <v-dialog
                  v-model="dialogverPrescripcionDiagnostico"
                  persistent
                  max-width="1200px"
                >
                  <v-card>
                  <v-card-title>
                    <h2 class="title-card"> Prescripciones médicas</h2>
                  </v-card-title>
                  <v-card-text>
                  <v-toolbar color="indigo darken-1" dark>
                    <v-toolbar-title>Prescripciones médicas</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialogprescripcionlista"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="success" dark v-bind="attrs" v-on="on">
                          <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <h2 class="title-card"> Registro de Prescripción Médica</h2>
                        </v-card-title>
                        <div class="estilo-stepper">
                          <v-stepper v-model="step">
                            <v-stepper-header>
                              <v-stepper-step step="1" :complete="step>1">
                                Medicamento
                              </v-stepper-step>
                              <v-divider></v-divider>
                              <v-stepper-step step="2" :complete="step>2">
                                Dosis
                              </v-stepper-step>
                            </v-stepper-header>
                          <v-stepper-items>
                            <v-stepper-content step="1">
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="8" md="8">
                                <v-autocomplete
                                  label="Nombre del medicamento"
                                  outlined
                                  v-model="medicamentoDiagnostico"
                                  :loading="loadingSearchMediamentoDiagnostico"
                                  :search-input.sync="searchMedicamentoDiagnostico"
                                  :items="listMedicamentoDiagnostico"
                                  item-text="nombre"
                                  item-value="nombre"
                                  hide-no-data
                                  hide-selected
                                  return-object
                                >
                                  <!--@input="$v.residente.id.$touch()"
                                  @blur="$v.residente.id.$touch()"
                                  :error-messages="errorResidente"
                                  {{ item.nombre.charAt(0) }}-->
                                  <template v-slot:item="item">
                                    <v-list-item-avatar
                                      color="primary"
                                      class="headline font-weight-light white--text"
                                    >
                                      {{ item.item.nombre.charAt(0) }}
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                      <v-list-item-title
                                        class="black--text">
                                        {{ item.item.nombre }}
                                      </v-list-item-title>
                                      <v-list-item-subtitle
                                        class="font-weight-light black--text">
                                        {{ item.item.concentracion  }} - {{ item.item.formula_farmaceutica }}
                                      </v-list-item-subtitle>
                                    </v-list-item-content>
                                  </template>
                                </v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                  v-model.trim="medicamentoDiagnostico.codigo"
                                  label="Código del medicamento"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model.trim="medicamentoDiagnostico.formula_farmaceutica"
                                  label="Formula"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model.trim="medicamentoDiagnostico.concentracion"
                                  label="Concentración"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="cerrarDialogPrescripcionLista"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="step = 2"
                            >Continuar</v-btn
                          >
                        </v-card-actions>

                        </v-stepper-content>
                        <v-stepper-content step="2">
                          <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="4" md="4">
                                Consumir:
                                <v-text-field
                                  v-model.trim="prescripcion_medica_lista.dosis.cantidad"
                                  label="Cantidad"
                                  color="#009900"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                <br/>
                                <v-combobox
                                  v-model="prescripcion_medica_lista.dosis.via_administracion"
                                  :items="viasAdmnistración"
                                  label="Vía de administración"
                                  color="#009900"
                                  outlined
                                ></v-combobox>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                Cada:
                                <v-text-field
                                  v-model="prescripcion_medica_lista.dosis.frecuencia.valor"
                                  label="Valor de la frecuencia"
                                  color="#009900"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <br/>
                                <v-combobox
                                  v-model="prescripcion_medica_lista.dosis.frecuencia.medida"
                                  :items="frecuenciaMedida"
                                  label="Medida de la frecuencia"
                                  color="#009900"
                                  outlined
                                ></v-combobox>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                Durante:
                                <v-text-field
                                  v-model="prescripcion_medica_lista.dosis.tiempo.valor"
                                  label="Valor del tiempo de consumo"
                                  color="#009900"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <br/>
                                <v-combobox
                                  v-model="prescripcion_medica_lista.dosis.tiempo.medida"
                                  :items="tiempoMedida"
                                  label="Medida de del tiempo de consumo"
                                  color="#009900"
                                  outlined
                                ></v-combobox>
                              </v-col>
                              <v-col cols="12">
                                <v-container grid-list-md text-xs-center>
                                  <v-layout row wrap>
                                    <v-flex xs10>
                                      <v-text-field
                                        v-model="observacion_item_dosis"
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
                                        @click="agregarObservacionDosis"
                                      >
                                        <v-icon dark>mdi-plus</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-container>
                                <v-list flat>
                                  <v-list-item
                                    v-for="(item, i) in lista_observacion_item_dosis"
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
                                        @click="eliminarObservacionDosis(i)"
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
                            @click="step=1"
                          >
                            Volver
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="agregarPrescripcion"
                            >Registrar</v-btn>
                        </v-card-actions>
                        </v-stepper-content>
                        </v-stepper-items>
                      </v-stepper>
                    </div>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                  <v-alert
                    v-if="acto_medico.diagnostico[indice_auxiliar_prescripcion].prescripcion.length == 0"
                    style="margin-top: 15px"
                    text
                    outlined
                    border="left"
                    color="deep-orange"
                    width="97%"
                    class="ml-3"
                    icon="info"
                  >
                    No se ha registrado ninguna prescripción médica
                  </v-alert>

                  <v-list subheader two-line rounded>
                    <v-list-item
                      v-for="(item, i) in acto_medico.diagnostico[indice_auxiliar_prescripcion].prescripcion"
                      :key="i"
                    >
                    
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Código'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.codigo"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      
                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Nombre'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.nombre"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Formula'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.formula"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar>
                          <v-avatar color="indigo">
                            <v-icon dark>mdi-message-text</v-icon>
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Concentración'"
                          ></v-list-item-title>

                          <v-list-item-subtitle
                            v-text="item.concentracion"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
              
                      <v-list-item-action>
                        <v-row>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="blue darken-2"
                              dark
                              @click="verDosis(i)"
                            >
                              <v-icon dark
                                >mdi-pill</v-icon
                              >
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              class="ma-2"
                              color="red"
                              dark
                              @click="eliminarPrescripcion(i)"
                            >
                              <v-icon dark>mdi-minus-circle</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogverPrescripcionDiagnostico = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                </v-card>
                </v-dialog>
                <!--Dialogo actualizar Dosis-->
                    <v-dialog
                      v-model="dialogoactualizarprescripcion"
                      persistent
                      max-width="600px"
                    >
                      <v-card>
                        <v-card-title>
                          <h2 class="title-card"> Dosis </h2>
                        </v-card-title>
                          <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                  v-model.trim="dosis_visualizar.cantidad"
                                  label="Cantidad"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                <v-text-field
                                  v-model="dosis_visualizar.via_administracion"
                                  label="Vía de administración"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="dosis_visualizar.frecuencia.valor"
                                  label="Valor de la frencuencia"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="dosis_visualizar.frecuencia.medida"
                                  label="Medida de la frecuencia"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="dosis_visualizar.tiempo.valor"
                                  label="Valor del tiempo de consumo"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                  v-model="dosis_visualizar.tiempo.medida"
                                  label="Medida de del tiempo de consumo"
                                  color="#009900"
                                  outlined
                                  readonly
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-container grid-list-md text-xs-center>
                                  <h4>Observaciones</h4>
                                </v-container>
                                <v-list flat>
                                  <v-list-item
                                    v-for="(item, i) in dosis_visualizar.observaciones"
                                    :key="i"
                                    class="item-list"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title>Observación {{ i + 1 }}: {{ item }}</v-list-item-title>
                                    </v-list-item-content>
                              
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
                            @click="cerrarDialogDosisLista"
                          >
                            Cerrar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                </template>
              </v-expansion-panel-content>
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
       <v-btn
        color="succes"
        elevation="2"
        style="color: white; margin-left: 15px; margin-bottom: 15px"
        @click="agendar"
      >
        <v-icon left>mdi-check</v-icon>AGENDAR CITA
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
              No
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
    <v-dialog v-model="dialogAgendar" max-width="600">
        <Agendar :idCita="this.idCita"/>
      </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import Agendar from "@/components/ComponenteCitaSeguimiento/Agendar.vue"

export default {
  name: "IniciarAtencion",
  data: () => ({
    idCita: "",
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
    listMedicamento: [],
    dialogverOBSmedicacionprevia: false,
    searchMedicamento: null,
    loadingSearch: false,
    medicamento: {
      codigo: "",
      nombre: "",
      concentracion: "",
      formula_farmaceutica: "",
    },
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
    //Las cosas que he agregado
    diagnostico_medico_lista: {
      codigo_enfermedad: "",
      nombre_enfermedad: "",
      frecuencia: "",
      tipo: "",
      observaciones: [],
    },
    examenes_auxiliares_lista: {
      procedimiento: "",
      codigo_procedimiento: "",
      nombre_grupo: "",
      observaciones: [],
    },
    prescripcion_medica_lista: {
      codigo: "",
      nombre: "",
      formula: "",
      concentracion: "",
      dosis: {
        frecuencia:{
          valor: "",
          medida: "",
        },
        tiempo:{
          valor: "",
          medida: "",
        },
        cantidad:"",
        via_administracion:"",
        observaciones:[],
      }
    },
    indice_auxiliar_examenes: 0,
    indice_auxiliar_prescripcion: 0,
    dialogdiagnosticolista: false,
    dialogexameneslista: false,
    dialogprescripcionlista: false,
    observacion_item_diagnostico: "",
    observacion_item_examenes: "",
    observacion_item_dosis: "",
    lista_observacion_item_diagnostico: [],
    lista_observacion_item_examenes: [],
    lista_observacion_item_dosis: [],
    VISlista_observacion_item_diagnostico: [],
    VISlista_observacion_item_examenes: [],
    dialogverOBSDiagnostico: false,
    dialogverOBSExamenes: false,
    dialogverExamenesDiagnostico: false,
    dialogverPrescripcionDiagnostico: false,
    step: 1,
    dialogoactualizarprescripcion: false,
    dosis_visualizar:{
      frecuencia:{
          valor: "",
          medida: "",
        },
        tiempo:{
          valor: "",
          medida: "",
        },
        cantidad:"",
        via_administracion:"",
        observaciones:[],
    },
    enfermedadDiagnostico:{
      codigo_cie: "",
      descripcion: "",
    },
    loadingSearchEnfermedad: false,
    listEnfermedad: [],
    searchEnfermedadByCodigo: null,

    loadingSearchProcedimientos: false,
    listProcedimientos: [],
    searchProcedimientosByNombre: null,

    medicamentoDiagnostico: {
      codigo: "",
      nombre: "",
      concentracion: "",
      formula_farmaceutica: "",
    },
    loadingSearchMediamentoDiagnostico: false,
    listMedicamentoDiagnostico: [],
    searchMedicamentoDiagnostico: null,

    viasAdmnistración: ['Oral','Intravenosa','Intramuscular','Intratecal','Subcutánea',"Sublingual","Rectal","Vaginal","Ocular","Ótica","Nasal","Inhalatoria",
    "Nebulización", "Cutánea", "Transdérmica"],
    frecuenciaMedida: ['minutos','horas'],
    tiempoMedida: ['dias','semanas',"meses"],
    tipoDiagnostico: ['Presuntivo', 'Definitivo'],
    tipoFrecuencia: ['Crónico', 'Primera vez', 'Subsecuente'],

    loadingSearchExamenes: false,
    listExamenes: [],
    searchExamenesByNombre: null,
    dialogAgendar: false,

  }),
  components: {
    Agendar
  },
  watch: {
    searchMedicamento(value) {
      if (value == null || value == "") {
        this.medicamento = {
          codigo: "",
          nombre: "",
          concentracion: "",
          formula_farmaceutica: "",
        };
      }
      if (this.listMedicamento.length > 0 && value != null) {
        if (value.length < 3) {
          return;
        }
      }
      if (this.loadingSearch) {
        return;
      }
      

      this.loadingSearch = true;

      axios
        .get("/Medicamento/obtenerpornombre?nombre=" + value)
        .then((res) => {
          let medicamentosMap = res.data.map(function (res) {
            return {
              codigo: res.codigo,
              nombre: res.nombre,
              concentracion: res.concentracion,
              formula_farmaceutica: res.formula_farmaceutica,
            };
          });

          this.listMedicamento = medicamentosMap;
          console.log(this.listMedicamento);

          this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchEnfermedadByCodigo(value) {
      if (value == null || value == "") {
        this.enfermedadDiagnostico = {
          codigo_cie: "",
          descripcion: "",
        };
        return;
      }
      if (this.listMedicamento.length > 0 && value != null) {
        if (value.length < 2) {
          return;
        }
      }
      if (this.loadingSearchEnfermedad) {
        return;
      }
      this.loadingSearchEnfermedad = true;
      console.log("Este es mi value:" + value)
      axios
        .get("/Enfermedades/obtenerporcodigo?codigo=" + value.toUpperCase())
        .then((res) => {
          let enfermedadesMap = res.data.map(function (res) {
            return {
              codigo_cie: res.codigo_cie,
              descripcion: res.descripcion,
            };
          });

          this.listEnfermedad = enfermedadesMap;
          console.log(this.listEnfermedad);

          this.loadingSearchEnfermedad = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchProcedimientosByNombre(value){
      if (value == null || value == "") {
        this.examenes_auxiliares_lista = {
          procedimiento: "",
          codigo_procedimiento: "",
          nombre_grupo: "",
          observaciones: [],
        };
        return;
      }
      if (this.listProcedimientos.length > 0 && value != null) {
        if (value.length < 4) {
          return;
        }
      }
      if (this.loadingSearchProcedimientos) {
        return;
      }
      this.loadingSearchProcedimientos = true;
      console.log("Este es mi value:" + value)
      axios
        .get("/Procedimiento/obtenerpornombre?nombre=" + value)
        .then((res) => {
          let procedimientoMap = res.data.map(function (res) {
            return {
              procedimiento: res.procedimiento,
              codigo_procedimiento: res.codigo_procedimiento,
              nombre_grupo: res.nombre_grupo,
              observaciones:[],
            };
          });

          this.listProcedimientos = procedimientoMap;
          console.log(this.listProcedimientos);

          this.loadingSearchProcedimientos = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchExamenesByNombre(value){
      if (value == null || value == "") {
        this.examenes_auxiliares_lista = {
          procedimiento: "",
          codigo_procedimiento: "",
          nombre_grupo: "",
          observaciones: [],
        };
        return;
      }
      if (this.listExamenes.length > 0 && value != null) {
        if (value.length < 4) {
          return;
        }
      }
      if (this.loadingSearchExamenes) {
        return;
      }
      this.loadingSearchExamenes = true;
      console.log("Este es mi value:" + value)
      axios
        .get("/Examenes/nombre?nombre=" + value)
        .then((res) => {
          let examenesMap = res.data.map(function (res) {
            return {
              procedimiento: res.descripcion,
              codigo_procedimiento: res.id,
              nombre_grupo: res.descripcion,
              observaciones:[],
            };
          });

          this.listExamenes = examenesMap;
          console.log(this.listExamenes);

          this.loadingSearchExamenes = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchMedicamentoDiagnostico(value) {
      if (value == null || value == "") {
        this.medicamentoDiagnostico = {
          codigo: "",
          nombre: "",
          concentracion: "",
          formula_farmaceutica: "",
        };
        return;
      }
      if (this.listMedicamentoDiagnostico.length > 0 && value != null) {
        if (value.length < 3) {
          return;
        }
      }
      if (this.loadingSearchMediamentoDiagnostico) {
        return;
      }
      

      this.loadingSearchMediamentoDiagnostico = true;

      axios
        .get("/Medicamento/obtenerpornombre?nombre=" + value.toUpperCase())
        .then((res) => {
          let medicamentosMap = res.data.map(function (res) {
            return {
              codigo: res.codigo,
              nombre: res.nombre,
              concentracion: res.concentracion,
              formula_farmaceutica: res.formula_farmaceutica,
            };
          });

          this.listMedicamentoDiagnostico = medicamentosMap;
          console.log(this.listMedicamento);

          this.loadingSearchMediamentoDiagnostico = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  async created() {
    this.enlace_cita = this.$route.params.datitos.enlace_cita;
    console.log("idcita");
    this.idCita = this.$route.params.datitos.cita;
    console.log(this.$route.params.datitos.cita);
    await this.obtenerActoMedico();
    await this.getCita(this.$route.params.datitos.cita);
  },
  methods: {
    splitJoin(theText){
    	return theText.split(';');
    },
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
      this.acto_medico.signos_vitales.datos_antropometricos.imc = 0;
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
          historial.hora_inicio = this.cita.fecha_cita.split("T")[1].substr(0, 5);
          historial.hora_fin = "8:30";
          historial.datos_medico.nombre_medico =
            this.cita.datos_turno.datos_medico.nombre_apellido_medico;
          historial.datos_medico.id_medico = this.cita.id_medico;
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
        nombre: this.medicamento.nombre + ";" +this.medicamento.concentracion+";"+this.medicamento.formula_farmaceutica,
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
    
    async terminar(){
      this.obtenerHistoria(this.idHistoria);
      await axios
        .put("/Cita/actualizarCitaAtendida?idCita=" + this.$route.params.datitos.cita)
        .then(async (res) => {
          console.log("YA ACTUALIZO CREO, SI NO FUNCIONA A BAILAR WIWIWIWIW");
          console.log(res.data);
          await this.sendCorreo();
        })
        .catch((err) => console.log(err));
     
      this.dialogConfirmacion = false;
      this.navegarto('/');

    },
    async sendCorreo() {
       await axios
        .post("/ActoMedico/enviarDiagnostico?idCita=" + this.cita.id)
        .then((res) => {          
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    //Metodos agregados 
    limpiarDiagnosticoModal() {
      this.diagnostico_medico_lista = {
        codigo_enfermedad: "",
        nombre_enfermedad: "",
        frecuencia: "",
        tipo: "",
        observaciones: [],
      };
      this.lista_observacion_item_diagnostico = [];
      this.observacion_item_diagnostico = "";
    },
    limpiarExamenesModal() {
      this.examenes_auxiliares_lista = {
        procedimiento: "",
        codigo_procedimiento: "",
        nombre_grupo: "",
        observaciones: [],
      },
      this.lista_observacion_item_examenes = [];
      this.observacion_item_examenes = "";
    },
    limpiarPrescripcionModal() {
      this.medicamentoDiagnostico = {
          codigo: "",
          nombre: "",
          concentracion: "",
          formula_farmaceutica: "",
      };
      this.prescripcion_medica_lista = {
        codigo: "",
        nombre: "",
        formula: "",
        concentracion: "",
        dosis: {
        frecuencia:{
          valor: "",
          medida: "",
        },
        tiempo:{
          valor: "",
          medida: "",
        },
        cantidad:"",
        via_administracion:"",
        observaciones:[],
        }
      };
      this.lista_observacion_item_dosis = [];
      this.observacion_item_dosis = "";
      this.step = 1;
    },
    cerrarDialogDiagnosticoLista() {
      this.limpiarDiagnosticoModal();
      this.enfermedadDiagnostico.codigo_cie = "";
      this.enfermedadDiagnostico.descripcion = "";
      this.dialogdiagnosticolista = false;
    },
    cerrarDialogExamenesLista() {
      this.limpiarExamenesModal();
      this.dialogexameneslista = false;
    },
    cerrarDialogPrescripcionLista() {
      this.limpiarPrescripcionModal();
      this.dialogprescripcionlista = false;
    },
    cerrarDialogDosisLista() {
      this.dosis_visualizar = {
        frecuencia:{
          valor: "",
          medida: "",
        },
        tiempo:{
          valor: "",
          medida: "",
        },
        cantidad:"",
        via_administracion:"",
        observaciones:[],
      }
      this.dialogoactualizarprescripcion = false;
    },
    agregarObservacionDiagnostico() {
      let obsPM = this.observacion_item_diagnostico;
      this.lista_observacion_item_diagnostico.push(obsPM);
      this.observacion_item_diagnostico = "";
    },
    agregarObservacionExamenes() {
      let obsE = this.observacion_item_examenes;
      this.lista_observacion_item_examenes.push(obsE);
      this.observacion_item_examenes = "";
    },
    agregarObservacionDosis() {
      let obsD = this.observacion_item_dosis;
      this.lista_observacion_item_dosis.push(obsD);
      this.observacion_item_dosis = "";
    },
    eliminarObservacionDiagnostico(index) {
      this.lista_observacion_item_diagnostico.splice(index, 1);
    },
    eliminarObservacionExamenes(index) {
      this.lista_observacion_item_examenes.splice(index, 1);
    },
    eliminarObservacionDosis(index) {
      this.lista_observacion_item_dosis.splice(index, 1);
    },
    agregarDialogDiagnostico() {
      //agregamos
      let nuevoDiagnostico = {
        codigo_enfermedad: this.enfermedadDiagnostico.codigo_cie,
        nombre_enfermedad: this.enfermedadDiagnostico.descripcion,
        frecuencia: this.diagnostico_medico_lista.frecuencia,
        tipo: this.diagnostico_medico_lista.tipo,
        observaciones:  this.lista_observacion_item_diagnostico,
        examenes_auxiliares: [],
        prescripcion: [],
      };
      this.acto_medico.diagnostico.push(nuevoDiagnostico);
      //cerramos y limpiamos
      this.cerrarDialogDiagnosticoLista();
    },
    verOBSDiagnostico(index) {
      this.VISlista_observacion_item_diagnostico =
        this.acto_medico.diagnostico[index].observaciones;
      this.dialogverOBSDiagnostico = true;
    },
    verOBSExamenes(index) {
      this.VISlista_observacion_item_examenes =
        this.acto_medico.diagnostico[this.indice_auxiliar_examenes].examenes_auxiliares[index].observaciones;
      this.dialogverOBSExamenes = true;
    },
    eliminarDiagnostico(index) {
      this.acto_medico.diagnostico.splice(index, 1);
    },
    eliminarExamen(index) {
      this.acto_medico.diagnostico[this.indice_auxiliar_examenes].examenes_auxiliares.splice(index, 1);
    },
    eliminarPrescripcion(index) {
      this.acto_medico.diagnostico[this.indice_auxiliar_prescripcion].prescripcion.splice(index, 1);
    },
    verExamenesAuxiliaresDiagnostico(index) {
      this.indice_auxiliar_examenes = index;
      console.log("Mi acto medico completito")
      console.log(this.acto_medico)
      this.dialogverExamenesDiagnostico = true;
    },
    verPrescripciónDiagnostico(index) {
      this.indice_auxiliar_prescripcion = index;
      this.dialogverPrescripcionDiagnostico = true;
    },
    verDosis(index){
      this.dosis_visualizar = this.acto_medico.diagnostico[this.indice_auxiliar_prescripcion].prescripcion[index].dosis;
      this.dialogoactualizarprescripcion = true;
    },
    agregarDialogExamenes(){
      //agregamos
      let nuevoExamen = {
        codigo: this.examenes_auxiliares_lista.codigo_procedimiento,
        nombre: this.examenes_auxiliares_lista.procedimiento,
        tipo: this.examenes_auxiliares_lista.nombre_grupo,
        observaciones:  this.lista_observacion_item_examenes,
      };
      this.acto_medico.diagnostico[this.indice_auxiliar_examenes].examenes_auxiliares.push(nuevoExamen);
      //cerramos y limpiamos
      this.cerrarDialogExamenesLista();
    },
    agregarPrescripcion() {
      //agregamos
      let nuevaPrescripcion = {
        codigo: this.medicamentoDiagnostico.codigo,
        nombre: this.medicamentoDiagnostico.nombre,
        formula: this.medicamentoDiagnostico.formula_farmaceutica,
        concentracion: this.medicamentoDiagnostico.concentracion,
        dosis: {
          frecuencia:{
            valor: this.prescripcion_medica_lista.dosis.frecuencia.valor,
            medida: this.prescripcion_medica_lista.dosis.frecuencia.medida,
          },
          tiempo:{
            valor: this.prescripcion_medica_lista.dosis.tiempo.valor,
            medida: this.prescripcion_medica_lista.dosis.tiempo.medida,
          },
          cantidad: this.prescripcion_medica_lista.dosis.cantidad,
          via_administracion: this.prescripcion_medica_lista.dosis.via_administracion,
          observaciones: this.lista_observacion_item_dosis,
        }
      };
      console.log(nuevaPrescripcion);
      this.acto_medico.diagnostico[this.indice_auxiliar_prescripcion].prescripcion.push(nuevaPrescripcion);
      //cerramos y limpiamos
      this.cerrarDialogPrescripcionLista();
    },
    agendar() {      
      this.dialogAgendar = true;
    },
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
.title-card {
  font-size: 25px;
  color: $blue;
}
.estilo-stepper{
  padding-top: 2%;
}
</style>