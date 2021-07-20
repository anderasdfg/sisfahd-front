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
    <div class>
    <v-card-title class="titulo">Historia Clinica Informatizada</v-card-title>
    </div>
      <v-card-subtitle
        >Visualice toda la información relacionada a sus consultas médicas.
      </v-card-subtitle>
    <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Datos Generales</v-card-title>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img                
                 :src="this.datosusuario.foto ? this.datosusuario.foto : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'"
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>              
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
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
                    {{ datosusuario.nombre + " " + datosusuario.apellido_paterno + " "+ datosusuario.apellido_materno }}
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
                    >Fecha de Nacimiento</label
                  >
                  <p class="label-text">
                    {{ datosusuario.fecha_nacimiento}}
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
                  <p class="label-text">{{ datosusuario.tipo_documento }}</p>
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
                  <p class="label-text">{{ datosusuario.numero_documento }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title">Sexo</label>
                  <p class="label-text">{{ datosusuario.sexo }}</p>
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
                    {{ datosusuario.telefono}}
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
                    >Domicilio</label
                  >
                  <p class="label-text">
                    {{ paciente.datospaciente.domicilio}}
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
                    >Grupo sanguíneo</label
                  >
                  <p class="label-text">
                    {{ paciente.datospaciente.grupo_sanguineo}}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
    </v-card-text>
    <!-- <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Antecendentes</v-card-title>
          <template>
            <v-alert
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3 mt-3"
              icon="info"
            >
              No se han ingresado sus antecedentes
            </v-alert>
          </template>
        </v-card>
    </v-card-text> -->
    <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Atenciones realizadas</v-card-title>
          <template v-if="historia.historial.length > 0">
            <div>
              <v-data-table
                :headers="headerHistorial"
                :items="historia.historial"
                :items-per-page="10"
              >
              <template v-slot:[`item.fecha_cita`]="{ item }">
                  {{ item.fecha_cita | toFechaB }}
              </template>
              <template v-slot:[`item.hora_inicio`]="{ item }">
                  {{ item.hora_inicio}}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn color="info" dark @click="abrirDialogoDetalle(item.datos_medico.nombre_especialidad,item.id_cita,item.hora_inicio,item.hora_fin,item.datos_medico.id_medico)">
                <v-icon left> mdi-card-search </v-icon>
                <span>Detalle</span>
                </v-btn>
              </template>
              </v-data-table>
            </div>
          </template>
          <template v-else>
            <v-alert
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No se ha realizado ninguna atención
            </v-alert>
          </template>
        </v-card>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import axios from "axios"
import { mapActions,mapGetters } from "vuex";
export default {
name: "VisualizarHCI",
components: {
},
data(){
    return{
      datosusuario:{
        datos: {}
      },
      paciente: {
        idhistoria: "",
        datospaciente: null,
        antecedentes: null,
      },
      historia:null,
      idusuario:"607f4008cb41a8de70be1df5",
      showInfo: true,
      headerHistorial: [
        {
          text: "Médico",
          value: "datos_medico.nombre_medico",
          sortable: false,
          align: "start",
        },
        {
          text: "Especialidad",
          sortable: false,
          value: "datos_medico.nombre_especialidad",
        },
        {
          text: "Fecha de la Cita",
          sortable: false,
          value: "fecha_cita",
        },
        {
          text: "Hora de la Cita",
          sortable: false,
          value: "hora_inicio",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
    };
},
async created(){
  this.fetchUser(); 
  this.idusuario = this.user.id;
  await this.obtenerUsuario();
  await this.obtenerPaciente();
  await this.obtenerHistoria(this.paciente.idhistoria);  
  this.datosusuario.fecha_nacimiento = new Date(this.datosusuario.fecha_nacimiento).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
  this.datosusuario.sexo  = (this.datosusuario.sexo == "M")?"Masculino":"Femenino"; 
  this.showInfo = false;
  console.log("datos usuario");
  console.log(this.datosusuario);
},
methods:{
  ...mapActions(['fetchUser']),
  async obtenerUsuario() {
      await axios
          .get("/Usuario/id?id="+this.idusuario)
          .then((x) => {
            this.datosusuario = x.data.datos;
            console.log(this.datosusuario);
          })
          .catch((err) => console.log(err));
  },
  async obtenerPaciente() {
      await axios
          .get("/Paciente/usuario?idusuario="+this.idusuario)
          .then((x) => {
            this.paciente.datospaciente = x.data.datos;
            this.paciente.antecedentes = x.data.antecedentes;
            this.paciente.idhistoria = x.data.id_historia;
            console.log(this.paciente);
          })
          .catch((err) => console.log(err));
  },
  async obtenerHistoria(idHistoria) {
      await axios
          .get("/Historia/id?id="+idHistoria)
          .then((x) => {
            this.historia = x.data
            console.log(this.historia);
          })
          .catch((err) => console.log(err));
  },
  abrirDialogoDetalle(especialidad,id,horainicio,horafin,idmedico){
    this.$router.push({ name: 'VisualizarDiagnosticoMedico', params: {especialidad: especialidad, idcita:id, horainicio: horainicio, horafin:horafin,idmedico:idmedico }});  
  }
},
computed:{
  ...mapGetters(['user']),
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
</style>