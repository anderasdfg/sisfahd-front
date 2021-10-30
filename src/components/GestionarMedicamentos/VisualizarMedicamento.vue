<template>
  <v-card>
     <v-card-title class="justify-center">Visualizar Medicamento</v-card-title>

    <div class="container-Medicamento">
     
          <v-divider></v-divider>

            <v-card-text>
              <v-text-field
                label="nombre"
                class="campos"
                v-model="medicamentos.nombre"
                readonly
              ></v-text-field>
              <v-text-field
                label="concentracion"
                class="campos"
                v-model="medicamentos.concentracion"
                readonly
              ></v-text-field>

              <v-text-field
                label="presentacion"
                class="campos"
                v-model="medicamentos.presentacion"
                readonly
              ></v-text-field>

              <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3;">
                <v-row>
                  <v-col> </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-img
                      style="display:block"
                      height="170"
                      width="170"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>

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

      medicamento: {
        nombre: "",
        concentracion: "",
        presentacion: "",
      },
    };
  },


  methods: {
    cerrarDialogo() {
      this.$emit("close-dialog-detalle");
    },
    async obtenerMedicamento() {
      await axios
        .get("/Medicamento/Nombre/" + this.medicamento.nombre)
        .then((x) => {
          this.medicamento = x.data;
          console.log(this.medicamento);
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
