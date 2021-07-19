<template>
  <v-card elevation="3" class="card-home">
      <h3>Cita de {{diagnostico.especialidad}}</h3>
      <h5>Médico: {{diagnostico.medico}}</h5>      
      {{diagnostico}}     
      <hr>
      {{prescripciones}}
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CardDiagnosticoDetalle",
  props: ["diagnostico"],
  data() {
    return {
      prescripciones: [],      
    };
  },
  async created() {      
    this.prescripciones = this.diagnostico.diagnostico.prescripcion;
  },
  methods: {
    
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
