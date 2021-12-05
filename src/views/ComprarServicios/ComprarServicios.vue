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
          <v-data-table
        :headers="headers"
        :items="listaEnfermedades"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              item-text="codigo_cie"
              item-value="codigo_cie"
              v-model="codigo_cie"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="obtenerEnfermedades(codigo_cie)"
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  @click="abrirDialogo"
                >
                  <span>Registrar nueva enfermedad</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <div class="in-flex">
              <v-btn
                x-small
                color="info"
                dark
                @click="abrirDialogoDetalle(item.id)"
              >
                <v-icon left> info </v-icon>
              </v-btn>
            </div>
            <div class="in-flex">
              <v-btn
                x-small
                color="success"
                dark
                @click="abrirModificarDetalle(item.id)"
              >
                <v-icon left> mdi-file-eye </v-icon>
              </v-btn>
            </div>

            <div class="in-flex">
              <v-btn
                x-small
                color="error"
                dark
                @click="abrirEliminarDetalle(item.id)"
              >
                <v-icon left> mdi-close-outline </v-icon>
              </v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Medicamentos</v-card-title>
         <v-data-table
        :headers="headers"
        :items="listaEnfermedades"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              item-text="codigo_cie"
              item-value="codigo_cie"
              v-model="codigo_cie"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="obtenerEnfermedades(codigo_cie)"
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  @click="abrirDialogo"
                >
                  <span>Registrar nueva enfermedad</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <div class="in-flex">
              <v-btn
                x-small
                color="info"
                dark
                @click="abrirDialogoDetalle(item.id)"
              >
                <v-icon left> info </v-icon>
              </v-btn>
            </div>
            <div class="in-flex">
              <v-btn
                x-small
                color="success"
                dark
                @click="abrirModificarDetalle(item.id)"
              >
                <v-icon left> mdi-file-eye </v-icon>
              </v-btn>
            </div>

            <div class="in-flex">
              <v-btn
                x-small
                color="error"
                dark
                @click="abrirEliminarDetalle(item.id)"
              >
                <v-icon left> mdi-close-outline </v-icon>
              </v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
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

