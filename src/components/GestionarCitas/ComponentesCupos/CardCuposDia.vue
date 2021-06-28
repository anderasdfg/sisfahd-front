<template>
  <div class="main items">
    <div v-for="cupo in cupos" :key="cupo.hora_inicio">
      <button class="item" @click="reserva(cupo)">
        {{ cupo.hora_inicio.split("T")[1].substr(0, 5) }}
      </button>
    </div>
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
import Reservar from "../Reservar.vue";
export default {
  name: "CardCuposDia",
  props: ["cupos", "usuario"],
  components: {
    Reservar,
  },
  data() {
    return {
      selectedOpen: false,
      cargaReserva: false,
      cupo: [],
      paciente: {},
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
    };
  },
  methods: {
    async reserva(cupo) {
      this.cupo = cupo;
      if (this.usuario) {
        console.log("asfdsfdskj");
        await this.registrarCita();
      } else {
        this.selectedOpen = true;
      }
    },
    async registrarCita() {
      console.log(this.cupo);

      var fechacita = Date.parse(this.cupo.hora_inicio);
      fechacita = new Date(fechacita);

      var fechaFormateadaInicio = new Date(
        fechacita.setMinutes(fechacita.getMinutes() - 300)
      );
      // var fechaFormateadaFin = new Date(
      //   this.cupos.hora_inicio.setMinutes(
      //     this.cupos.hora_inicio.getMinutes() - 300
      //   )
      // );

      var hoy = new Date();
      var fecha_reserva = new Date(hoy.setMinutes(hoy.getMinutes() - 300));

      //agregarlo antes de la cita
      this.obtenerPaciente(this.usuario);

      this.cita.fecha_cita = fechaFormateadaInicio;
      this.cita.id_paciente = this.paciente.id;
      this.cita.enlace_cita = `https://meet.jit.si/${
        this.paciente.id
      }${hoy.getMinutes()}`;
      this.cita.precio_neto = this.cupo.precio;
      this.cita.id_turno = this.cupo.id_turno;
      this.cita.fecha_cita_fin = fechaFormateadaInicio; //cambiar aquí
      this.cita.fecha_reserva = fecha_reserva;
      this.cita.id_medico = this.cupo.id_medico;

      console.log("cita");
      console.log(this.cita);
      // await axios
      //   .post("/Cita/cita", this.cita)
      //   .then((y) => {
      //     this.cita = y.data;
      //     this.cargaRegistro = false;
      //     this.realizarPago(this.cita.id);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    async obtenerPaciente(usuario) {
      console.log("usuario");
      console.log(usuario.id);
      await axios
        .get(`/Paciente/usuario?idusuario=${usuario.id}`)
        .then((y) => {
          this.paciente = y.data;
          console.log("fsdfdsfsdfjk");
          console.log(y.data);          
        })
        .catch((err) => {
          console.log(err);
        });
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