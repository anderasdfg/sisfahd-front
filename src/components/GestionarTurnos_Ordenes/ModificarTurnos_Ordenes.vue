<template>
  <v-card>
    <h1 class="title-card">MODIFICAR TURNO</h1>
    <div class="estilo-stepper">
      <v-stepper v-model="step">
        <v-stepper-items>
          <v-stepper-content step="1">
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
                    @input="$v.date.$touch()"
                    @blur="$v.date.$touch()"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancelar
                  </v-btn>
                  <v-btn text color="primary" @click="verificarHorario(date)">
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

              <v-row class="filas">
                <v-col align="right">
                  <button class="btn-volver" block @click="cerrarDialogo()">
                    Volver
                  </button>
                </v-col>
                <v-col align="left">
                  <button class="btn-registrar" block @click="modificarTurno(),obtenerTurnos()">
                    Modificar
                  </button>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Modificando Turno</v-card-title>
        <div>
          <v-progress-circular
            style="display: block;margin:40px auto;"
            :size="90"
            :width="9"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight:bold;text-align:center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  name: "ModificarTurno",
  props: ["turno"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Duración",
          align: "start",
          sortable: false,
          value: "duracion",
        },
        { text: "Hora Inicio", value: "hora_inicio", sortable: false },
        { text: "Hora Fin", value: "hora_fin", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      step: 1,
      dialog: false,
      date: null,
      modal: false,
      horasInicio: [],
      horasFin: [],

      //Esto sera reemplazado luego
      medico: {
        id: "",
        id_especialidad: "",
        id_usuario: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
      },
      cargaRegistro: false,
      listaTurnos: [],
    };
  },
  async created() {
    console.log("TURNO" + this.turno.id_medico);
    this.date = this.fechaModificable(1)
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//gi, "-");
    await this.obtenerMedico();

    this.horasInicio = this.generadorHorarios(0, 0);
    this.horasFin = this.generadorHorarios(0, 0);
  },
 
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },
    obtenerTurnos(){
       this.$emit("emit-obtener-turnos");
       console.log("ACTUALIZA")
    },
    async verificarHorario(date) {
      var splitDate = date.split("-");     
      this.$refs.dialog.save(date);
    },
   
    fechaModificable(dias) {
      var fecha = new Date();
      console.log(fecha);
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
    async obtenerMedico() {
      await axios
        .get("/Medico/medicoespcialidad/" + this.turno.id_medico)
        .then((x) => {
          this.medico = x.data;
          console.log(this.medico);
        })
        .catch((err) => console.log(err));
    },
    async modificarTurno() {
      this.turno.fecha_fin = this.date;
      this.turno.fecha_inicio = this.date;
      this.turno.especialidad.nombre = this.medico.especialidad.nombre;
      this.turno.especialidad.codigo = this.medico.id_especialidad;
      this.cargaRegistro = true;
      await axios
        .put("Turno_Orden/Modify", this.turno)
        .then((res) => {
            
          this.cargaRegistro = false;
          this.$emit("emit-obtener-turnos");
          this.cerrarDialogo();
        })
        .catch((err) => console.log(err));
        await this.mensaje(
          "success",
          "Listo",
          "Turno modificado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );
        
    },
   
    generadorHorarios(hora, minutos) {
      var listaHorarios = [];
      var horario = "";
      for (let i = hora; i <= 23; i++) {
        for (let j = minutos; j <= 3; j++) {
          horario = i;
          if (j == 0) {
            horario += ":" + "0" + j;
          } else {
            horario += ":" + j * 15;
          }
          listaHorarios.push(horario);
        }
      }
      return listaHorarios;
    },
    obtenerHoraFin() {
      var splitHora = this.turno.hora_inicio.split(":");
      var hora = parseInt(splitHora[0]);
      var min = parseInt(splitHora[1] / 15);
      if (hora != 23 && min != 3) {
        if (min + 1 != 4) {
          this.turno.hora_fin = hora + ":" + (min + 1) * 15;
        } else {
          this.turno.hora_fin = hora + 1 + ":" + "00";
        }
      } else {
        this.turno.hora_fin = "0:00";
      }
    },
  },
  computed: {},
  validations() {
    return {
      date: {
        required,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper {
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.filas2 {
  margin-top: 4%;
  margin-bottom: 1%;
}
.btn-registrar {
  background: #131c4d;
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
