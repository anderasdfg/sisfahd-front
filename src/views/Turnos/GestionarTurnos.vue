<template>
  <div style="margin-top: 40px; padding: 10px 15px 0 85px;" >
    <button class="button-registrar-turno" @click="openDialogRegistrarTurno()">Registrar turno</button>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogRegistrarTurno"
      max-width="600px"
    >
      <RegistrarTurno @emit-close-dialog="closeDialogRegistrarTurno()"></RegistrarTurno>
    </v-dialog>
  <div style="margin-top: 20px;">  
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
            @change="miupdateRange"
            locale="es"
          ></v-calendar> <!--@change="miupdateRange"-->
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
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
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
  </div>
</template>
<script>
//import axios from "axios";
//import ConsultarIncidencia from '@/components/incidencias/ConsultarIncidencia.vue'
//import { mapState, mapMutations } from "vuex";
import RegistrarTurno from "@/components/GestionarTurnos/RegistrarTurno.vue";
export default {
  name: "GestionarAtenciones",
  data: () => ({
    //Cosas del Calendario
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
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'CITA 01', 'Event', 'Birthday', 'Conference', 'Party'],
      //Cosas del Gestionar Turno
      dialogRegistrarTurno: false,
    }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  async created() {
      
  },
  components: {
      RegistrarTurno,
  },
  methods: {
    //Metodos del Calendario
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
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      miupdateRange ({ start, end }) {
        const events = []

        const eventCount = 4;

        for (let i = 0; i < eventCount; i++) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = (today.getHours() + i) + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            var enddate = new Date();
            var edate = enddate.getFullYear()+'-'+(enddate.getMonth()+1)+'-'+enddate.getDate();
            var etime = (enddate.getHours() + 1 + i) + ":" + enddate.getMinutes() + ":" + enddate.getSeconds();
            var edateTime = edate+' '+etime;

            events.push({
            name: this.names[3],
            start: dateTime,
            end: edateTime,
            color: this.colors[2],
            timed: 1,
            })
        }

        this.events = events;
      },
      //Metodos del Gestionar Turnos
      openDialogRegistrarTurno() {
        this.dialogRegistrarTurno = true;
      },
      closeDialogRegistrarTurno() {
        this.dialogRegistrarTurno = false;
      },
    },
  computed: {
    
  },
  filters: {
    
  },
};
</script>

<style lang="scss" scoped>
.button-registrar-turno{  
    background-color: $blue;
    width: 15vh;
    color: white;        
    align-self: center;
    border-radius: 10px;  
    height: 5vh;
    font-size: 20px;
}
</style>