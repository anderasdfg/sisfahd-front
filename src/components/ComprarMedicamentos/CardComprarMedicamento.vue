<template>
  <v-card elevation="3" class="card-home-prescripcion">
    <div class="header-logo">
      <img src="https://i.ibb.co/C1DWyrk/logo-s.png" alt="" />
      <h2>Medicamentos recetados</h2>      
    </div>
    <button style="text-align: right;" @click="abrirModalPrescripcion(item)">
      <v-icon color="#4172F2">mdi-refresh</v-icon>
    </button>
    <div v-for="item in listaDiagnosticos" :key="item.codigo_enfermedad">
      <div v-for="itemPrescripcion in item.prescripcion" :key="itemPrescripcion.codigo">
        <CardVentaMedicamento :nombre="itemPrescripcion.nombre" :concentracion="itemPrescripcion.concentracion" :formula="itemPrescripcion.formula" :enfermedad="item.nombre_enfermedad" :precio="precio"/>
      </div>
    </div>
    <div style="display: flex; justify-content:space-between; margin-top:3%;">
      <div style="display: flex; justify-content:flex-start" >
        <h3 class="campos"> Total: </h3>
        <h3 class="resultados">{{ "S/" + precioTotal}}</h3>
      </div>
      <div style="display: flex; justify-content:flex-start; ">
        <button class="btn-pagar" block @click="$emit('abriertoComprarMedicamentos', false)" >Pagar</button>
      <div style="margin-left:4%"></div>
        <button class="btn-volver" block @click="$emit('abriertoComprarMedicamentos', false)" >Volver</button>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import CardVentaMedicamento from "@/components/ComprarMedicamentos/CardVentaMedicamento.vue";
export default {
  name: "CardComprarMedicamento",
  props: ["cita"],
  components: {
    CardVentaMedicamento
  },
  data() {
    return {
      listaDiagnosticos: [],
      acto_medico: {},
      precio: "20",
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
  computed:{
    precioTotal : function () {
      var preciototal = 0;
      for(var i = 0; i < this.listaDiagnosticos.length; i++){
        for(var j = 0; j < this.listaDiagnosticos[i].prescripcion.length; j++){
          preciototal += 20;
        }
      }
      return preciototal;
    }
  }
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
.header-logo {
  display: flex;
  margin: 1%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: $blue !important;
}
.campos {
  color: $blue !important; 
  font-weight: normal !important;
}
.resultados{
  color: $black !important;
  font-weight: normal !important;
  padding-left: 10%;
}
.btn-pagar {
  background: $green;
  color: white;
  border-radius: 10px;
  width: 9vh;
  height: 3.5vh;
  font-weight: bold;
  font-size: 15px;
}
.btn-volver {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 9vh;
  height: 3.5vh;
  font-weight: bold;
  font-size: 15px;
}
</style>
