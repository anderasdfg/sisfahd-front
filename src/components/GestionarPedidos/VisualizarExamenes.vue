<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Examen </v-card-title>

    <div class="container">
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Descripción"
          class="campos"
          v-model="examen.descripcion"
          readonly
        ></v-text-field>

        <v-text-field
          label="Precio"
          class="campos"
          v-model="examen.precio"
          readonly
        ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="success" elevation="2" block @click="cerrarDialogo"
              >Volver</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "VisualizarExamenAux",
  props: ["examen"],
  data() {
    return {
      especialidad: "",
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async created() {
    await this.loadEspecialidadporID(this.examen.id_especialidad);
  },

  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async loadEspecialidadporID(id) {
      var examen = {};
      await axios
        .get("/Especialidad/Id?id=" + id)
        .then((res) => {
          console.log("dsadsdsds");
          this.especialidad = res.data.nombre;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.container-Especialidad {
  margin: 15px;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.btn-volver {
  margin-top: 4%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>

