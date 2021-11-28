<template>
  <v-card elevation="3" outlined class="card" :search="search">
    <template v-if="showInfo">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <div class>
        <v-card-title class="titulo">Servicios Adicionales</v-card-title>
      </div>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-col cols="12" sm="6" md="4">
          <v-toolbar flat>
            <div>
              <button>
                <img src="https://i.ibb.co/8r082Dt/Carrito.png" alt="" />
              </button>

              <button>
                <img
                  src="https://i.ibb.co/kg9T712/miscompras.png"
                  alt="miscompras"
                />
              </button>
            </div>
          </v-toolbar>
        </v-col>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Laboratorios y examenes</v-card-title>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
               <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Laboratorio1</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
                 <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Laboratorio2</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
             
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
               <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Laboratorio3</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Medicamentos</v-card-title>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
               <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Medicamento1</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
               <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Medicamento2</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img
                :src="
                  this.datosusuario.foto
                    ? this.datosusuario.foto
                    : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                "
                max-width="250"
                max-height="250"
                class="ml-auto mr-auto ml-sm-3 mr-sm-0 mb-3"
              ></v-img>
               <v-col
                  cols="6"                  
                  class="text-center text-sm-start"
                >
                 <label class="font-weight-medium label-title">Medicamento3</label>
              <v-btn color="info" dark>Agregar al carrito</v-btn>
                </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ComprarServicios",
  components: {},
  data() {
    return {
      search: "",
      datosusuario: {},

      showInfo: false,
    };
  },
  async created() {
    this.fetchUser();
  },
  methods: {
    ...mapActions(["fetchUser"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<style lang="scss" scoped>
.card-text {
  margin-top: -50px;
}
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  padding-bottom: 20px;
}

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
  color: $blue;
}
.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
.titulo {
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo {
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
</style>

