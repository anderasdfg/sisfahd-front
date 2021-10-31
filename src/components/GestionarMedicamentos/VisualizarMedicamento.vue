<template>
  <v-card>
     <v-card-title class="justify-center">Visualizar Medicamento</v-card-title>

    <div class="container-Medicamento">
     
          <v-divider></v-divider>

            <v-card-text>
              <v-text-field
                label="Descripción"
                class="campos"
                v-model="medicina.descripcion"
                readonly
              ></v-text-field>
              <v-text-field
                label="Generico"
                class="campos"
                v-model="medicina.generico"
                readonly
              ></v-text-field>

              <v-text-field
                label="presentacion"
                class="campos"
                v-model="medicina.precio"
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
  name: "VisualizarMedicamento",
  data() {
    return {
      step: 1,

medicina: {
        descripcion: "",
        generico: "",
        precio: 0,
      },
    };
  },


  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },
    async obtenerMedicamento() {
      await axios
        .get("/Medicinas/Filter/" + this.medicina.descripcion)
        .then((x) => {
          this.medicina = x.data;
          console.log(this.medicina);
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
.container-Medicamento {
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
