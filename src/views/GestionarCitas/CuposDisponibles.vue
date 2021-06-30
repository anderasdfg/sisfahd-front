<template>
  <v-app>
    <div class="main">
      <ComponenteBusqueda
        :especialidad="this.$route.params.selectEspecialidad"
        @getFecha="obtenerCupos"
      />
      <h1>MÉDICOS DISPONIBLES</h1>
      <div class="container-turnos">
        <div v-for="turno in turnos" :key="turno.id" class="item">
          <CardTurno :turno="turno" />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import CardTurno from "@/components/GestionarCitas/CardTurno.vue";
import ComponenteBusqueda from "@/components/GestionarCitas/ComponenteBusqueda.vue";

export default {
  name: "CuposDisponibles",
  components: {
    CardTurno,
    ComponenteBusqueda,
  },
  data: () => ({
    selectEspecialidad: "",
    selectDate: "",
    cupos: [],
    turnos: [],
    medico: "",
    hoy: new Date()
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//gi, "-"),
  }),

  async created() {
    this.obtenerCupos(this.hoy);
  },
  methods: {
    async obtenerCupos(fecha) {
      console.log(fecha);
      this.cupos = [];
      this.turnos = [];
      this.selectEspecialidad = this.$route.params.selectEspecialidad;
      this.selectDate = fecha;

      await axios
        .get(
          `/Turno/turnos?idEspecialidad=${this.selectEspecialidad}&fecha=${this.selectDate}`
        )
        .then((x) => {
          for (var i = 0; i < x.data.length; i++) {
            for (var y = 0; y < x.data[i].cupos.length; y++) {
              var cupo = {
                estado: x.data[i].cupos[y].estado,
                hora_inicio: x.data[i].cupos[y].hora_inicio,
              };

              var hoy = new Date();
              var fechaCupo = new Date(cupo.hora_inicio);
              fechaCupo = fechaCupo.setHours(fechaCupo.getHours() + 5);

              if (cupo.estado == "disponible" && fechaCupo > hoy.getTime()) {
                this.cupos.push(cupo);
              }
            }
            if (this.cupos.length > 0) {
              this.turnos.push(x.data[i]);
            }
          }

        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/main.scss";
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1%;
  background: $sky-light;
  h1 {
    margin-top: 2%;
    padding: 0;
    font-size: 1.5em;
  }
  .container-turnos {
    display: flex;
    flex-direction: row;

    .item {
      margin-right: 1%;
    }
  }
}
</style>
