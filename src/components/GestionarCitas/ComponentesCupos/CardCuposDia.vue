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
import Reservar from "../Reservar.vue";
export default {
  name: "CardCuposDia",
  props: ["cupos"],
  components: {
    Reservar,
  },
  data() {
    return {
      selectedOpen: false,
      cargaReserva: false,
      cupo: []
    };
  },
  methods: {
    registrarCita() {
      console.log("hola");
    },
    reserva(cupo) {
      this.cupo = cupo;
      this.selectedOpen = true;
      console.log("ghdkgfdskl");
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