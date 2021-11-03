<template>
  <v-card>
    <h1 class="title-card">Detalles Tarifas</h1>
    <div class="estilo-stepper">
      <v-card-text>
        <v-text-field
          label="Codigo"
          class="campos"
          v-model="Enfermedad.codigo_cie"
          readonly
        ></v-text-field>
        <v-text-field
          label="descripcion"
          class="campos"
          v-model="Enfermedad.descripcion"
          readonly
        ></v-text-field>

        <v-row class="filas">
          <v-col align="right">
            <button class="btn-volver" block @click="cerrarDialogo">
              Volver
            </button>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  name: "VisualizarEnfermedad",
  props: ["Enfermedad"],
  data() {
    return {
    };
  },

  
  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-visualizar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
    async obtenerEnfermedad() {
      console.log("ENFERMEDAD"+this.Enfermedad);
      
      await axios
        .get("Enfermedades/Id?id=" + id)
        .then((x) => {
          this.Enfermedad = x.data;
          console.log("ENFERMEDADES"+this.Enfermedad);
        })
        .catch((err) => console.log(err));
    },
  },
  /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
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
