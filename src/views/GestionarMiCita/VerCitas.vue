<template>
  <div>
    <v-card class="card" style="margin: 80px auto 0; width: 80%">
      <v-card-title> Mis Citas </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaPagos"
        :search="search"
        class="elevation-1"
        v-if="this.user.id"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Pendientes / Pagados</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-dialog ref="dialog" v-model="modal" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Rango de fechas"
                    prepend-icon="mdi-calendar"
                    readonly
                    single-line
                    v-bind="attrs"
                    v-on="on"
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dates" locale="es-es" range scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="cargarDocumentosRango(dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col> -->
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn
              v-if="mostrarBotonPagar(item.estado_pago)"
              color="success"
              dark
              @click="abrirDialogoPagar(item.id)"
            >
              <v-icon left> mdi-cash-usd </v-icon>
              <span>Pagar</span>
            </v-btn>
            <v-btn
              v-if="estadoActual(item.estado_pago)"
              color="info"
              dark
              @click="abrirDialogoDetalle(item.id)"
            >
              <v-icon left> info </v-icon>
              
            </v-btn>

           <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              outlined
              color=yellow
              :disabled="obtenerEstado(item.estado_atencion)"
              @click="abrirDialogoEvaluar(item.id)"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-col>

          </v-row>
        </template>
      </v-data-table>
      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog persistent v-model="dialogoPago" max-width="880px">
        <RealizarPago
          v-if="dialogoPago"
          :pago="pago"
          @close-dialog-Pago="closeDialogPago()"
        >
        </RealizarPago>
      </v-dialog>
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <MiCita
          v-if="dialogodetalle"
          :cita="cita"
          @close-dialog-detalle="closeDialogDetalle()"
        >
        </MiCita>
      </v-dialog>
      <v-dialog persistent v-model="dialogoevaluar" max-width="880px">
        <EvaluarOpiniones
          v-if="dialogoevaluar"
          :opiniones="opiniones"
          :evaluacion="evaluacion"
          @emit-obtener-citas="obtenerPagos()"
          @close-dialog-evaluar="closeDialogEvaluar()"
        >
        </EvaluarOpiniones>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import RealizarPago from "@/components/GestionarPago/RealizarPago.vue";
import MiCita from "@/components/GestionarPago/MiCita.vue";
import EvaluarOpiniones from "@/components/ComponeneteEvaluar/EvaluarOpiniones.vue";
import axios from "axios";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
  name: "VerCitas",
  components: {
    RealizarPago,
    MiCita,
    EvaluarOpiniones,
  },
  data() {
    return {
      search: "",
      pago: {},
      cita: {},
      evaluacion: {},
      opiniones:{},
      headers: [
        {
          text: "Paciente",
          align: "start",
          sortable: false,
          value: "datos_paciente.datos.nombre_apellido_paciente",
        },
        {
          text: "Profesional",
          value: "datos_turno.datos_medico.nombre_apellido_medico",
        },
        { text: "Especialidad", value: "datos_turno.especialidad.nombre" },
        { text: "Fecha de Cita", value: "fecha_cita" },
        { text: "Hora de Cita", value: "datos_turno.hora_inicio" },
        { text: "Estado", value: "estado_pago" },
        { text: "", value: "actions", sortable: false },
      ],
      dialogoPago: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogoevaluar: false,

      fromDate: null,
      toDate: null,
      dates: [],
      modal: false,
    };
  },
  async created() {
    this.fetchUser();
    this.obtenerPagos();
  },
  methods: {
    ...mapActions(["fetchUser"]),
    ...mapMutations(["setListaPagos"]),
    //cerrar dialogo Pago
    closeDialogPago() {
      this.dialogoPago = false;
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogEvaluar() {
      this.dialogoevaluar = false;
    },
    estadoActual(array) {
      if (array === "No pagado") {
        return false;
      } else {
        return true;
      }
    },
    obtenerEstado(array) {
      if (array == "atendido") {
        return false;
      } else {
        return true;
      }
    },
    mostrarBotonPagar(array) {
      if (array === "No pagado") {
        return true;
      } else {
        return false;
      }
    },
    async abrirDialogoPagar(idusuario) {
      this.pago = await this.loadUsuarioPago(idusuario);
      this.dialogoPago = !this.dialogoPago;
    },
    async abrirDialogoDetalle(idusuario) {
      this.cita = await this.loadUsuarioPago(idusuario);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirDialogoEvaluar(idusuario) {
      this.evaluacion = await this.loadUsuarioPago(idusuario);
     // this.opiniones=await this.loadOpiniones();
      this.dialogoevaluar = !this.dialogoevaluar;
    },
    //obtener todos los pagos del usuario
    async obtenerPagos() {
      var idUsuario = this.user.id;


      await axios
        .get(`/Paciente/usuario?idusuario=${idUsuario}`)
        .then(async (res) => {
          var paciente = {};
          paciente = res.data;
          await axios
            .get(`/Cita/paciente?idPaciente=${paciente.id}`)
            .then((res) => {
              var info = {};
              info = res.data;
              console.log(info);

              for (var x = 0; x < res.data.length; x++) {
                var fecha = res.data[x].fecha_cita;
                info[x].fecha_cita = fecha.split("T")[0];
                info[x].datos_turno.hora_inicio = fecha.split("T")[1].substr(0, 5);
                info[x].estado_pago = capitalizarPrimeraLetra(res.data[x].estado_pago);
              }
              this.setListaPagos(info);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioPago(idusuario) {
      var user1 = {};
      await axios
        .get("/Cita/id?id=" + idusuario)
        .then((res) => {
          user1 = res.data;
         
          user1.fecha_cita = user1.fecha_cita.split("T")[0];
          user1.fecha_pago = user1.fecha_cita.split("T")[0];
        })
        .catch((err) => console.log(err));
    
      return user1;
    },
  
  },

  computed: {
    ...mapState(["listaPagos"]),
    ...mapGetters(["user"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>