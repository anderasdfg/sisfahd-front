<template>
  <v-card elevation="3" class="card-i">
    <div>
      <h2>CITAS DEL DÍA</h2>
      <div v-for="citaItem in listaCitas" :key="citaItem.id">
        <CardCitaMedico :cita="citaItem" class="item-cita" />
      </div>
      <div v-if="listaCitas.length == 0" class="item-cita">
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No tienes reservas el día de hoy
        </v-alert>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardCitaMedico from "@/components/ComponentesDashboardMedico/CardCitaMedico.vue";
export default {
  name: "CardCitas",
  components: {
    CardCitaMedico,
  },
  props: ["user"],
  data: () => ({
    listaCitas: [],
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",
    medico: {}
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    await this.obtenerMedico(this.user.id);
    await this.obtenerCitas(this.medico.id, this.fecha);
  },
  methods: {
    openDialogReservarCita() {
      this.dialogReservarCita = true;
    },
    closeDialogReservarCita() {
      this.dialogReservarCita = false;
    },
    async obtenerMedico(idUsuario) {
      await axios
        .get(`/Medico/medicodatos/${idUsuario}`)
        .then(async (res) => {
          this.medico = res.data;

        })
        .catch((err) => console.log(err));
    },
    async obtenerCitas(idMedico, hoy) {      
      await axios
        .get(`/Cita/listacitasmedicofecha?medico=${idMedico}&fecha=${hoy}`)
        .then(async (res) => {          
          this.listaCitas = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.card-i {
  padding: 2% 1%;
  border-radius: 20px;
  width: 100%;
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
    padding: 2% 5% 0 5%;
  }
}

h2 {
  font-size: 18px;
  margin-top: 5%;
}

.item-cita {
  margin: 4% 0;
}
</style>

