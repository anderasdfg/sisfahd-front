<template>
  <div style="margin-top: 40px">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-dialog
              transition="dialog-bottom-transition"
              v-model="mostrar"
              max-width="700px"
            >
              <ReservarCita />
            </v-dialog>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :now="selectDate"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="miupdateRange"
            locale="es"
          >
          </v-calendar>
        </v-sheet>
        <v-dialog
          transition="dialog-bottom-transition"
          v-model="selectedOpen"
          max-width="700px"
        >
          <v-card class="card">
            <div class="card-detallecita">
              <div class="card-detallecita_left">
                <h1>{{ selectedEvent.name }}</h1>
                <h3><b>Especialidad</b> {{ selectedEvent.especialidad }}</h3>
                <div>
                  Médico Especialista en Cardiología formado en el Hospital
                  Universitario Virgen Macarena (HUVM) de Sevilla (España). He
                  recibido una formación global dentro de la patología
                  cardiovascular con un enfoque humanista en el trato al
                  paciente y con un interés particular en investigación clínica.
                  Idiomas: Inglés. <br />
                  <h3>
                    <b>Costo de la cita: </b> S/. {{ selectedEvent.precio }}
                  </h3>
                </div>
              </div>
              <div class="card-detallecita_right">
                <img
                  src="https://ma.com.pe/sites/default/files/noticias/que-obligaciones-tiene-el-medico-ocupacional-frente-al-covid-19.jpg"
                  alt=""
                  class="profile-medico"
                />
                <img
                  src="https://www.perutourism.com/images/experiences/estrellas/5-estrellas.png"
                  alt=""
                  class="stars-bottom"
                />
              </div>
            </div>

            <div class="card-datoscupo">
              <div class="card-datocupo">
                {{ selectedEvent.hora_inicio }}
              </div>
              <div class="card-datocupo">{{ selectedEvent.ratio }} minutos</div>
            </div>
            <button class="button-reservar" @click="registrarCita">
              RESERVAR CITA
            </button>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import ReservarCita from "@/components/GestionarCitas/ReservarCita.vue";

export default {
  name: "CuposDisponibles",
  components: {
    ReservarCita,
  },
  data: () => ({
    mostrar: false,
    focus: "",
    type: "day",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    selectEspecialidad: "",
    selectDate: "",
    cupos: [],
    cita: {
      estado_atencion: "no atendido",
      estado_pago: "no pagado",
      fecha_cita: "",
      fecha_pago: null,
      fecha_reserva: "",
      id_paciente: "",
      enlace_cita: "",
      precio_neto: 0,
      calificacion: 0,
      observaciones: [],
      tipo_pago: "Niubiz",
      id_turno: "",
      id_acto_medico: "",
      fecha_cita_fin: "",
    },
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  async created() {
    this.obtenerCupos();
  },
  methods: {
    async obtenerCupos() {
      this.selectEspecialidad = this.$route.params.selectEspecialidad;
      this.selectDate = this.$route.params.selectDate;
      this.focus = this.selectDate;
      await axios
        .get(
          `/Turno/turnos?idEspecialidad=${this.selectEspecialidad}&fecha=${this.selectDate}`
        )
        .then((x) => {
          for (var i = 0; i < x.data.length; i++) {
            for (var y = 0; y < x.data[i].cupos.length; y++) {
              var cupo = {
                id_turno: x.data[i].id,
                estado: x.data[i].cupos[y].estado,
                hora_inicio: x.data[i].cupos[y].hora_inicio,
                id_cita: x.data[i].cupos[y].id_cita,
                ratio: x.data[i].cupos[y].ratio,
                id_medico: x.data[i].id_medico,
                nombre_medico: x.data[i].nombre_medico,
                fecha_cupo: this.selectDate,
                especialidad: x.data[i].especialidad.nombre,
                precio: x.data[i].precio,
              };
              if (cupo.estado == "disponible") {
                this.cupos.push(cupo);
              }
            }
          }
          this.miupdateRange();
        })
        .catch((err) => console.log(err));
    },
    async registrarCita() {
      var fechacita = Date.parse(this.selectedEvent.hora_inicio);
      fechacita = new Date(fechacita);

      this.cita.fecha_cita = fechacita;
      this.cita.id_paciente = "608f70f2a47f0a6734f6db18";
      this.cita.enlace_cita = `https://meet.jit.si/${this.cita.id_paciente}-${this.cita.fecha_cita}`;
      this.cita.precio_neto = this.selectedEvent.precio;
      this.cita.id_turno = this.selectedEvent.id_turno;
      this.cita.fecha_cita_fin = this.selectedEvent.end;
      this.cita.fecha_reserva = new Date();

      console.log(this.cita);

      await axios
        .post("/Cita/cita", this.cita)
        .then((res) => {
          this.cita = res.data;
          console.log("dfsdf");
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.mostrar = true;
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        console.log(this.selectedEvent);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    miupdateRange() {
      const events = [];
      let listaActual = this.cupos;
      const eventCount = listaActual.length;

      for (let i = 0; i < eventCount; i++) {
        var st = listaActual[i].hora_inicio;
        var arrst = st.split("T");
        var horast = arrst[1].split("Z");
        var startdate = arrst[0] + " " + horast[0];

        var enddate = Date.parse(startdate);
        enddate = new Date(enddate); // Date object
        enddate.setMinutes(enddate.getMinutes() + listaActual[i].ratio); // timestamp

        events.push({
          name: "Dr. " + listaActual[i].nombre_medico,
          start: startdate,
          end: enddate,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: 1,
          id_turno: listaActual[i].id_turno,
          id_medico: listaActual[i].id_medico,
          fecha_cupo: this.selectDate,
          especialidad: listaActual[i].especialidad,
          ratio: listaActual[i].ratio,
          hora_inicio: startdate, //listaActual[i].hora_inicio,
          precio: listaActual[i].precio,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}

.card {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.card-detallecita {
  padding: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .card-detallecita_left {
    display: flex;
    flex-direction: column;
    h1 {
      color: $blue;
      font-size: 20px !important;
      font-weight: normal;
    }
    h3 {
      color: $blue;
      font-size: 15px !important;
      font-weight: normal;
      margin-bottom: 2%;
    }
  }
  .card-detallecita_right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-medico {
    width: 50%;
    height: 100%;
    border-radius: 50%;
    margin: 0 0 3% 0;
  }
  .stars-bottom {
    width: 25%;
    height: 10%;
    padding: 0 0 1% 0;
  }
}
.card-datoscupo {
  display: flex;
  flex-direction: row;
  .card-datocupo {
    border-radius: 6px;
    background: $sky-blue;
    color: $black;
    font-size: 18px;
    width: 20%;
    text-align: center;
    margin: 1%;
  }
}
.button-reservar {
  margin: 1%;
  background: $blue;
  color: $white;
  text-align: center;
  border-radius: 6px !important;
  width: 42%;
  height: 5vh;
}
</style>