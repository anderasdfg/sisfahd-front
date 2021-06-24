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
                src="https://cdn.discordapp.com/attachments/750116396632899704/857722200228626432/2Q.png"
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
                                    <v-btn color="info" dark @click="abrirDialogoObservaciones(item.observaciones)">
                                      <v-icon left> mdi-card-search </v-icon>
                                      <span>Observaciones</span>
                                    </v-btn>
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
                    <v-btn color="info" dark @click="abrirDialogoDiagnostico(item.observaciones)">
                      <v-icon left> mdi-card-search </v-icon>
                      <span>Detalle</span>
                    </v-btn>
                </template>
                </v-data-table>
              </div>
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
export default {
name: "VisualizarHCI",
components: {
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
      abrirObservaciones: false,
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
  abrirDialogoObservaciones(observaciones){
    this.abrirObservaciones = true;
  },
  abrirDialogoDiagnostico(observaciones){
    this.abrirObservaciones = true;
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
</style>