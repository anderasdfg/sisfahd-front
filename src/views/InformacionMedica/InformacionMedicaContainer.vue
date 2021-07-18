<template>
  <div>
    <v-card elevation="3" outlined class="card">
        <div>
          <InformacionMedicaBody></InformacionMedicaBody>
        </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"
import { mapActions,mapGetters } from "vuex";
import InformacionMedicaBody from "@/views/InformacionMedica/InformacionMedica"
export default {
name: "InformacionMedica",
components: {
  InformacionMedicaBody
},
data(){
    return{
      datosusuario:null,
      paciente: {
        idhistoria: "",
        datospaciente: null,
        antecedentes: null,
      },
      historia:null,
      idusuario:"607f4008cb41a8de70be1df5",
      showInfo: true,
      
    };
},

}
</script>
<style lang="scss" scoped>
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
  color: $blue;
  
}
.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
.titulo{
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo{
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
</style>