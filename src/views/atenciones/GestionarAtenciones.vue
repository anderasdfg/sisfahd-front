<template>
  <div style="margin-top: 40px;" >
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Hoy
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
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
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="obtenerCitasporMedico"
            locale="es"
          ></v-calendar> <!-- @change="miupdateRange"-->
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Cargando Citas</v-card-title>
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
  </div>
</template>
<script>

import axios from "axios";
//import ConsultarIncidencia from '@/components/incidencias/ConsultarIncidencia.vue'
//import { mapState, mapMutations } from "vuex";

export default {
  name: "GestionarAtenciones",
  data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      milistaCitas: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'CITA', 'Event', 'Birthday', 'Conference', 'Party'],
      cargaRegistro: false,
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
  async created() {
    this.cargaRegistro = true;
    //probando
    var fechact = new Date();
    var arrst = fechact.toString().split("T");
    var start = {
      date: arrst[0]
    };
    var end = {
      date: arrst[0]
    }
    //
    await this.obtenerCitasporMedico({ start, end });
    //
  },
  components: {
      
  },
  methods: {
    navegartoDetalle(miobj){
      this.$router.push({
        name: 'DetalleAtencion',
        params: {
          datitos: miobj
        }
      });
    },
    async obtenerCitasporMedico({ start, end }) {

      //obtenemos la variable sesion y sacamos el turno
      var turno = "6081f9714dd1ef3fdc321188";

      //probandp
      var arrdate = start.date.split('-')
      var month = arrdate[1];
      var year = arrdate[0];
      //
      
      if(month == undefined || year == undefined) {
        console.log("indefinido como tu");
      }
      else{

        await axios
        .get("/Cita/listacitas/"+turno+"/"+month+"/"+year)
        .then((x) => {
          this.milistaCitas = [];
          this.milistaCitas = x.data;
          console.log(this.milistaCitas);
          this.miupdateRange();
          this.cargaRegistro = false;
        })
        .catch((err) => {console.log(err); this.cargaRegistro = false; });

      }
    },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.cargaRegistro = true;
        this.$refs.calendar.prev()
      },
      next () {
        this.cargaRegistro = true;
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        //GAAA
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        
        var miobj = {
          esp: this.selectedEvent.especialidad,
          fi: this.selectedEvent.start,
          fe: this.selectedEvent.end,
          cita: this.selectedEvent.id_cita,
          turno: this.selectedEvent.id_turno,
          enlace_cita: this.selectedEvent.enlace_cita,
          id_acto_medico: this.selectedEvent.id_acto_medico,
        }

        this.navegartoDetalle(miobj);
      },
      miupdateRange () {
        const events = []

        //supuestamente tenemos la lista de citas
        let listaActual = this.milistaCitas;

        const eventCount = listaActual.length;

        for (let i = 0; i < eventCount; i++) {
          var st = listaActual[i].fecha_cita;
          var arrst = st.split("T");
          var horast = arrst[1].split("Z");
          var startdate = arrst[0] + " " + horast[0];

          var end = listaActual[i].fecha_cita_fin;
          var arrend = end.split("T");
          var horaend = arrend[1].split("Z");
          var enddate = arrend[0] + " " + horaend[0];

          events.push({
            name: this.names[3],
            start: startdate,
            end: enddate,
            color: this.colors[2],
            id_cita: listaActual[i].id,
            id_turno: listaActual[i].id_turno,
            especialidad: listaActual[i].medico.especialidad.nombre,
            enlace_cita: listaActual[i].enlace_cita,
            id_acto_medico: listaActual[i].id_acto_medico,
            timed: 1,
          })
        }

        this.events = events;
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  computed: {

  },
  filters: {
    
  },
};
</script>

<style scoped>

</style>