<template>
  <v-card>
    <h1 class="title-card">REGISTRAR TURNO</h1>
    <v-card-text>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent        
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha del turno"
            prepend-icon="mdi-calendar"
            readonly
            class="campos"
            v-bind="attrs"            
            v-on="on"             
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
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
            @change="obtenerHoraFin()"      
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="turno.hora_fin"
            :items="horasFin"
            cache-items
            rows="1"          
            label="Hora Fin"   
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-autocomplete
        v-model="ratio"
        :items="ratios"
        cache-items
        class="campos"                            
        label="Ratio del Turno"  
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
          <button class="btn-registrar" block>Registrar</button>
        </v-col>
        <v-col align="right">
          <button class="btn-volver" block @click="cerrarDialogo()">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "RegistrarTurno",
  props: ["idmedico"],
  data() {
    return {
      dialog: false,
      date: null,      
      modal: false,
      horasInicio: [],
      horasFin: [],
      ratios: ['15 min', '30 min', '45 min'],
      ratio: null,
      listaTarifas:[],
      //Esto sera reemplazado luego
      turno: {
        id: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
        estado: "",
        fecha_fin: null,
        fecha_inicio: null,
        hora_fin: '8:15',
        hora_inicio: '8:00',
        id_medico: "",
        id_tarifa: "",
        cupos: [], 
      },
      medico : {
        id: "",
        id_usuario: "",
        especialidad: {
          nombre: "",
          codigo: ""
        }
      },       
    };
  },
  async created(){
    this.date = this.fechaPrimera().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    this.obtenerMedico();
    this.obtenerTarifas();
    this.horasInicio = this.generadorHorarios(0,0);
    this.horasFin = this.generadorHorarios(0,0);
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      this.$emit("emit-close-dialog");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fechaPrimera(){
      var fecha = new Date();
      console.log(fecha)
      fecha.setDate(fecha.getDate() + 1);
      return fecha;
    },
    async obtenerMedico() {
      await axios
          .get("/Medico/medicoespcialidad/"+this.idmedico)
          .then((x) => {
            this.medico = x.data;
            console.log(this.medico);
          })
          .catch((err) => console.log(err));
    },
    async obtenerTarifas() {
      await axios
          .get("/Tarifa/tarifasmedico/"+this.idmedico)
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
    obtenerHoraFin(){
      var splitHora = this.turno.hora_inicio.split(":");
      var hora = parseInt(splitHora[0]);
      var min = parseInt(splitHora[1]/15);
      if(hora != 23 && min != 3){
        if(min + 1 != 4){
          this.turno.hora_fin = hora + ":" + ((min+1)*15);
        }else{
          this.turno.hora_fin = (hora+1) + ":" + "00";
        }
      }else{
        this.turno.hora_fin = "0:00";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 10%;
  text-align: center;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 7% 10%;  
}
.filas{
  margin: 2% 8% 7% 8%;
}
.btn-registrar {  
  background: $green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-volver {  
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>