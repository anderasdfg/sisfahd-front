<template>
  <v-card>
     <v-card-title class="justify-center">Visualizar Medicamento</v-card-title>

    <div class="container-Medicamento">
     
          <v-divider></v-divider>

            <v-card-text>
              <v-text-field
                v-model="Medicinas.descripcion"
                label="Descripción"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="Medicinas.generico"
                label="Generico"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="Medicinas.precio"
                label="Precio"
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
  props: ["Medicinas"],
  data() {
    return {
medicina: {
        descripcion: "",
        generico: "",
        precio: "",
      },
    };
  },


  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },
    async obtenerMedicamento() {
      var med = {};
      await axios
        .get("/Medicinas/Id?id=" + id)
        .then((res) => {
          console.log(res);
          med = res.data;
          console.log(med)
        })
        .catch((err) => console.log(err));
      console.log(med);     
      return med;
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
