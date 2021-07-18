<template>
  <div class="content">
    <h2 class="esp">Médicos atendiendo</h2>    
    <CardAtencionMedico class="content-item"/>    
    <CardAtencionMedico class="content-item"/>    
    <CardAtencionMedico class="content-item"/>    
  </div>
</template>

<script>
import axios from 'axios';
import moment from "moment";
import "moment/locale/es";
import CardAtencionMedico from "@/components/ComponentesDashboard/CardAtencionMedico.vue";

export default {
  name: "Atenciones", 
  components: {    
    CardAtencionMedico
  },  
   data: () => ({
    hoy: moment().format("L").replaceAll('/', '-'),  
    fecha: "",
    cantidadMedicos: 0,
  }),
  async created() {      
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();    
    await this.obtenerMedicosDelDia(this.fecha);
  },
  methods: {
    async obtenerMedicosDelDia(fecha) {
       await axios
        .get(`/Turno/turnosfecha?fecha=${fecha}`)
        .then(async (res) => {
           console.log(res.data);
           for(var i in res.data) {
             this.cantidadMedicos++; 
             if (res.data[i].estado_atencion == 'atendido'){
                this.cantidadAtenciones++;
             }            
           }
           
        })
        .catch((err) => console.log(err));         
     }
  }
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;    
    margin-top: 1%;
   margin-left: 40px;
}
.esp {
    margin-left: 40px;
}
.content-item {
    width: 450px;    
   //margin-left: 40px;
}
</style>