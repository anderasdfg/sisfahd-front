<template>
  <div class="content">
    <div style="margin-top:2%; margin-left: 3%; margin-right: 3%">
        <div style="display: flex; justify-content:space-between; padding-top:2%;">
            <h3 class="resultadosb">{{this.examen.nombre}}</h3>
            <button>
              <v-icon color="#4172F2" @click="remove(examen)">mdi-trash-can-outline</v-icon>
            </button>
        </div>
        
        <div style="display: flex; justify-content:flex-start; margin-top:2%;">
            <h4 class="campos"> Recetado para:  </h4>
            <h4 class="resultados"> {{this.examen.enfermedad}} </h4>
        </div>
        <div style="display: flex; justify-content:flex-end; margin-top:2%;">
            <h3 class="campos"> Precio:  </h3>
            <h3 class="resultados"> {{ "S/." + this.examen.precio}} </h3>
        </div>
        
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardItemExamen",
  props: ["examen"],
  
  data() {
    return {        
        
    };
  },

  methods: {
    ...mapActions(["deleteExamen"]),
    remove(value) {
        console.log(value);
        this.deleteExamen(value);
    }
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