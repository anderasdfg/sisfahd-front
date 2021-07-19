<template>
  <v-card elevation="3" class="card-home">
    <div class="prescripciones">
      <h3>PRESCRIPCIONES</h3>
      <template v-if="hasPrescripcion">
        <div v-for="item in prescripciones" :key="item.id_acto_medico">
          <div class="item">
            <img
              class="icon"
              src="https://i.ibb.co/mbSPV73/medical-prescription-1.png"
              alt=""
            />
            <div class="item-detalle">
              <span>Cita de {{ item.especialidad }}</span>
              <span class="subtitle">Médico: {{ item.medico }}</span>
            </div>

            <v-chip class="ma-2" color="#548CA8" text-color="white">
              <v-avatar left>
                <v-icon>event </v-icon>
              </v-avatar>
              {{ item.fecha_cita }} - Hora: {{ item.hora_cita }}
            </v-chip>
            <button @click="abrirModal(item)">
              <img src="https://i.ibb.co/F49fjsw/ver.png" alt="" />
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No tiene prescripciones
        </v-alert>
      </template>
    </div>
    <div class="ordenes">
      <h3>ÓRDENES</h3>
      <template v-if="hasOrdenes">
        <div v-for="item in ordenes" :key="item.id_acto_medico">
          <div class="item">
            <img
              class="icon"
              src="https://i.ibb.co/KyfSJdp/medical-records-1.png"
              alt=""
            />
            <div class="item-detalle">
              <span>Cita de {{ item.especialidad }}</span>
              <span class="subtitle">Médico: {{ item.medico }}</span>
            </div>

            <v-chip class="ma-2" color="#548CA8" text-color="white">
              <v-avatar left>
                <v-icon>event </v-icon>
              </v-avatar>
              {{ item.fecha_cita }} - Hora: {{ item.hora_cita }}
            </v-chip>
            <button @click="abrirModal(item)">
              <img src="https://i.ibb.co/F49fjsw/ver.png" alt="" />
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No tiene órdenes asignadas
        </v-alert>
      </template>
    </div>
    <v-dialog v-model="dialog">
      <CardDiagnosticoDetalle :diagnostico="diagnostico" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import CardDiagnosticoDetalle from "@/components/ComponentesDashboardPaciente/CardDiagnosticoDetalle.vue";
export default {
  name: "CardPrescripcionesExamenes",
  props: ["user"],
  components: {
    CardDiagnosticoDetalle,
  },
  data() {
    return {
      hasPrescripcion: false,
      hasOrdenes: false,
      paciente: {
        idhistoria: "",
        datospaciente: null,
        antecedentes: null,
      },
      historia: null,
      prescripciones: [],
      ordenes: [],
      objPrescripciones: {
        enfermedad: {},
      },
      objOrdenes: {},
      cita: null,
      moreCita: null,
      diagnostico: {},
      dialog: false,
    };
  },
  async created() {
    await this.obtenerPaciente();
    await this.obtenerHistoria(this.paciente.idhistoria);
    await this.verificarPrescripcionExamenes();
  },
  methods: {
    async obtenerPaciente() {
      await axios
        .get("/Paciente/usuario?idusuario=" + this.user.id)
        .then((x) => {
          this.paciente.datospaciente = x.data.datos;
          this.paciente.antecedentes = x.data.antecedentes;
          this.paciente.idhistoria = x.data.id_historia;
        })
        .catch((err) => console.log(err));
    },
    async obtenerHistoria(idHistoria) {
      await axios
        .get("/Historia/id?id=" + idHistoria)
        .then((x) => {
          this.historia = x.data;
        })
        .catch((err) => console.log(err));
    },
    async verificarPrescripcionExamenes() {
      if (this.historia.historial.length == 0) {
        this.hasPrescripcion = false;
        this.hasOrdenes = false;
      } else {
        console.log(
          "Cantidad de citas del paciente: " + this.historia.historial.length
        );
        for (var i in this.historia.historial) {          
          let idCita = this.historia.historial[i].id_cita;          
          await this.obtenerMasDatosCita(idCita);
          await this.obtenerCita(idCita);
          this.objPrescripciones = {}
          this.objOrdenes = {}
          await this.generarPrescripcionExamenes();          
          this.prescripciones.push(this.objPrescripciones);
          this.ordenes.push(this.objOrdenes);
        }        
      }
    },
    async obtenerCita(idcita) {
      await axios
        .get("/Cita/citaactomedico?idCita=" + idcita)
        .then((x) => {
          this.cita = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerMasDatosCita(idcita) {
      await axios
        .get("/Cita/id?id=" + idcita)
        .then((x) => {
          this.moreCita = x.data;
        })
        .catch((err) => console.log(err));
    },
    async generarPrescripcionExamenes() {
      if (this.cita.acto_medico.diagnostico.length > 0) {        
        for (var i in this.cita.acto_medico.diagnostico) {
          if (this.cita.acto_medico.diagnostico[i].prescripcion.length > 0) {
            this.hasPrescripcion = true;
          }
          if (
            this.cita.acto_medico.diagnostico[i].examenes_auxiliares.length > 0
          ) {
            this.hasOrdenes = true;
          }          
        }
        if (this.hasPrescripcion) {
          this.objPrescripciones.id_acto_medico = this.cita.id_acto_medico;
          this.objPrescripciones.diagnostico =
            this.cita.acto_medico.diagnostico;
          this.objPrescripciones.fecha_cita =
            this.cita.fecha_cita.split("T")[0];
          this.objPrescripciones.hora_cita = this.cita.fecha_cita
            .split("T")[1]
            .substr(0, 5);
          this.objPrescripciones.especialidad =
            this.moreCita.datos_turno.especialidad.nombre;
          this.objPrescripciones.medico =
            this.moreCita.datos_turno.datos_medico.nombre_apellido_medico;

          this.hasPrescripcion = true;          
        }
        if (this.hasOrdenes) {          
             this.objOrdenes.id_acto_medico = this.cita.id_acto_medico;
             this.objOrdenes.ordenes = this.cita.acto_medico.diagnostico[i];
             this.objOrdenes.fecha_cita = this.cita.fecha_cita.split("T")[0];
             this.objOrdenes.hora_cita = this.cita.fecha_cita.split("T")[1].substr(0, 5);
             this.objOrdenes.especialidad = this.moreCita.datos_turno.especialidad.nombre;
            this.objOrdenes.medico = this.moreCita.datos_turno.datos_medico.nombre_apellido_medico;
             this.hasOrdenes = true;
           }
      }
    },
    abrirModal(item) {
      this.diagnostico = item;
      this.dialog = true;
      console.log(this.diagnostico);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-home {
  padding: 2% 2%;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 1%;
  }
}
.item {
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
.item-detalle {
  display: flex;
  flex-direction: column;
  align-self: center;
}
.icon {
  width: 32px;
  height: 32px;
  align-self: center;
}
.subtitle {
  font-size: 14px;
}
</style>
