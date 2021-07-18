<template>
  <div class="content">
    <Cardcito class="carcito" :datos="this.pacientes"/>
    <h2 class="esp">Medicamentos más prescritos</h2>
    <div v-for="medicamento in medicamentos" :key="medicamento._id">  
        <CardMedicamentos class="content-item" :medicamento="medicamento"/>          
    </div>
    <h2 class="esp2">Examenes más ordenados</h2>    
    <div v-for="examen in examenes" :key="examen._id">  
        <CardExamenes class="content-item" :examen="examen"/>          
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardMedicamentos from "@/components/ComponentesDashboard/CardMedicamentos.vue";
import CardExamenes from "@/components/ComponentesDashboard/CardExamenes.vue";
import Cardcito from '@/components/ComponentesDashboard/Cardcito.vue';


export default {
  name: "Diagnosticos",
  components: {    
    CardExamenes,
    CardMedicamentos, 
    Cardcito
  },
  data: () => ({
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",    
    medicamentos: [],
    examenes: [],
    pacientes: {
        titulo: "Pacientes nuevos",
        cantidad: "0",
        imagen: "https://image.flaticon.com/icons/png/64/2750/2750657.png",
        color: "#A2DBFA"
    },
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    await this.obtenerMedicamentosPedidos(this.fecha);
    await this.obtenerExamenesPedidos(this.fecha);
  },
  methods: {
    async obtenerMedicamentosPedidos(fecha) {        
      await axios
        .get(`/Estadistica/medicamentospedidos?fecha=${fecha}`)
        .then(async (res) => {          
          this.medicamentos = res.data;      
        })
        .catch((err) => console.log(err));
    },
    async obtenerExamenesPedidos(fecha) {        
      await axios
        .get(`/Estadistica/laboratoriopedidos?fecha=${fecha}`)
        .then(async (res) => {          
          this.examenes = res.data;      
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
.esp2 {
  margin-top: 2%;
  margin-bottom: 3%;
  //margin-left: 40px;
}
.content-item {
  width: 450px;
  //margin-left: 40px;
}
.carcito {
  width: 450px;
  padding: 4%;
  //@include flex-center;
  margin-bottom: 1%;
}
</style>