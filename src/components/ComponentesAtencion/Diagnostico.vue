<template>
  <div class="div-principal">
    <div class="container-principal">
      <div class="div-title">
        <h3 class="tit-diagnostico">Agregar diagnóstico</h3>
        <button class="btn-diagnostico" @click="openDiagnostico()">
          <v-icon dark> mdi-plus </v-icon>
        </button>
      </div>
      <!-- Diagnóstico -->
      <v-dialog v-model="dialogdiagnosticolista" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <h3 class="tit-modal">Registro de Diagnóstico</h3>
          </v-card-title>
          <div class="container-modal">
            <v-row>
              <v-col :cols="4">
                <v-autocomplete
                  label="Código"
                  v-model="enfermedadDiagnostico"
                  :loading="loadingSearchEnfermedad"
                  :search-input.sync="searchEnfermedadByCodigo"
                  :items="listEnfermedad"
                  item-text="codigo_cie"
                  item-value="codigo_cie"
                  hide-no-data
                  hide-selected
                  return-object
                  filled
                  rounded
                  hide-details
                >
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
              <v-col>
                <v-text-field
                  v-model="enfermedadDiagnostico.descripcion"
                  label="Nombre de enfermedad"
                  color="#009900"
                  filled
                  rounded
                  readonly
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="4">
                <v-combobox
                  rounded
                  filled
                  v-model.trim="diagnostico_medico_lista.tipo"
                  label="Tipo"
                  :items="tipoDiagnostico"
                  hide-details
                ></v-combobox>
              </v-col>
              <v-col>
                <v-combobox
                  rounded
                  filled
                  v-model.trim="diagnostico_medico_lista.frecuencia"
                  label="Frecuencia"
                  :items="tipoFrecuencia"
                  hide-details
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="observacion_diagnostico"
                  label="Observación"
                  color="#009900"
                  rounded
                  filled
                  placeholder="Observación"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarDialogDiagnosticoLista"
            >
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="agregarDiagnostico"
              >Registrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert
        v-if="diagnostico.length == 0"
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
        <v-list-item v-for="(item, i) in diagnostico" :key="i">
          <v-list-item-avatar>
            <v-avatar color="indigo">
              <v-icon dark>mdi-message-text</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.nombre_enfermedad }} ({{
                item.codigo_enfermedad
              }})</v-list-item-title
            >
            <v-list-item-subtitle>
              Tipo: {{ item.tipo }} - Frecuencia: {{ item.frecuencia }}
              <p>{{ item.observaciones[0] }}</p>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-row>
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
      <!-- ExamenesAuxiliares -->
      <v-dialog v-model="dialogexameneslista" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <h4 class="title-card">Examenes auxiliares</h4>
          </v-card-title>
          <div class="container-modal">
            <div class="div-title">
              <h3 class="tit-diagnostico">Agregar exámen auxiliar</h3>
              <button
                class="btn-diagnostico"
                @click="openAgregarExamenAuxiliar()"
              >
                <v-icon dark> mdi-plus </v-icon>
              </button>
            </div>
            <v-alert
              v-if="
                diagnostico.length == 0 ||
                diagnostico[indice_seleccionado].examenes_auxiliares.length == 0
              "
              style="margin-top: 15px"
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No se ha registrado ningún exámen auxiliar
            </v-alert>
            <v-list subheader two-line rounded v-else>
              <v-list-item
                v-for="(item, i) in diagnostico[indice_seleccionado]
                  .examenes_auxiliares"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-avatar color="indigo">
                    <v-icon dark>mdi-message-text</v-icon>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.nombre"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.observaciones[0]"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row>
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
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarDialogExamenesLista"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Agregar ExamenesAuxiliares -->
      <v-dialog
        v-model="dialogAgregarexameneslista"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <h4 class="title-card">Registrar examen auxiliar</h4>
          </v-card-title>
          <div class="container-modal">
            <v-autocomplete
              label="Examen"
              filled
              rounded
              v-model="examenes_auxiliares_lista"
              :loading="loadingSearchExamenes"
              :search-input.sync="searchExamenesByNombre"
              :items="listExamenes"
              item-text="descripcion"
              item-value="descripcion"
              hide-no-data
              hide-selected
              return-object
              hide-details
            >
              <template v-slot:item="item">
                <v-list-item-avatar
                  color="primary"
                  class="headline font-weight-light white--text"
                >
                  {{ item.item.descripcion.charAt(0) }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ item.item.descripcion }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <v-text-field
              v-model="observacion_examen"
              label="Observación"
              color="#009900"
              rounded
              filled
              placeholder="Observación"
              hide-details
            ></v-text-field>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarDialogAgregarExamenes"
            >
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="agregarExamenes"
              >Registrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Prescripcion -->
      <v-dialog v-model="dialogPrescripcion" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <h4 class="title-card">Prescripción médica</h4>
          </v-card-title>
          <div class="container-modal">
            <div class="div-title">
              <h3 class="tit-diagnostico">Agregar prescripción</h3>
              <button
                class="btn-diagnostico"
                @click="openAgregarPrescripcion()"
              >
                <v-icon dark> mdi-plus </v-icon>
              </button>
            </div>
            <v-alert
              v-if="
                diagnostico.length == 0 ||
                diagnostico[indice_seleccionado].prescripcion.length == 0
              "
              style="margin-top: 15px"
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No se ha registrado prescripción médica para el diagnóstico
            </v-alert>
            <v-list subheader two-line rounded v-else>
              <v-list-item
                v-for="(item, i) in diagnostico[indice_seleccionado]
                  .prescripcion"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-avatar color="indigo">
                    <v-icon dark>mdi-pill</v-icon>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.nombre }}</v-list-item-title>

                  <v-list-item-subtitle
                    >{{ item.formula }} <br />
                    {{ item.dosis.cantidad }}({{
                      item.dosis.via_administracion
                    }}) cada {{ item.dosis.frecuencia.valor }}
                    {{ item.dosis.frecuencia.medida }} durante
                    {{ item.dosis.tiempo.valor }} {{ item.dosis.tiempo.medida }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row>
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
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cerrarDialogPrescripcion">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Agregar Prescripcion -->
      <v-dialog
        v-model="dialogAgregarPrescripcion"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <h4 class="title-card">Registrar prescripcion médica</h4>
          </v-card-title>
          <div class="container-modal">
            <v-autocomplete
              label="Nombre del medicamento"
              rounded
              filled
              v-model="medicamentoDiagnostico"
              :loading="loadingSearchMediamentoDiagnostico"
              :search-input.sync="searchMedicamentoDiagnostico"
              :items="listMedicamentoDiagnostico"
              item-text="descripcion"
              item-value="descripcion"
              hide-no-data
              hide-selected
              return-object
              hide-details
            >
              <template v-slot:item="item">
                <v-list-item-avatar
                  color="primary"
                  class="headline font-weight-light white--text"
                >
                  {{ item.item.descripcion.charAt(0) }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="black--text">
                    {{ item.item.descripcion }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light black--text">
                    Genérico: {{ item.item.generico }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
            <div class="div-title">
              <h3 class="tit-diagnostico">Dosis</h3>
            </div>
            <v-row>
              <v-col :cols="4">
                Consumir:
                <v-text-field
                  v-model.trim="prescripcion_medica_lista.dosis.cantidad"
                  label="Cantidad"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col>
                <br />
                <v-combobox
                  v-model="prescripcion_medica_lista.dosis.via_administracion"
                  :items="viasAdmnistración"
                  label="Vía de administración"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="4">
                Cada:
                <v-text-field
                  v-model="prescripcion_medica_lista.dosis.frecuencia.valor"
                  label="Frecuencia"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col>
                <br />
                <v-combobox
                  v-model="prescripcion_medica_lista.dosis.frecuencia.medida"
                  :items="frecuenciaMedida"
                  label="Medida de la frecuencia"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="4">
                Durante:
                <v-text-field
                  v-model="prescripcion_medica_lista.dosis.tiempo.valor"
                  label="Tiempo de consumo"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col>
                <br />
                <v-combobox
                  v-model="prescripcion_medica_lista.dosis.tiempo.medida"
                  :items="tiempoMedida"
                  label="Medida de del tiempo de consumo"
                  color="#009900"
                  rounded
                  filled
                  hide-details
                ></v-combobox>
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="cerrarAgregarPrescripcion"
            >
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="agregarPrescripcion"
              >Registrar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Diagnostico",
  props: ["diagnostico"],
  data() {
    return {
      // diagnostico: [],
      dialogdiagnosticolista: false,
      dialogexameneslista: false,
      dialogAgregarexameneslista: false,
      dialogPrescripcion: false,
      dialogAgregarPrescripcion: false,
      listEnfermedad: [],
      loadingSearchEnfermedad: false,
      loadingSearchExamenes: false,
      loadingSearchMediamentoDiagnostico: false,
      searchEnfermedadByCodigo: null,
      searchExamenesByNombre: null,
      searchMedicamentoDiagnostico: null,
      enfermedadDiagnostico: {
        codigo_cie: "",
        descripcion: "",
      },
      diagnostico_medico_lista: {
        codigo_enfermedad: "",
        nombre_enfermedad: "",
        frecuencia: "",
        tipo: "",
        observaciones: [],
      },
      observacion_diagnostico: "",
      viasAdmnistración: [
        "Oral",
        "Intravenosa",
        "Intramuscular",
        "Intratecal",
        "Subcutánea",
        "Sublingual",
        "Rectal",
        "Vaginal",
        "Ocular",
        "Ótica",
        "Nasal",
        "Inhalatoria",
        "Nebulización",
        "Cutánea",
        "Transdérmica",
      ],
      frecuenciaMedida: ["minutos", "horas"],
      tiempoMedida: ["dias", "semanas", "meses"],
      tipoDiagnostico: ["Presuntivo", "Definitivo"],
      tipoFrecuencia: ["Crónico", "Primera vez", "Subsecuente"],
      indice_seleccionado: 0,
      examenes_auxiliares_lista: {
        descripcion: "",
        precio: "",
        id_especialidad: "",
        duracion: "",
        recomendaciones_previas: "",
        recomendaciones_posteriores: "",
        id: "",
      },
      listExamenes: [],
      observacion_examen: "",
      medicamentoDiagnostico: {
        id: "",
        descripcion: "",
        generico: "",
        familia: "",
      },
      listMedicamentoDiagnostico: [],
      prescripcion_medica_lista: {
        codigo: "",
        nombre: "",
        formula: "",
        concentracion: "",
        dosis: {
          frecuencia: {
            valor: "",
            medida: "",
          },
          tiempo: {
            valor: "",
            medida: "",
          },
          cantidad: "",
          via_administracion: "",
          observaciones: [],
        },
      },
    };
  },
  methods: {
    openDiagnostico() {
      this.dialogdiagnosticolista = true;
    },
    cerrarDialogDiagnosticoLista() {
      this.dialogdiagnosticolista = false;
    },
    enviarDiagnostico() {      
      this.$emit('getDiagnostico', this.diagnostico)
    },
    agregarDiagnostico() {
      let arrayObs = [];
      arrayObs.push(this.observacion_diagnostico);
      let nuevoDiagnostico = {
        codigo_enfermedad: this.enfermedadDiagnostico.codigo_cie,
        nombre_enfermedad: this.enfermedadDiagnostico.descripcion,
        frecuencia: this.diagnostico_medico_lista.frecuencia,
        tipo: this.diagnostico_medico_lista.tipo,
        observaciones: arrayObs,
        examenes_auxiliares: [],
        prescripcion: [],
      };
      this.diagnostico.push(nuevoDiagnostico);
      this.enviarDiagnostico();    
      this.clearDiagnostico();
      this.cerrarDialogDiagnosticoLista();
    },
    verExamenesAuxiliaresDiagnostico(index) {
      this.indice_seleccionado = index;
      this.openDialogExamenes();
    },
    openDialogExamenes() {
      this.dialogexameneslista = true;
    },
    cerrarDialogExamenesLista() {
      this.dialogexameneslista = false;
    },
    verPrescripciónDiagnostico(index) {
      this.indice_seleccionado = index;
      this.openDialogPrescripcion();
    },
    eliminarDiagnostico(index) {
      this.diagnostico.splice(index, 1);
    },
    openAgregarExamenAuxiliar() {
      this.dialogAgregarexameneslista = true;
    },
    cerrarDialogAgregarExamenes() {
      this.dialogAgregarexameneslista = false;
    },
    openDialogPrescripcion() {
      this.dialogPrescripcion = true;
    },
    cerrarDialogPrescripcion() {
      this.dialogPrescripcion = false;
    },
    openAgregarPrescripcion() {
      this.dialogAgregarPrescripcion = true;
    },
    cerrarAgregarPrescripcion() {
      this.dialogAgregarPrescripcion = false;
    },
    agregarExamenes() {
      let lista_observacion_item_examenes = [];
      lista_observacion_item_examenes.push(this.observacion_examen);
      let nuevoExamen = {
        codigo: this.examenes_auxiliares_lista.id,
        nombre: this.examenes_auxiliares_lista.descripcion,
        tipo: this.examenes_auxiliares_lista.descripcion,
        observaciones: lista_observacion_item_examenes,
      };
      this.diagnostico[this.indice_seleccionado].examenes_auxiliares.push(
        nuevoExamen
      );
      //cerramos y limpiamos
      this.enviarDiagnostico();
      this.clearExamen();
      this.cerrarDialogAgregarExamenes();
    },
    eliminarExamen(index) {
      this.diagnostico[this.indice_seleccionado].examenes_auxiliares.splice(
        index,
        1
      );
      this.enviarDiagnostico();
    },
    agregarPrescripcion() {
      //agregamos
      let nuevaPrescripcion = {
        codigo: this.medicamentoDiagnostico.id,
        nombre: this.medicamentoDiagnostico.descripcion,
        formula: this.medicamentoDiagnostico.generico,
        concentracion: "",
        dosis: {
          frecuencia: {
            valor: this.prescripcion_medica_lista.dosis.frecuencia.valor,
            medida: this.prescripcion_medica_lista.dosis.frecuencia.medida,
          },
          tiempo: {
            valor: this.prescripcion_medica_lista.dosis.tiempo.valor,
            medida: this.prescripcion_medica_lista.dosis.tiempo.medida,
          },
          cantidad: this.prescripcion_medica_lista.dosis.cantidad,
          via_administracion:
            this.prescripcion_medica_lista.dosis.via_administracion,
          observaciones: [],
        },
      };      
      this.diagnostico[this.indice_seleccionado].prescripcion.push(
        nuevaPrescripcion
      );
      //cerramos y limpiamos
      this.enviarDiagnostico();
      this.clearPrescripcion();
      this.cerrarAgregarPrescripcion();
    },
    eliminarPrescripcion(index) {
      this.diagnostico[this.indice_seleccionado].prescripcion.splice(index, 1);
      this.enviarDiagnostico();
    },
    clearDiagnostico() {
      this.diagnostico_medico_lista.codigo_enfermedad = "";
      this.diagnostico_medico_lista.nombre_enfermedad = "";
      this.diagnostico_medico_lista.frecuencia = "";
      this.diagnostico_medico_lista.tipo = "";
      this.diagnostico_medico_lista.observaciones = [];
      this.observacion_diagnostico = "";
      this.enfermedadDiagnostico.codigo_cie = "";
      this.enfermedadDiagnostico.descripcion = "";
    },
    clearExamen() {
      (this.observacion_examen = ""),
        (this.examenes_auxiliares_lista = {
          descripcion: "",
          precio: "",
          id_especialidad: "",
          duracion: "",
          recomendaciones_previas: "",
          recomendaciones_posteriores: "",
          id: "",
        });
    },
    clearPrescripcion() {
      (this.medicamentoDiagnostico = {
        id: "",
        descripcion: "",
        generico: "",
        familia: "",
      }),
        (this.prescripcion_medica_lista = {
          codigo: "",
          nombre: "",
          formula: "",
          concentracion: "",
          dosis: {
            frecuencia: {
              valor: "",
              medida: "",
            },
            tiempo: {
              valor: "",
              medida: "",
            },
            cantidad: "",
            via_administracion: "",
            observaciones: [],
          },
        });
      this.listMedicamentoDiagnostico = [];
    },
  },
  watch: {
    searchEnfermedadByCodigo(value) {
      if (value == null || value == "") {
        this.enfermedadDiagnostico = {
          codigo_cie: "",
          descripcion: "",
        };
        return;
      }
      if (this.listEnfermedad.length > 0 && value != null) {
        if (value.length < 2) {
          return;
        }
      }
      if (this.loadingSearchEnfermedad) {
        return;
      }
      this.loadingSearchEnfermedad = true;      
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

          this.loadingSearchEnfermedad = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchExamenesByNombre(value) {
      if (value == null || value == "") {
        this.examenes_auxiliares_lista = {
          descripcion: "",
          precio: "",
          id_especialidad: "",
          duracion: "",
          recomendaciones_previas: "",
          recomendaciones_posteriores: "",
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
      axios
        .get("/Examenes/nombre?nombre=" + value)
        .then((res) => {
          let examenesMap = res.data.map(function (res) {
            return {
              descripcion: res.descripcion,
              id: res.id,
            };
          });

          this.listExamenes = examenesMap;          

          this.loadingSearchExamenes = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchMedicamentoDiagnostico(value) {
      if (value == null || value == "") {
        this.medicamentoDiagnostico = {
          id: "",
          descripcion: "",
          generico: "",
          familia: "",
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
        .get("/Medicinas/generico?generico=" + value.toUpperCase())
        .then((res) => {
          let medicamentosMap = res.data.map(function (res) {
            return {
              id: res.id,
              descripcion: res.descripcion,
              generico: res.generico,
              familia: res.familia,
            };
          });

          this.listMedicamentoDiagnostico = medicamentosMap;          

          this.loadingSearchMediamentoDiagnostico = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
.div-principal {
  padding: 2%;
  .container-principal {
    margin: 10px 0;
    border-radius: 6px;
    padding-bottom: 6px;
  }

  .tit-modal {
    color: $blue !important;
  }
}
.container-modal {
  padding: 3%;
}
.div-title {
  background: $blue;
  padding: 1%;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-diagnostico {
  background: #4caf50;
  color: white;
  padding: 2px 3px;
  border-radius: 6px;
}
.tit-diagnostico {
  color: white;
}
</style>
