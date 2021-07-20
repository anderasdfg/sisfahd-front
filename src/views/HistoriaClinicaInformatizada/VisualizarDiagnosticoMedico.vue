<template>
  <v-card elevation="3" outlined class="card">
    <template v-if="showInfo">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
    <div class="espaciado">
      <v-card-title class="titulo">{{"Cita de "+ especialidad}}</v-card-title>
      <v-btn color="info" dark class="bt-volver" @click="volver()">
      <span>Volver a la Historia Clinica</span>
      </v-btn>
    </div>
    <v-card-subtitle
        >{{"Realizada el "+ cita.fecha_cita + " desde las "+ horainicio+ " hasta las " + horafin}}
    </v-card-subtitle>
    <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Datos del médico que realizo la atención</v-card-title>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src= "medico.usuario.datos.foto"
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0 mt-6">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Nombres y apellidos</label
                  >
                  <p class="label-text">
                    {{ medico.usuario.datos.nombre + " " + medico.usuario.datos.apellido_paterno + " "+ medico.usuario.datos.apellido_materno }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Tipo de Documento</label
                  >
                  <p class="label-text">
                    {{ medico.usuario.datos.tipo_documento}}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Número de Documento</label
                  >
                  <p class="label-text">
                    {{ medico.usuario.datos.numero_documento}}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Teléfono</label
                  >
                  <p class="label-text">
                    {{ medico.usuario.datos.telefono}}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Correo</label
                  >
                  <p class="label-text">
                    {{ medico.usuario.datos.correo}}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
    </v-card-text>
    <v-card-text>
      <v-card elevation="0" outlined shaped>
      <v-expansion-panels>
          <v-expansion-panel>
          <v-expansion-panel-header class="subtitulo">Anamnesis</v-expansion-panel-header>
            <v-expansion-panel-content style="padding-top: 10px;">
              <v-textarea
                v-model="cita.acto_medico.anamnesis"
                auto-grow
                filled
                color="blue"
                readonly
              ></v-textarea>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-header class="subtitulo">Medicación</v-expansion-panel-header>
            <v-expansion-panel-content style="padding-top: 10px;">
              <v-card-subtitle
                ><p class="ml-6 text-h4">
                  Medicación previa
                </p>
                </v-card-subtitle>
                <v-row>
                    <v-col cols="10" sm="10" md="10" lg="1" xl="1">
                    </v-col>
                        <v-col cols="10" sm="10" md="10" lg="9" xl="9">
                          <v-row class="ml-3 ml-sm-0">
                            <v-col 
                              cols="12"
                              sm="6"
                              md="6"
                              lg="12"
                              xl="12"
                              class="text-center text-sm-start"
                            >
                              <template>
                                <div>
                                  <v-data-table
                                    :headers="headerMedicacion"
                                    :items="cita.acto_medico.medicacion.medicacion_previa"
                                    :items-per-page="5"
                                    class="elevation-1"
                                  >
                                  <template v-slot:[`item.actions`]="{ item }">
                                    <v-btn color="info" dark @click="abrirDialogoObservaciones(item.codigo)">
                                      <v-icon left> mdi-card-search </v-icon>
                                      <span>Observaciones</span>
                                    </v-btn>
                                    <v-dialog
                                      transition="dialog-bottom-transition"
                                      v-model="abrirObservaciones"
                                      max-width="700px"
                                    >
                                      <Listar :titulo = titulo :lista = item.observaciones  @emit-close-dialog="cerrarObservaciones()"></Listar>
                                    </v-dialog>
                                  </template>
                                  </v-data-table>
                                </div>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                  </v-row>
                <v-card-subtitle
                ><p class="ml-6 text-h4 mt-5">
                  Reacciones adversas
                </p>
                </v-card-subtitle>
                  <v-row>
                    <v-col cols="10" sm="10" md="10" lg="1" xl="1">
                      </v-col>
                        <v-col cols="10" sm="10" md="10" lg="9" xl="9">
                          <v-row class="ml-3 ml-sm-0">
                          <v-col 
                            v-for="(item, index) in cita.acto_medico.medicacion.reaccion_adversa "
                            :key="index"
                            cols="12"
                            sm="6"
                            md="6"
                            lg="3"
                            xl="3"
                            class="text-center text-sm-start"
                          >
                          <p class="label-text-a">
                            {{"● " + item}}
                          </p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-header class="subtitulo">Signos Vitales</v-expansion-panel-header>
            <v-expansion-panel-content style="padding-top: 10px;">
                <v-card-subtitle
                ><p class="ml-6 text-h4">
                  Constantes vitales
                </p>
                </v-card-subtitle>
          <v-row>
            <v-col cols="10" sm="10" md="10" lg="1" xl="1">
            </v-col>
            <v-col cols="10" sm="10" md="10" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Temperatura</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.constantes_vitales.temperatura.valor + " " + cita.acto_medico.signos_vitales.constantes_vitales.temperatura.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Presión arterial</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.constantes_vitales.presion_arterial.valor + " " + cita.acto_medico.signos_vitales.constantes_vitales.presion_arterial.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Saturación</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.constantes_vitales.saturacion.valor + " " + cita.acto_medico.signos_vitales.constantes_vitales.saturacion.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Frecuencia cardiaca</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.constantes_vitales.frecuencia_cardiaca.valor + " " + cita.acto_medico.signos_vitales.constantes_vitales.frecuencia_cardiaca.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Frecuencia respiratoria</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.constantes_vitales.frecuencia_respiratoria.valor + " " + cita.acto_medico.signos_vitales.constantes_vitales.frecuencia_respiratoria.medida }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-card-subtitle
          ><p class="ml-6 text-h4">
              Datos antropometricos
          </p>
          </v-card-subtitle>
          <v-row>
            <v-col cols="10" sm="10" md="10" lg="1" xl="1">
            </v-col>
            <v-col cols="10" sm="10" md="10" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Peso</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.peso.valor + " " + cita.acto_medico.signos_vitales.datos_antropometricos.peso.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Talla</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.talla.valor + " " + cita.acto_medico.signos_vitales.datos_antropometricos.talla.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Perimetro abdominal</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.perimetro_abdominal.valor + " " + cita.acto_medico.signos_vitales.datos_antropometricos.perimetro_abdominal.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Superficie Corporal</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.superficie_corporal.valor + " " + cita.acto_medico.signos_vitales.datos_antropometricos.superficie_corporal.medida }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >IMC</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.imc }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                  xl="3"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Clasificación según IMC</label
                  >
                  <p class="label-text">
                    {{ cita.acto_medico.signos_vitales.datos_antropometricos.clasificacion_imc }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
            </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-header class="subtitulo">Diagnostico</v-expansion-panel-header>
            <v-expansion-panel-content style="padding-top: 10px;">
            <template>
              <div>
                <v-data-table
                  :headers="headerDiagnostico"
                  :items="cita.acto_medico.diagnostico"
                  :items-per-page="10"
                >
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="info" dark @click="abrirObservacionesDialogo(item.codigo_enfermedad,item.observaciones)">
                      <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                    </v-btn>
                    <v-btn color="deep-purple" dark @click="abrirDialogoExamenesDiagnostico(item.examenes_auxiliares)">
                      <v-icon dark> mdi-clipboard-text-search </v-icon>
                    </v-btn>
                    <v-btn color="orange" dark @click="abrirDialogoPrescripcionDiagnostico(item.prescripcion)">
                      <v-icon dark> mdi-clipboard-text-multiple </v-icon>
                    </v-btn>
                </template>
                </v-data-table>
              </div>
           </template>
           <v-dialog
              transition="dialog-bottom-transition"
              v-model="abrirObservacionesDiagnostico"
              max-width="700px"
            >
              <Listar :titulo = titulo :lista = listObservacionesDiagnostico  @emit-close-dialog="cerrarObservacionesDialogo()"></Listar>
            </v-dialog>
            <template v-if="cita.acto_medico.diagnostico != 0">
              <v-dialog
              transition="dialog-bottom-transition"
              v-model="abrirExamenesDiagnostico"
              max-width="1200px"
              >
                <v-card>
                  <v-card-title>
                    <h2 class="title-card"> Examenes Auxiliares</h2>
                  </v-card-title>
                  <v-card-text>
                <template>
                    <div>
                      <v-data-table
                        :headers="headerExamenes"
                        :items="listExamenesDiagnostico"
                        :items-per-page="5"
                      >
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="info" dark @click="abrirDialogoExamenesObservaciones(item.codigo,item.observaciones)">
                          <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </div>
                </template>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarDialogoExamenesDiagnostico"
                    >
                      Cerrar
                    </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                transition="dialog-bottom-transition"
                v-model="abrirObservacionesExamenes"
                max-width="700px"
              >
                <Listar :titulo = titulo :lista = listObservacionesExamenes  @emit-close-dialog="cerrarDialogoExamenesObservaciones()"></Listar>
              </v-dialog>

              <v-dialog
              transition="dialog-bottom-transition"
              v-model="abrirPrescripcionDiagnostico"
              max-width="1200px"
              >
                <v-card>
                  <v-card-title>
                    <h2 class="title-card"> Prescripciones </h2>
                  </v-card-title>
                  <v-card-text>
                <template>
                    <div>
                      <v-data-table
                        :headers="headerPrescripcion"
                        :items="listPrescripcionesDiagnostico"
                        :items-per-page="5"
                      >
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-btn color="info" dark @click="abrirDialogoDosis(item.nombre,item.formula,item.concentracion,item.dosis)">
                          <v-icon dark> mdi-pill </v-icon>
                        </v-btn>
                      </template>
                    </v-data-table>
                  </div>
                </template>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarDialogoPrescripcionDiagnostico"
                    >
                      Cerrar
                    </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                transition="dialog-bottom-transition"
                v-model="abrirDosis"
                max-width="600px"
              >
                <v-card>
                  <v-card-title>
                    <h2 class="title-card"> Dosis </h2>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="prescripcionDosis.via_administracion"
                      label="Vía de administración"
                      color="#009900"
                      outlined
                    ></v-text-field>
                    <v-textarea
                      v-model="recetaTexto"
                      auto-grow
                      filled
                      color="blue"
                      readonly
                    ></v-textarea>
                    <v-container grid-list-md text-xs-center>
                      <h4>Observaciones</h4>
                    </v-container>
                    <v-list flat>
                      <v-list-item
                        v-for="(item, i) in prescripcionDosis.observaciones"
                        :key="i"
                        class="item-list"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{
                             item
                          }}</v-list-item-title>
                          </v-list-item-content>
                          </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cerrarDialogoDosis"
                    >
                      Cerrar
                    </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
          <v-expansion-panel-header class="subtitulo">Indicaciones</v-expansion-panel-header>
            <v-expansion-panel-content style="padding-top: 10px;">
              <v-textarea
                v-model="cita.acto_medico.indicaciones"
                auto-grow
                filled
                color="blue"
                readonly
              ></v-textarea>
            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
       </v-card>
    </v-card-text>
    </template>
  </v-card>
</template>

<script>
import axios from "axios"
import Listar from "@/components/VisualizarHCI/Listar.vue";
export default {
name: "VisualizarHCI",
components: {
  Listar,
},
props: {
    idcita: {
      type: String,
    },
    especialidad:{
      type: String,
    },
    horainicio:{
      type: String,
    },
    horafin:{
      type: String,
    },
    idmedico:{
      type: String,
    }
},
data(){
    return{
      showInfo: true,
      cita: null,
      medico: null,
      titulo: "",
      headerMedicacion: [
        {
          text: "Código",
          value: "codigo",
          sortable: false,
          align: "start",
        },
        {
          text: "Nombre",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Dosis",
          sortable: false,
          value: "dosis",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      headerDiagnostico: [
        {
          text: "Código de enfermedad",
          value: "codigo_enfermedad",
          sortable: false,
          align: "start",
        },
        {
          text: "Nombre de enfermedad",
          sortable: false,
          value: "nombre_enfermedad",
        },
        {
          text: "Tipo",
          sortable: false,
          value: "tipo",
        },
        {
          text: "Frecuencia",
          sortable: false,
          value: "frecuencia",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      headerExamenes: [
        {
          text: "Código del exámen auxiliar",
          value: "codigo",
          sortable: false,
          align: "start",
        },
        {
          text: "Nombre",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Tipo",
          sortable: false,
          value: "tipo",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      headerPrescripcion: [
        {
          text: "Código del medicamento",
          value: "codigo",
          sortable: false,
          align: "start",
        },
        {
          text: "Nombre",
          sortable: false,
          value: "nombre",
        },
        {
          text: "Formula",
          sortable: false,
          value: "formula",
        },
        {
          text: "Concentración",
          sortable: false,
          value: "concentracion",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      abrirObservaciones: false,
      abrirObservacionesDiagnostico: false,
      listObservacionesDiagnostico: [],
      abrirExamenesDiagnostico: false,
      listExamenesDiagnostico: [],
      abrirObservacionesExamenes: false,
      listObservacionesExamenes: [],
      abrirPrescripcionDiagnostico: false,
      listPrescripcionesDiagnostico: [],
      abrirDosis: false,
      prescripcionDosis: {
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
      recetaTexto:"",
    };
},
async created(){
  console.log(this.idcita);
  console.log(this.idmedico);
  await this.obtenerCita();
  await this.obtenerDatosMedicos();
  this.cita.fecha_cita = new Date(this.cita.fecha_cita).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'});
  this.showInfo = false;
},
methods:{
  async obtenerCita() {
      await axios
          .get("/Cita/citaactomedico?idCita="+this.idcita)
          .then((x) => {
            this.cita = x.data;
            console.log(this.cita);
          })
          .catch((err) => console.log(err));
  },
  async obtenerDatosMedicos() {
      await axios
          .get("/Medico/medicousuario/"+this.idmedico)
          .then((x) => {
            this.medico = x.data;
            console.log(this.medico);
          })
          .catch((err) => console.log(err));
  },
  volver(){
    this.$router.push("/visualizarHCI"); 
  },
  abrirDialogoObservaciones(codigo){
    this.titulo = "Observaciones de la medicación " + codigo
    this.abrirObservaciones = true;
  },
  cerrarObservaciones(){
    this.abrirObservaciones = false;
  },
  abrirObservacionesDialogo(codigo, lista){
    this.titulo = "Observaciones del diagnostico con la enfermedad " + codigo
    this.listObservacionesDiagnostico = lista;
    this.abrirObservacionesDiagnostico = true;
  },
  cerrarObservacionesDialogo(){
    this.abrirObservacionesDiagnostico = false;
  },
  abrirDialogoExamenesDiagnostico(lista){
    this.listExamenesDiagnostico = lista;
    this.abrirExamenesDiagnostico = true;
  },
  cerrarDialogoExamenesDiagnostico(){
    this.abrirExamenesDiagnostico = false;
  },
  abrirDialogoExamenesObservaciones(codigo,lista){
    this.titulo = "Observaciones del exámen auxiliar " + codigo
    this.listObservacionesExamenes = lista;
    this.abrirObservacionesExamenes = true;
  },
  cerrarDialogoExamenesObservaciones(){
    this.abrirObservacionesExamenes = false;
  },
  abrirDialogoPrescripcionDiagnostico(lista){
    this.listPrescripcionesDiagnostico = lista;
    this.abrirPrescripcionDiagnostico = true;
  },
  cerrarDialogoPrescripcionDiagnostico(){
    this.abrirPrescripcionDiagnostico = false;
  },
  abrirDialogoDosis(nombre,formula, concentracion, dosis){
    this.prescripcionDosis = dosis;
    this.recetaTexto = "Se receto tomar: "+dosis.cantidad+ " de "+ nombre+ " "+ concentracion +" ("+ formula+ ") durante " + dosis.tiempo.valor + " " + dosis.tiempo.medida + 
    " cada "  + dosis.frecuencia.valor + " " + dosis.frecuencia.medida;
    this.abrirDosis = true;
  },
  cerrarDialogoDosis(){
    this.abrirDosis = false;
  },
},
computed:{
},
filters: {
    toFechaB(value) {
      return new Date(value).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    },
},
}
</script>
<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  padding-bottom: 20px;
}

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
  color: $blue;
  
}
.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
.label-text-a {
  font-size: 1rem;
  text-transform: capitalize;
}
.titulo{
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo{
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
.espaciado {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.bt-volver{
   margin-top: 23px;
   margin-right: 15px;
}
.title-card {
  font-size: 25px;
  color: $blue;
}
</style>