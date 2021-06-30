<template>
  <div class="main items">
    <div v-for="cupo in cupos" :key="cupo.hora_inicio">
      <button class="item" @click="reserva(cupo)">
        {{ cupo.hora_inicio.split("T")[1].substr(0, 5) }}
      </button>
    </div>
     <v-dialog width="450px" v-model="cargaReserva" persistent>
      <Loader :titulo="this.tituloLoader" :mensaje="this.mensajeLoader" />
    </v-dialog>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="selectedOpen"
      max-width="700px"
    >
      <!-- Componente de reserva -->
      <Reservar :cupos="cupo" />
    </v-dialog>
   
  </div>  
</template>

<script>
import axios from "axios";
import moment from 'moment'; 

import Reservar from "../Reservar.vue";
import Loader from "../../Elementos/Loader.vue"
export default {
  name: "CardCuposDia",
  props: ["cupos", "usuario"],
  components: {
    Reservar,
    Loader,
  },
  data() {
    return {
      selectedOpen: false,
      cargaReserva: false,
      tituloLoader: "Reservando cita",
      mensajeLoader: "En unos momentos terminamos...",
      cupo: [],
      paciente: {},
      fechacita: "",
      cita: {
        estado_atencion: "no atendido",
        estado_pago: "no pagado",
        fecha_cita: "",
        fecha_pago: null,
        fecha_reserva: "",
        id_paciente: "",
        enlace_cita: "",
        precio_neto: 0,
        calificacion: 0,
        observaciones: [],
        tipo_pago: "",
        id_turno: "",
        id_acto_medico: "",
        fecha_cita_fin: "",
        motivo_consulta: "",
        id_medico: "",        
      },
      fechaFormateadaInicio: "",
    };
  },
  methods: {
    async reserva(cupo) {
      this.cupo = cupo;
      if (this.usuario) {        
        await this.registrarCita(cupo);
      } else {
        this.selectedOpen = true;
      }
    },
    async registrarCita(cupo) {
      this.cargaReserva = false;
         
      var hoy = new Date();
      var fechaFin = moment(cupo.hora_inicio).add(cupo.ratio, 'minutes').format("YYYY-MM-DDTHH:mm:ss");
       
      this.cita.fecha_cita = cupo.hora_inicio
      this.cita.precio_neto = cupo.precio;
      this.cita.id_turno = cupo.id_turno;
      this.cita.fecha_cita_fin = fechaFin;
      this.cita.fecha_reserva = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();
      this.cita.id_medico = cupo.id_medico;

      await axios
        .get(`/Paciente/usuario?idusuario=${this.usuario.id}`)
        .then(async (y) => {
          this.paciente = y.data;
          this.cita.id_paciente = this.paciente.id;
          this.cita.enlace_cita = `https://meet.jit.si/${
            this.paciente.id
          }${hoy.getMinutes()}`;
          console.log("cita");
          console.log(this.cita);
          await axios
            .post("/Cita/cita", this.cita)
            .then((x) => {
              this.cita = x.data;
              this.cargaReserva = false;
              this.realizarPago(this.cita.id);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    realizarPago(idCita) {
      this.$router.push({ name: "Pago", params: { idCita: idCita } });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-center;

  .items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10% 1.5%;
    .item {
      margin: 1rem 0.4rem;
      background: $sky-blue;
      width: 8rem;
      height: 2.4rem;
      border-radius: 1rem;
      font-size: 1.2rem;
      align-self: center;
      box-shadow: 0.14rem 0.14rem 0.14rem #999;
    }
  }
}

.card {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.card-detallecita {
  padding: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .card-detallecita_left {
    display: flex;
    flex-direction: column;
    h1 {
      color: $blue;
      font-size: 20px !important;
      font-weight: normal;
    }
    h3 {
      color: $blue;
      font-size: 15px !important;
      font-weight: normal;
      margin-bottom: 2%;
    }
  }
  .card-detallecita_right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-medico {
    width: 50%;
    height: 100%;
    border-radius: 50%;
    margin: 0 0 3% 0;
  }
  .stars-bottom {
    width: 25%;
    height: 10%;
    padding: 0 0 1% 0;
  }
}
.card-datoscupo {
  display: flex;
  flex-direction: row;
  .card-datocupo {
    border-radius: 6px;
    background: $sky-blue;
    color: $black;
    font-size: 18px;
    width: 20%;
    text-align: center;
    margin: 1%;
  }
}
.button-reservar {
  margin: 1%;
  background: $blue;
  color: $white;
  text-align: center;
  border-radius: 6px !important;
  width: 42%;
  height: 5vh;
}
</style>