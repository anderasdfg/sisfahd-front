<template>
  <v-card elevation="3" class="card">
    <div class="div_reservar">
      <button class="button-cita" @click="openDialogReservarCita()">
        <img
          src="https://i.ibb.co/pwxtswn/icon-calendar.png"
          alt="calendario"
        />
        Reservar cita
      </button>
    </div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogReservarCita"
      max-width="700px"
    >
      <ReservarCita
        @emit-close-dialog="closeDialogReservarCita()"
      ></ReservarCita>
    </v-dialog>
    <h2>CITAS AGENDADAS</h2>
  </v-card>
</template>

<script>
import ReservarCita from "@/components/GestionarCitas/ReservarCita.vue";
export default {
  name: "CardCitas",
  components: {
    ReservarCita,
  },
  data: () => ({
    dialogReservarCita: false,
  }),
  methods: {
    openDialogReservarCita() {
      this.dialogReservarCita = true;
    },
    closeDialogReservarCita() {
      this.dialogReservarCita = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1%;
  border-radius: 20px;
}
.button-cita {
  background: rgb(58, 123, 213);
  background: linear-gradient(
    0deg,
    rgba(58, 123, 213, 1) 0%,
    rgba(86, 146, 230, 1) 100%
  );
  width: 50vh;
  color: white;
  align-self: center;
  border-radius: 20px;
  height: 10vh;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  img {
    padding: 0 5% 0 5%;
  }
}

h2 {
  font-size: 18px;
  margin-top: 5%;
}

.div_reservar {
  display: flex;
}
</style>

