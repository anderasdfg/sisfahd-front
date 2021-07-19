<template>
  <v-card elevation="3" class="card-home">
    <div class="prescripciones">
      <h3>PRESCRIPCIONES</h3>
      <template v-if="hasPrescrion"> hola </template>
      <template v-else>
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"
          
        >
          No tiene prescripciones
        </v-alert>
      </template>
    </div>
    <div class="ordenes">
      <h3>ÓRDENES</h3>
      <template v-if="hasOrdenes"> hola </template>
      <template v-else>
        <v-alert
          text
          outlined
          border="left"
          color="#3C5186"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No tiene órdenes asignadas
        </v-alert>
      </template>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardPrescripcionesExamenes",
  props: ["user"],
  data() {
    return {
      hasPrescrion: false,
      hasExamenes: false,
    };
  },
  async created() {
    this.getFechaNacimiento();
  },
  methods: {
    verHistoria(idUsuario) {
      //console.log(idUsuario);
      this.$router.push({
        name: "VisualizarHCI",
        params: { idUsuario: idUsuario },
      });
    },
    verInformacionMedica() {
      this.$router.push({ name: "InformacionMedica" });
    },
    getFechaNacimiento() {
      if (this.user != null) {
        this.fechaNacimiento = new Date(this.user.datos.fecha_nacimiento)
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//gi, "-");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-home {
  padding: 2% 2%;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 1%;
  }
}
</style>
