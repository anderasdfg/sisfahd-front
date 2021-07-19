<template>
  <div class="card">
   <Cardcito :datos="this.datosCitasAgendadas"/>
   <Cardcito :datos="this.datosPagadas"/>   
   <Cardcito :datos="this.datosCitasAtendidas"/>
   <Cardcito :datos="this.ingresosDia"/> 
  </div>  
</template>

<script>
import Cardcito from '../components/ComponentesDashboard/Cardcito.vue';
import axios from 'axios';
import moment from "moment";
import "moment/locale/es";

export default {
  name: "CardCitas",
  components: {
    Cardcito,
  },
  data: () => ({
    hoy: moment().format("L").replaceAll('/', '-'),  
    fecha: "",
    cantidadCitas: 0,
    cantidadPagadas: 0,
    cantidadAtenciones: 0,    
    montoPagado: 0,
    datosCitasAgendadas: {
        titulo: "Citas agendadas",
        cantidad: "0",
        imagen: "https://image.flaticon.com/icons/png/64/2750/2750674.png",
        color: "#A2DBFA"
    },
    datosPagadas: {
        titulo: "Citas pagadas",
        cantidad: "0",
        imagen: "https://image.flaticon.com/icons/png/64/1041/1041882.png",
        color: "#A2DBFA"
    },
     datosCitasAtendidas: {
        titulo: "Citas atendidas",
        cantidad: "0",
        imagen: "https://image.flaticon.com/icons/png/64/2750/2750759.png",
        color: "#A2DBFA"
    }, 
    ingresosDia: {
        titulo: "Ingresos del día",
        cantidad: "0",
        imagen: "https://image.flaticon.com/icons/png/64/1041/1041872.png",
        color: "#A2DBFA"
    },   
  }),
  async created() {      
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();    
    await this.obtenerCitasDelDia(this.fecha);
  },
  methods: {
     
     async obtenerCitasDelDia(fecha) {
       await axios
        .get(`/Cita/citafecha?fecha=${fecha}`)
        .then(async (res) => {
           console.log(res.data);
           for(var i in res.data) {
             this.cantidadCitas++;
             console.log(i);
             if (res.data[i].estado_atencion == 'atendido'){
                this.cantidadAtenciones++;
             }
             if (res.data[i].estado_pago == 'pagado'){
                this.cantidadPagadas++;
                this.montoPagado += res.data[i].precio_neto;
             }
           }
        })
        .catch((err) => console.log(err));
         this.datosCitasAgendadas.cantidad = this.cantidadCitas;
         this.datosPagadas.cantidad = this.cantidadPagadas;
         this.datosCitasAtendidas.cantidad = this.cantidadAtenciones;
         this.ingresosDia.cantidad = `S/. ${this.montoPagado}`
     }
  },
};
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 3%;
}
</style>

