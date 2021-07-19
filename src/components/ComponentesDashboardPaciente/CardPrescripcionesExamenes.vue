<template>
  <v-card elevation="3" class="card-home">
    <div class="prescripciones">
      <h3>PRESCRIPCIONES</h3>
      <template v-if="hasPrescripcion"> hola </template>
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
      <template v-if="hasOrdenes"> hola </template>
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
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "CardPrescripcionesExamenes",
  props: ["user"],
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
      objPrescripciones: {},
      objOrdenes: {},
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
        for (var i in this.historia.historial) {
          console.log("Historial");
          console.log(this.historia.historial);
          let idCita = this.historia.historial[i].id_cita;
          console.log(idCita);
          await this.obtenerCita(idCita);
        }
      }
    },
    async obtenerCita(idcita) {
      await axios
        .get("/Cita/citaactomedico?idCita=" + idcita)
        .then((x) => {
          this.cita = x.data;
          console.log("cita :)");
          console.log(this.cita);
          if (this.cita.acto_medico.diagnostico.length > 0) {
            console.log("diagnóstico :D");
            console.log(this.cita.acto_medico.diagnostico);
            for (var i in this.cita.acto_medico.diagnostico) {
              console.log(i);
              console.log(this.cita.acto_medico.diagnostico[i].prescripcion);
              if (this.cita.acto_medico.diagnostico[i].prescripcion.length > 0) {                                                 
                console.log("Actos médicos con prescripciones");
                this.objPrescripciones.id_acto_medico = this.cita.id_acto_medico;
                this.objPrescripciones.prescripciones = this.cita.acto_medico.diagnostico[i].prescripcion;
                this.prescripciones.push(this.objPrescripciones);
                console.log(this.prescripciones);                
                this.hasPrescripcion = true;
              }
              if (this.cita.acto_medico.diagnostico[i].examenes_auxiliares.length > 0) {                                
                console.log("Actos médicos con ordenes");
                this.objOrdenes.id_acto_medico = this.cita.id_acto_medico;
                this.objOrdenes.ordenes = this.cita.acto_medico.diagnostico[i].examenes_auxiliares;
                this.ordenes.push(this.objOrdenes);
                console.log(this.ordenes);
                this.hasOrdenes = true;
              }
            }
          }
        })
        .catch((err) => console.log(err));
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
</style>
