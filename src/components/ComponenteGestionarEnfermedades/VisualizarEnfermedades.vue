<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Enfermedad</v-card-title>

    <div class="container-Enfermedad">
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          label="Codigo"
          class="campos"
          v-model="Enfermedad.codigo_cie"
          readonly
        ></v-text-field>
        <v-text-field
          label="Descripcion"
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
export default {
  name: "VisualizarEnfermedades",
  props: ["Enfermedad"],
  data() {
    return {
      step: 1,

      enfermedad: {
        codigo_cie: "",
        descripcion: "",
      },
    };
  },

  methods: {
    async obtenerEnfermedades() {      
      await axios     
        .get("/Enfermedades/Filter/" + this.Enfermedad.codigo_cie, this.Enfermedad.descripcion)
        .then((x) => {
          this.Enfermedad = x.data;
          console.log(this.Enfermedad);
          console.log("sifunca");
        })
        .catch((err) => console.log(err));       
    },    
    cerrarDialogo() {
      this.$emit("close-dialog-visualizar");
      
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
.container-Enfermedad {
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
