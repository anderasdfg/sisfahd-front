<template>
  <v-card>
     <v-card-title class="justify-center">Visualizar Especialidad</v-card-title>

    <div class="container-Especialidad">
     
          <v-divider></v-divider>
       
      
       
            <v-card-text>
              <v-text-field
                label="nombre"
                class="campos"
                v-model="Especialidad2.nombre"
                readonly
              ></v-text-field>
              <v-text-field
                label="codigo"
                class="campos"
                v-model="Especialidad2.codigo"
                readonly
              ></v-text-field>

              <v-text-field
                label="estado"
                class="campos"
                v-model="Especialidad2.estado"
                readonly
              ></v-text-field>
              <v-text-field
                label="descripcion"
                class="campos"
                v-model="Especialidad2.descripcion"
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
                      :src="Especialidad2.url"
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
  props: ["Especialidad2"],
  data() {
    return {
      step: 1,

      especialidad2: {
        nombre: "",
        codigo: "",
        estado: "",
        descripcion: "",
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
    async obtenerEspecialidad() {
      await axios
        .get("/Especialidad/Nombre/" + this.Especialidad2.nombre)
        .then((x) => {
          this.Especialidad2 = x.data;
          console.log(this.Especialidad2);
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
