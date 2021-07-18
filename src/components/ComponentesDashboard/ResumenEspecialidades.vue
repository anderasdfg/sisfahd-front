<template>
  <div class="content">
    <h2 class="esp">Especialidades más solicitadas</h2>
    <div v-for="especialidad in especialidades" :key="especialidad._id">  
        <CardEspecialidadMasPedida class="content-item" :especialidad="especialidad"/>  
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardEspecialidadMasPedida from "@/components/ComponentesDashboard/CardEspecialidadMasPedida.vue";

export default {
  name: "Especialidades",
  components: {
    CardEspecialidadMasPedida,
  },
  data: () => ({
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",    
    especialidades: [],
    
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    await this.obtenerEspecialidadesDelDia(this.fecha);
  },
  methods: {
    async obtenerEspecialidadesDelDia(fecha) {
        console.log("especialidaes");
        console.log(fecha);
      await axios
        .get(`/Estadistica/especialidadespedidas?fecha=${fecha}`)
        .then(async (res) => {          
          this.especialidades = res.data;      
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 1%;
  //margin-left: 40px;
}
.esp {
  //margin-left: 40px;
  margin-bottom: 3%;
}
.content-item {
  width: 450px;
  //margin-left: 40px;
}
</style>