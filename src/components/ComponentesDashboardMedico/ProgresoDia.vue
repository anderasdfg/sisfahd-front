<template>
  <v-card elevation="3" class="card-progreso">
    <h3 class="title-h3">Progreso de atenciones</h3>
    <div class="progreso">
      <v-progress-circular
      :rotate="360"
      :size="200"
      :width="20"
      :value="value"
      color="green"
    >
      {{cantidadAtenciones}} /{{cantidadCitas}} 
    </v-progress-circular>    
    </div>    
  </v-card>
</template>

<script>
import Cardcito from "@/components/ComponentesDashboard/Cardcito.vue";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";

export default {
  name: "ProgresoDia",
  components: {
    Cardcito,
  },
  props: ["user"],
  data: () => ({
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",
    cantidadCitas: 0,
    cantidadPagadas: 0,
    cantidadAtenciones: 0,
    montoPagado: 0,
    value: 50,    
    medico: {},
    citasMedico: [],
    
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    await this.getInfoMedico(this.user.id);
    await this.obtenerCitasDelDia(this.medico.id, this.fecha);
  },
  methods: {
    async getInfoMedico(idUsuario) {              
      await axios      
        .get(`/Medico/medicodatos/${idUsuario}`)        
        .then(async (x) => {
          this.medico = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerCitasDelDia(idMedico, fecha) {     
      await axios
        .get(`/Cita/listacitasmedicofecha?medico=${idMedico}&fecha=${fecha}`)
        .then(async (res) => {  
            console.log(res.data);
          this.citasMedico = res.data;
          for (var i in res.data) {
            this.cantidadCitas++;            
            if (res.data[i].estado_atencion == "atendido") {
              this.cantidadAtenciones++;
            }
          }
        })
        .catch((err) => console.log(err));
        this.value = (this.cantidadAtenciones/this.cantidadCitas)*100;     
    },
  },
};
</script>

<style lang="scss" scoped>
.card-progreso {
  border-radius: 20px !important;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.title-h3 {
  margin: 2% 2%;
}
.progreso {
  margin: 3% 0;
}
</style>

