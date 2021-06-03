<template>
  <v-card>
    <h1 class="title-card">DETALLE DEL TURNO</h1>
    <div class="estilo-stepper">
    <v-stepper v-model="step">
      <v-stepper-header>
          <v-stepper-step step="1" :complete="step>1">
            Datos del turno
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :complete="step>2">
            Datos de los cupos
          </v-stepper-step>
      </v-stepper-header>
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
      <v-text-field
        v-model="date"
        label="Fecha del turno"
        prepend-icon="mdi-calendar"
        readonly
        class="campos"      
      ></v-text-field>
      <v-text-field
        label="Especialidad"
        class="campos"
        v-model="medico.especialidad.nombre" 
        readonly
      ></v-text-field>
      <v-row class="filas">
        <v-col>
          <v-autocomplete
            v-model="turno.hora_inicio"
            :items="horasInicio"
            cache-items                          
            label="Hora Inicio"
            rows="1"
            readonly
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="turno.hora_fin"
            :items="horasFin"
            cache-items
            rows="1"          
            label="Hora Fin"
            readonly   
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-autocomplete
        v-model="ratio"
        :items="ratios"
        cache-items
        class="campos"                            
        label="Ratio de los cupos"
        readonly  
      ></v-autocomplete>
      <v-row class="filas">
        <v-col :cols="11" align="left">
          <v-autocomplete
            v-model="turno.id_tarifa"
            :items="listaTarifas"
            cache-items
            chips                          
            label="Tarifas"
            placeholder="S/."
            item-text="precio_final"
            item-value="id"
            readonly  
          >
            <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      style="margin-top:5px"
                    >
                      <v-avatar left color="#b3b3ff" size="24">
                        <span style="font-size:12px">TE</span>
                      </v-avatar>
                      S/. {{ data.item.precio_final}}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template>
                      <v-list-item-avatar>
                        <v-avatar left color="#b3b3ff" size="24">
                          <span style="font-size:12px">TD</span>
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          >Descripción: {{ data.item.descripcion }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Precio Final:
                          {{ data.item.precio_final }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </template>
                  </template>
          </v-autocomplete>
        </v-col>
        <v-col :cols="1" align="right" align-self="center">
          <button >
            <v-icon>
              mdi-plus
            </v-icon>
          </button>
        </v-col>
      </v-row>
      <v-row class="filas">
        <v-col align="left">
          <button class="btn-registrar" block @click="obtenerDatosCupos">Siguiente</button>
        </v-col>
        <v-col align="right">
          <button class="btn-registrar" block @click="cerrarDialogo()">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card-text>
        
        <v-data-table
        :headers="headers"
        :items="listaCupos"
        :search="search"
        class="elevation-1"
        :items-per-page="8"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              >Cupos del turno
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Búsqueda"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
 <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="success" dark @click="abrirDialogoPagar(item.id)">
              <v-icon left>  mdi-cash-usd </v-icon>
              <span>Pagar</span>
            </v-btn>
              <v-btn v-if="estadoActual(item.estado_pago)" color="info" dark @click="abrirDialogoDetalle(item.id)">
                <v-icon left> info </v-icon>
                <span>Visualizar</span>
              </v-btn>
          </v-row>
        </template>
      </v-data-table> 
      <button class="btn-volver" block @click="step = 1">Volver</button>
    </v-card-text>
      </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Registrando el Turno</v-card-title>
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
  name: "DetalleTurno",
  props: ["turno"],
  data() {
    return {
      listaCupos:[],
      search:"",
      headers: [
        { text: "Duración", align: "start", sortable: false, value: "duracion" },
        { text: "Hora Inicio", value: "hora_inicio", sortable: false},
        { text: "Hora Fin", value: "hora_fin", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      step: 1,
      dialog: false,
      date: null,      
      modal: false,
      horasInicio: [],
      horasFin: [],
      ratios: ['15 min', '30 min'],
      //ratios: ['15 min', '30 min', '45 min'], 45 inavilitado por problemas locos
      ratio: null,
      listaTarifas:[],
      //Esto sera reemplazado luego
      medico : {
        id: "",
        id_usuario: "",
        especialidad: {
          nombre: "",
          codigo: ""
        }
      },
      cargaRegistro:false,
      listaTurnos:[],       
    };
  },
  async created(){
    this.date = new Date(this.turno.fecha_inicio).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    this.obtenerMedico();
    this.obtenerTarifas();
    this.horasInicio = this.generadorHorarios(0,0);
    this.horasFin = this.generadorHorarios(0,0);
  },
  updated(){
    this.ratio = this.calcularRatio()+" min";
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
    async obtenerMedico() {
      await axios
          .get("/Medico/medicoespcialidad/"+this.turno.id_medico)
          .then((x) => {
            this.medico = x.data;
            console.log(this.medico);
          })
          .catch((err) => console.log(err));
    },
    async obtenerTarifas() {
      await axios
          .get("/Tarifa/tarifasmedico/"+this.turno.id_medico)
          .then((x) => {
            this.listaTarifas = x.data;
            console.log(this.listaTarifas);
          })
          .catch((err) => console.log(err));
    },
    generadorHorarios(hora, minutos){
      var listaHorarios = [];
      var horario="";
      for (let i = hora; i <= 23; i++) {
        for (let j = minutos; j <= 3; j++) {
          horario = i;
          if(j == 0){
            horario += ":"+"0"+j;
          }else{
            horario += ":" + j*15;
          }
          listaHorarios.push(horario);
        }
      }
      return listaHorarios;
    },
    obtenerDatosCupos(){
      this.listaCupos = [],
      this.llenarListaCupos();
      this.step = 2;
    },
    llenarListaCupos(){
      var listaCuposNormal = this.turno.cupos;
      var cupo = null;
      var horaFinal = null;
      for(let i = 0; i < listaCuposNormal.length; i++){
          cupo = {
            hora_inicio: null,
            hora_fin : null,
            duracion: null,
            estado: null,
          };
          if(i == listaCuposNormal.length-1){
            cupo.duracion = listaCuposNormal[i].ratio + " min";
            cupo.estado = listaCuposNormal[i].estado.charAt(0).toUpperCase() + listaCuposNormal[i].estado.slice(1);
            cupo.hora_inicio = listaCuposNormal[i].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i].hora_inicio.toLocaleTimeString().length - 3);
            horaFinal = new Date(listaCuposNormal[i].hora_inicio.setMinutes(listaCuposNormal[i].hora_inicio.getMinutes() + listaCuposNormal[i].ratio));
            cupo.hora_fin = horaFinal.toLocaleTimeString().substring(0,horaFinal.toLocaleTimeString().length - 3);
          }else{
            cupo.hora_inicio = listaCuposNormal[i].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i].hora_inicio.toLocaleTimeString().length - 3);
            cupo.duracion = listaCuposNormal[i].ratio + " min";
            cupo.estado = listaCuposNormal[i].estado.charAt(0).toUpperCase() + listaCuposNormal[i].estado.slice(1);
            cupo.hora_fin = listaCuposNormal[i+1].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i+1].hora_inicio.toLocaleTimeString().length - 3);
          }
          this.listaCupos.push(cupo);
      }
    },
    calcularRatio(){
      var listaCupos = this.turno.cupos;
      var ratiomayor = 0;
      var ratiomenor = 0;
      for(let i = 0; i < listaCupos.length; i++){
        if(listaCupos[i].ratio == 15){
          ratiomenor++;
        }else{
          ratiomayor++;
        }
      }
      if(ratiomayor > ratiomenor){
        return 30;
      }else{
        return 15;
      }
    }
  },
    /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
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
.btn-volver{
  margin-top: 4%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-registrar {  
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>