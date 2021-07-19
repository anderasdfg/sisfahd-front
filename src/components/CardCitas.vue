<template>
  <v-card elevation="3" class="card">
    <div class="div_reservar">
      <button class="button-cita" @click="reservarCita()">
        <img
          src="https://i.ibb.co/pwxtswn/icon-calendar.png"
          alt="calendario"
        />
        Reservar cita
      </button>
    </div>
    <div>
      <h2>Citas del día</h2>
      <div v-for="citaItem in listaCitas" :key="citaItem.id">
        <CardCita :cita="citaItem" class="item-cita" />
      </div>
      <div v-if="listaCitas == []" class="item-cita">
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"          
        >
          No has reservado citas el día de hoy
        </v-alert>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import "moment/locale/es";
import CardCita from "@/components/GestionarCitas/CardCita.vue";
export default {
  name: "CardCitas",
  components: {
    CardCita,
  },
  props: ["user"],
  data: () => ({
    dialogReservarCita: false,
    listaCitas: [],
    hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",
  }),
  async created() {
    this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
    this.obtenerCitas();
  },
  methods: {
    openDialogReservarCita() {
      this.dialogReservarCita = true;
    },
    closeDialogReservarCita() {
      this.dialogReservarCita = false;
    },
    reservarCita() {
      this.$router.push(`especialidades`);
    },
    async obtenerCitas() {
      var idUsuario = this.user.id;
      await axios
        .get(`/Paciente/usuario?idusuario=${idUsuario}`)
        .then(async (res) => {
          var paciente = {};
          paciente = res.data;
          await axios
            .get(
              `/Cita/citafechapaciente?fecha=${this.fecha}&idPaciente=${paciente.id}`
            )
            .then((res) => {
              var info = {};
              info = res.data;
              console.log("citas");
              console.log(info);
              for (var x = 0; x < res.data.length; x++) {
                var fecha = res.data[x].fecha_cita;
                info[x].fecha_cita = fecha.split("T")[0];
                info[x].turno.hora_inicio = fecha.split("T")[1].substr(0, 5);
              }
              for (var y = 0; y < info.length; y++) {
                if ((info[y].fecha_cita = this.hoy)) {
                  this.listaCitas.push(info[y]);
                }
              }
              console.log(this.listaCitas);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
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
    padding: 2% 5% 0 5%;
  }
}

h2 {
  font-size: 18px;
  margin-top: 5%;
}

.div_reservar {
  display: flex;
}
.item-cita {
  margin: 4% 0;
}
</style>

