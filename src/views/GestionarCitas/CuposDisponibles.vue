<template>
  <div class="main">
    <ComponenteBusqueda :especialidad="this.$route.params.selectEspecialidad" />
    <h1>MÉDICOS DISPONIBLES</h1>
    <div v-for="turno in turnos" :key="turno.id">
      <CardTurno :turno="turno" />
    </div>
  </div>
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
  }),

  async created() {    
    this.obtenerCupos();
  },
  methods: {
    async obtenerCupos() {
      this.selectEspecialidad = this.$route.params.selectEspecialidad;
      this.selectDate = new Date()
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//gi, "-");
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
            if(this.cupos.length > 0 ){
                this.turnos.push(x.data[i]);
            }
          }
          console.log(this.cupos);
          console.log(this.turnos);
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
  padding: 1%;
  background: $sky-light;
  h1 {
    margin-top: 2%;
    padding: 0;
    font-size: 1.5em;
  }
}


</style>
