<template>
  <v-card>
    <h1 class="title-card">REGISTRAR TURNO</h1>
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
                    :error-messages="errorFechaTurno"
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

              <v-row class="filas"> </v-row>
              <v-row class="filas">
                <v-col align="left">
          <button class="btn-registrar" block @click="registrarTurno">Registrar</button>
        </v-col>
                <v-col align="right">
                  <button class="btn-volver" block @click="cerrarDialogo()">
                    Volver
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
        <v-card-title class="justify-center">Registrando Turno</v-card-title>
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
  name: "RegistrarTurno",
  props: ["idmedico"],
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
      turno: {
        id: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
        estado: "pendiente",
        fecha_fin: null,
        fecha_inicio: null,
        hora_fin: "8:15",
        hora_inicio: "8:00",
        id_medico: "",

  
      },
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
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
     mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    cerrarDialogo() {
 
      this.$emit("emit-close-dialog");
    },
    async verificarHorario(date) {
      var splitDate = date.split("-");
      await this.obtenerTurnos(splitDate[1], splitDate[0]);
      this.$refs.dialog.save(date);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fechaModificable(dias) {
      var fecha = new Date();
      console.log(fecha);
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
    async obtenerMedico() {
      await axios
        .get("/Medico/medicoespcialidad/" + this.idmedico)
        .then((x) => {
          this.medico = x.data;
          console.log(this.medico);
        })
        .catch((err) => console.log(err));
    },

    async registrarTurno() {
      this.turno.id_medico = this.idmedico;
      this.turno.especialidad.nombre = this.medico.especialidad.nombre;
      this.turno.especialidad.codigo = this.medico.id_especialidad;
      this.turno.fecha_inicio = new Date(this.date.replace(/\-/gi, "/"));
      this.turno.fecha_fin = new Date(this.date.replace(/\-/gi, "/"));
      console.log(this.date);
      console.log(this.turno);
      // this.$v.informe.$touch();
      // if (this.$v.informe.$invalid) {
      //   if (false) {
      //   console.log("hay errores");
      //   this.mensaje(
      //     "error",
      //     "..Oops",
      //     "Se encontraron errores en el formulario",
      //     "<strong>Verifique los campos Ingresados<strong>"
      //   );
      // } else {
      console.log("no hay errores");
      this.cargaRegistro = true;
      await axios
        .post("Turno_Orden/Create", this.turno)
        .then((res) => {
          this.reiniciarTurno();
          this.$emit("emit-obtener-turnos");
          this.cargaRegistro = false;
          this.cerrarDialogo();
          
        })
        
        .catch((err) => console.log(err));
         await this.mensaje(
          "success",
          "Listo",
          "Turno registrado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );
      //  }
      // }
    },
    async obtenerTurnos(mes, año) {
      await axios
        .get("/Turno_Orden/listaturnosO/" + this.idmedico + "/" + mes + "/" + año)
        .then((x) => {
          this.listaTurnos = [];
          this.listaTurnos = x.data;
          console.log(this.listaTurnos);
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

    reiniciarTurno() {
      this.turno = {
        id: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
        estado: "pendiente",
        fecha_fin: null,
        fecha_inicio: null,
        hora_fin: "8:15",
        hora_inicio: "8:00",
        id_medico: "",

        cupos: [],
      };
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    
    
  },
 
  computed: {
    errorFechaTurno() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required &&
        errors.push("Debe ingresar la fecha de del turno obligatoriamente");
      var dateselected = new Date(this.date.replace(/\-/gi, "/"));
      var mindate = this.fechaModificable(0);
      var maxdate = this.fechaModificable(180);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a los 6 meses");
      !(dateselected.getTime() >= mindate.getTime()) &&
        errors.push("La fecha debe ser mayor a un dia de la actual");
      return errors;
    },
  },
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
