<template>
  <div class="content">
    <div style="margin-top:2%; margin-left: 3%; margin-right: 3%">
        <div style="display: flex; justify-content:space-between; padding-top:2%;">
            <h3 class="resultadosb"> {{this.nombre}}</h3>
            <button @click="abrirModalPrescripcion(item)">
              <v-icon color="#4172F2">mdi-trash-can-outline</v-icon>
            </button>
        </div>
        <div style="display: flex; justify-content:flex-start; margin-top:2%;">
            <div style="display: flex; justify-content:flex-start; width: 47%;" >
                <h3 class="campos"> Concentración:</h3>
                <h3 class="resultados"> {{ this.concentracion }}</h3>
            </div>
            <div style="display: flex; justify-content:flex-start; width: 47%;">
                <h3 class="campos"> Formula farmacéutica:</h3>
                <h3 class="resultados"> {{ this.formula }}</h3>
            </div>
        </div>
        <div style="display: flex; justify-content:flex-start; margin-top:2%;">
            <h3 class="campos"> Recetado para:  </h3>
            <h3 class="resultados"> {{ this.enfermedad }} </h3>
        </div>
        <div style="display: flex; justify-content:flex-end; margin-top:2%;">
            <h3 class="campos"> Precio:  </h3>
            <h3 class="resultados"> {{ "S/" + this.precio}} </h3>
        </div>
        
    </div>
  </div>
</template>

<script>
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import axios from "axios";
export default {
  name: "CardCita",
  props: ["nombre","concentracion","formula","enfermedad","precio"],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.content {
  background: rgb(224, 238, 255);
  width: 100%;
  color: black;
  align-self: center;
  border-radius: 10px;
  height: 18vh;
  align-items: center;

}
.campos {
  color: $blue !important; 
  font-weight: normal !important;
}
.resultados{
  color: $black !important;
  font-weight: normal !important;
  padding-left: 2%;
}
.resultadosb{
  color: $black !important;
  font-weight: normal !important;
}
</style>