<template>
  <div style="margin-top: 40px; padding: 10px 15px 0 85px;" >
    <button class="button-registrar-turno" @click="openDialogRegistrarTurno()">Registrar turno</button>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogRegistrarTurno"
      max-width="600px"
    >
      <RegistrarTurno v-if="dialogRegistrarTurno" :idmedico = idMedico @emit-close-dialog="closeDialogRegistrarTurno()" @emit-obtener-turnos="obtenerTurnos()"></RegistrarTurno>
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
            @change="updateRange"
            locale="es"
          ></v-calendar> 
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
                <v-btn @click="openDialogModificarTurno()" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                 <v-dialog
                  transition="dialog-bottom-transition"
                  v-model="dialogModificarTurnoFake"
                  max-width="600px"
                >
                  <ModificarTurno v-if="dialogModificarTurnoFake" :turno = selectedEvent.turno @emit-close-dialog="closeDialogModificarTurno()"></ModificarTurno>
                </v-dialog>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="openDialogDetalleTurno()" icon>
                  <v-icon color="white">mdi-card-search</v-icon>
                </v-btn>
                <v-dialog
                  transition="dialog-bottom-transition"
                  v-model="dialogDetalleTurno"
                  max-width="600px"
                >
                  <DetalleTurno v-if="dialogDetalleTurno" :turno = selectedEvent.turno @emit-close-dialog="closeDialogDetalleTurno()"></DetalleTurno>
                </v-dialog>
                <v-btn @click="openDialogEliminarTurno()" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-dialog
                  transition="dialog-bottom-transition"
                  v-model="dialogEliminarTurno"
                  max-width="500px"
                >
                  <EliminarTurno v-if="dialogEliminarTurno" :turno = selectedEvent.turno @emit-close-dialog="closeDialogEliminarTurno()" @emit-obtener-turnos="obtenerTurnos()" @emit-cerrar="selectedOpen = false"></EliminarTurno>
                </v-dialog>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.evento"></span>
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
  <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Cargando Turnos</v-card-title>
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
import RegistrarTurno from "@/components/GestionarTurnos/RegistrarTurno.vue";
import ModificarTurno from "@/components/GestionarTurnos/ModificarTurno.vue";
import DetalleTurno from "@/components/GestionarTurnos/DetalleTurno.vue";
import EliminarTurno from "@/components/GestionarTurnos/EliminarTurno.vue";
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
      //Cosas del Gestionar Turno
      dialogRegistrarTurno: false,
      dialogDetalleTurno: false,
      dialogModificarTurno: false,
      dialogModificarTurnoFake: false,
      dialogEliminarTurno: false,
      listaTurnos: [],
      mesCalendario: new Date().getMonth()+1,
      añoCalendario: new Date().getFullYear(),
      idMedico: "",
      cargaRegistro:false,
    }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  async created() {
      this.cargaRegistro = true;
      this.idMedico = "6081f9714dd1ef3fdc321188";
      await this.obtenerTurnos();
      this.cargaRegistro = false;
  },
  components: {
      RegistrarTurno,
      ModificarTurno,
      DetalleTurno,
      EliminarTurno,
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
      updateRange () {
        const events = []
        let listaActual = this.listaTurnos;
        const eventCount = listaActual.length;
        for (let i = 0; i < eventCount; i++) {
          var inicio = listaActual[i].fecha_inicio;
          var fechaInicio = inicio.split("T");
          var horaInicio = listaActual[i].hora_inicio + ":"+ 0;
          var comienzoFecha = fechaInicio[0] + " " + horaInicio;

          var fin = listaActual[i].fecha_fin;
          var fechaFin = fin.split("T");
          var horaFin = listaActual[i].hora_fin + ":"+ 0
          var finFecha = fechaFin[0] + " " + horaFin;

          events.push({
            name: "Turno"+ " " +listaActual[i].especialidad.nombre,
            start: comienzoFecha,
            end: finFecha,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            timed: 1,
            evento:"Hora inicio: "+ listaActual[i].hora_inicio + " - Hora fin: "+ listaActual[i].hora_fin,
            turno: listaActual[i],
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
      openDialogModificarTurno() {
        this.dialogModificarTurno = true;
      },
      closeDialogModificarTurno() {
        this.dialogModificarTurno = false;
      },
      openDialogDetalleTurno(){
        this.dialogDetalleTurno = true;
      },
      closeDialogDetalleTurno(){
        this.dialogDetalleTurno = false;
      },
      openDialogEliminarTurno(){
        this.dialogEliminarTurno = true;
      },
      closeDialogEliminarTurno(){
        this.dialogEliminarTurno = false;
      },
      async obtenerTurnos() {
        console.log(this.mesCalendario);
        console.log(this.añoCalendario); 
        await axios
          .get("/Turno/listaturnos/"+this.idMedico+"/"+this.mesCalendario+"/"+this.añoCalendario)
          .then((x) => {
            this.listaTurnos = [];
            this.listaTurnos = x.data;
            this.updateRange();
            this.convertirDates();
            console.log(this.listaTurnos);
          })
          .catch((err) => console.log(err));
      },
      convertirDates(){
        for(let i = 0; i < this.listaTurnos.length; i++){
          for(let j = 0; j < this.listaTurnos[i].cupos.length; j++){
            this.listaTurnos[i].cupos[j].hora_inicio = new Date(this.listaTurnos[i].cupos[j].hora_inicio)
          }
        }
        for(let i = 0; i < this.listaTurnos.length; i++){
          for(let j = 0; j < this.listaTurnos[i].cupos.length; j++){
            this.listaTurnos[i].cupos[j].hora_inicio = new Date(this.listaTurnos[i].cupos[j].hora_inicio.setMinutes(this.listaTurnos[i].cupos[j].hora_inicio.getMinutes() + 300))
          }
        }
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
    width: 18vh;
    color: white;        
    border-radius: 10px;  
    height: 6vh;
    font-size: 20px;
    align-self: center;
    align-items: center;
}
</style>