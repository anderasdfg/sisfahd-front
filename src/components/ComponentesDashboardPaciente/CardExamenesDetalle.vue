<template>
  <v-card elevation="3" class="card-home-prescripcion">
    <div class="header-logo">
      <img src="https://i.ibb.co/C1DWyrk/logo-s.png" alt="" />
      <h3>ÓRDENES DE LABORATORIO/IMAGENES</h3>      
    </div>
    <div class="header-receta">
      <v-chip color="primary">
        <v-icon left> mdi-domain </v-icon>
        <span class="text-span">{{ cita.especialidad }}</span>
      </v-chip>
      <v-chip color="primary">
        <v-icon left> mdi-account-circle-outline </v-icon>
        <span class="text-span">{{ cita.medico }}</span>
      </v-chip>
      <v-chip color="primary">
        <v-icon left> event </v-icon>
        <span class="text-span"
          >{{ cita.fecha_cita }} {{ cita.hora_cita }}</span
        >
      </v-chip>
    </div>

    <div v-for="item in listaDiagnosticos" :key="item.codigo_enfermedad">
      <h4 class="text-blue">DIAGNÓSTICO</h4>
      <div class="content-diagnostico">
        <p>{{ item.nombre_enfermedad }}</p>
        <p><b>Tipo</b> {{ item.tipo }}</p>
        <p><b>Frecuencia</b> {{ item.frecuencia }}</p>
      </div>
      <h4 class="text-blue">Examenes</h4>
      <div
        v-for="itemPrescripcion in item.examenes_auxiliares"
        :key="itemPrescripcion.codigo"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="item-prescripcion"
              >{{ itemPrescripcion.nombre }}
              </v-list-item-title
            >
            <v-list-item-subtitle class="item-prescripcion-subtitle"
              > {{ itemPrescripcion.tipo }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
      <div
        v-if="item.examenes_auxiliares.length == 0"
        
      >   
      <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="item-prescripcion"
              >
              </v-list-item-title
            >
            <v-list-item-subtitle class="item-prescripcion-subtitle"
              > No se han ordenado examenes para este diagnóstico</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <v-btn
            color="green darken-1"
            text
            @click="$emit('abiertoOrdenes', false)" 
          >
            Aceptar
          </v-btn>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CardPrescripcionDetalle",
  props: ["cita"],
  data() {
    return {
      prescripciones: [],
      listaDiagnosticos: [],
      acto_medico: {},
    };
  },
  async created() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  async mounted() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    async obtenerDiagnostico(idcita) {
      await axios
        .get("/ActoMedico/id?id=" + idcita)
        .then((x) => {
          this.acto_medico = x.data;
          console.log(this.acto_medico);
          this.listaDiagnosticos = this.acto_medico.diagnostico;
          console.log(this.listaDiagnosticos);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.card-home-prescripcion {  
  padding: 3% ;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column; 
}
.header-receta {
  margin: 2% 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.content-diagnostico {
  display: flex;
  justify-content: space-between;
}
.single-line {
  background: #efefef;
}
.item-prescripcion {
  font-size: 16px !important;
}
.item-prescripcion-subtitle {
  font-size: 16px !important;
}
.text-span {
  font-size: 16px !important;
}
.header-logo {
  display: flex;
  margin: 2%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: $blue !important;
}
.text-blue {
  color: $blue !important;
  margin-bottom: 1%;
}
</style>

