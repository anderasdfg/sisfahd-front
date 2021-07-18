<template>
  <div class="content">
    <h2 class="esp">Médicos atendiendo</h2>
    <div v-for="turno in turnosConReserva" :key="turno.id">  
        <CardAtencionMedico class="content-item" :turno="turno"/>  
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardAtencionMedico from "@/components/ComponentesDashboard/CardAtencionMedico.vue";

export default {
  name: "Atenciones",
  components: {
    CardAtencionMedico,
  },
  data: () => ({
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",
    cantidadMedicos: 0,
    turnosConReserva: [],
    
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
          for (var i in res.data) {
            this.cantidadMedicos++;
            for (var y in res.data[i].cupos) {
              if (res.data[i].cupos[y].estado == "ocupado") {
                this.cantidadAtenciones++;
                this.turnosConReserva.push(res.data[i]);                
                console.log(this.turnosConReserva);
              }              
            }            
          }
          //filtro de duplicados
          const result = [];
          const uniqueArr = [];
            this.turnosConReserva.forEach((item)=>{                
                if(!uniqueArr.includes(item.id_medico)){
                    uniqueArr.push(item.id_medico);
                    result.push(item);
                }
            })            
            this.turnosConReserva = result;        
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
  margin-left: 40px;
}
.esp {
  margin-left: 40px;
  margin-bottom: 3%;
}
.content-item {
  width: 450px;
 margin-left: 40px;
}
</style>