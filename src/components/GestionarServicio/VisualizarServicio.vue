<template>
  <v-card>
    <v-card-title class="justify-center">Visualizar Especialidad</v-card-title>

    <div class="container-Especialidad">
      <v-divider></v-divider>

      <v-card-text>
        <v-text-field
          label="titulo"
          class="campos"
          v-model="Servicio2.titulo"
          readonly
        ></v-text-field>
        <v-text-field
          label="monto"
          class="campos"
          v-model="Servicio2.descripcion"
          readonly
        ></v-text-field>

        <v-text-field
          label="monto"
          class="campos"
          v-model="Servicio2.monto"
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
                :src="Servicio2.url"
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
import { required } from "vuelidate/lib/validators";
export default {
  name: "VisualizarEspecialidad",
  props: ["Servicio2"],
  data() {
    return {
      step: 1,

      Servicio2: {
        titulo: "",
        monto: "",
        monto: "",
        url: "",
      },
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
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
    async obtenerServicio() {
      await axios
        .get("/Adicionales/Titulo?titulo=" + this.Servicio.titulo)
        .then((x) => {
          this.Servicio2 = x.data;
          console.log(this.Servicio2);
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
