<template>
  <v-card>
    <h1 class="title-card">REGISTRAR TURNO</h1>
    <div class="estilo-stepper">
      <v-stepper v-model="step">
        <v-stepper-items>
          <v-stepper-content step="1">
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

            <v-row class="filas">
              <v-col align="center">
                <button class="btn-volver" block @click="cerrarDialogo()">
                  Volver
                </button>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "DetalleTurno",
  props: ["turno"],
  data() {
    return {
      listaCupos: [],
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
    this.date = new Date(this.turno.fecha_inicio)
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//gi, "-");
    this.obtenerMedico();
     this.horasInicio = this.generadorHorarios(0, 0);
      this.horasFin = this.generadorHorarios(0, 0);
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
        .get("/Medico/medicoespcialidad/" + this.turno.id_medico)
        .then((x) => {
          this.medico = x.data;
          console.log(this.medico);
        })
        .catch((err) => console.log(err));
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
  },
  /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
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
  font-size: 30px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 0% 8%;
}
.btn-volver {
  margin-top: 0%;
  margin-bottom: 0%;
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
</style>
