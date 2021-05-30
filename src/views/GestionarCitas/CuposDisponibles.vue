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
          >
            <template v-slot:day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              ></div>
            </template>
          </v-calendar>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CuposDisponibles",
  data: () => ({
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
    value: "",
    ready: false,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  async created() {
    this.obtenerCupos();
  },
  components: {},
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
          console.log(x);
          var info = {};
          info = x.data;
          console.log(x.data);
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
              };
              this.cupos.push(cupo);
            }
          }
          console.log(this.cupos);
          this.miupdateRange();
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
      console.log("miUpdateRange");
      console.log(this.cupos);
      const events = [];

      //supuestamente tenemos la lista de citas
      let listaActual = this.cupos;

      const eventCount = listaActual.length;
      console.log(eventCount);
      for (let i = 0; i < eventCount; i++) {
        var st = listaActual[i].hora_inicio;
        var arrst = st.split("T");
        var horast = arrst[1].split("Z");
        var startdate = arrst[0] + " " + horast[0];

        var enddate = Date.parse(startdate);
        enddate = new Date(enddate); // Date object
        enddate.setMinutes(enddate.getMinutes() + listaActual[i].ratio); // timestamp

        events.push({
          name: listaActual[i].nombre_medico,
          start: startdate,
          end: enddate,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: 1,
        });
        console.log("-------------------------");
        console.log(events[i].name);
        console.log(events[i].start);
        console.log(events[i].end);
        console.log("-------------------------");
      }

      this.events = events;

      console.log("me vine");
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  },
  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
  },
  filters: {},
};
</script>

<style lang="scss" >
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
</style>