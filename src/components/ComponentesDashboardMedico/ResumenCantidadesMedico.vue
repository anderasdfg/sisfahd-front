<template>
  <div class="card-cantidades">
     
      <Cardcito :datos="this.datosCitasAgendadas" class="item-card"/>
      <Cardcito :datos="this.datosPagadas" class="item-card"/>
      <Cardcito :datos="this.datosCitasAtendidas" class="item-card"/>
      <Cardcito :datos="this.ingresosDia" class="item-card"/>
    
  </div>
</template>

<script>
import Cardcito from "@/components/ComponentesDashboard/Cardcito.vue";
import axios from "axios";
import moment from "moment";
import "moment/locale/es";

export default {
  name: "ResumenCantidadesMedico",
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
    value: 70,
    datosCitasAgendadas: {
      titulo: "Citas agendadas",
      cantidad: "0",
      imagen: "https://image.flaticon.com/icons/png/64/2750/2750674.png",
      color: "#A2DBFA",
    },
    datosPagadas: {
      titulo: "Citas pagadas",
      cantidad: "0",
      imagen: "https://image.flaticon.com/icons/png/64/1041/1041882.png",
      color: "#A2DBFA",
    },
    datosCitasAtendidas: {
      titulo: "Citas atendidas",
      cantidad: "0",
      imagen: "https://image.flaticon.com/icons/png/64/2750/2750759.png",
      color: "#A2DBFA",
    },
    ingresosDia: {
      titulo: "Ingresos del día",
      cantidad: "0",
      imagen: "https://image.flaticon.com/icons/png/64/1041/1041872.png",
      color: "#A2DBFA",
    },
    medico: {},
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();    
    await this.getInfoMedico(this.user.id);
    await this.obtenerCitasDelDia(this.fecha, this.medico.id);
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
    async obtenerCitasDelDia(fecha,idMedico) {
      await axios
        .get(`/Cita/listacitasmedicofecha?fecha=${fecha}&medico=${idMedico}`)
        .then(async (res) => {
          console.log(res.data);
          for (var i in res.data) {
            this.cantidadCitas++;
            console.log(i);
            if (res.data[i].estado_atencion == "atendido" || res.data[i].estado_atencion == "evaluada") {
              this.cantidadAtenciones++;
            }
            if (res.data[i].estado_pago == "pagado") {
              this.cantidadPagadas++;
              this.montoPagado += res.data[i].precio_neto;
            }
          }
        })
        .catch((err) => console.log(err));
      this.datosCitasAgendadas.cantidad = this.cantidadCitas;
      this.datosPagadas.cantidad = this.cantidadPagadas;
      this.datosCitasAtendidas.cantidad = this.cantidadAtenciones;
      this.ingresosDia.cantidad = `S/. ${this.montoPagado}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-cantidades {
  display: flex;
  justify-content: space-around;
  flex-direction: column;  
  height: 80vh;  
  margin-top: 6%;
}
.item-card {
    height: 15vh;
    align-items: center;
    padding-left: 5%;
}

</style>

