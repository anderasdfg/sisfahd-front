<template>
  <v-card>
    <template>
      <div class>
        <v-card-title class="titulo">Servicios Adicionales</v-card-title>
      </div>
      <v-toolbar flat>
        <v-col cols="12" sm="6" md="4">
          <v-toolbar flat>
            <div>
              <button>
                <img src="https://i.ibb.co/8r082Dt/Carrito.png" alt="" />
              </button>
            </div>
          </v-toolbar>
        </v-col>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Examenes</v-card-title>
          <v-data-table
            :headers="headers1"
            :items="listaExamenes"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                  item-text="des1"
                  item-value="des1"
                  v-model="des1"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                  @input="obtenerExamenes(des1)"
                ></v-text-field>
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
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Medicamentos</v-card-title>
          <v-data-table
            :headers="headers2"
            :items="listaGMedicamentos"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                  item-text="des2"
                  item-value="des2"
                  v-model="des2"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                  @input="obtenerMedicamento(des2)"
                ></v-text-field>
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
                    <v-icon right> info </v-icon>
                  </v-btn>
                </div>
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="success"
                    dark
                    @click="abrirModificarDetalle(item.id)"
                  >
                    <v-icon right> mdi-file-eye </v-icon>
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
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "ComprarServicios",
  components: {},
  data() {
    return {
      des1: "",
      des2: "",
      examen: {
        descripcion: "a",
        precio: 0,
        id_especialidad: "",
        duracion: "",
        recomendaciones_previas: "",
        recomendaciones_posteriores: "",
      },
      headers1: [
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Precio", value: "precio" },
        { text: "Duracion", value: "duracion" },

        { text: "", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "Descripcion",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Generico", value: "generico" },
        { text: "Precio", value: "precio" },

        { text: "", value: "actions", sortable: false },
      ],

      Medicinas: {},
    };
  },
  async created() {
    this.obtenerExamenes();
    this.obtenerMedicamento();
  },
  methods: {
    async obtenerExamenes(des1) {
      if (this.des1 == "" || this.des1 == null) {
        await axios
          .get("/Examenes/100Examnes")
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Examenes/nombre?nombre=" + this.des1.toUpperCase())
          .then((x) => {
            console.log(this.des1);
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      }
    },
    async obtenerMedicamento(des2) {
      if (this.des2 == "" || this.des2 == null) {
        await axios
          .get("/Medicinas/100Medicinas")
          .then((x) => {
            let lista = [];
            this.lista = x.data;            
            this.setListaMedicamento(this.lista);
             console.log(this.lista);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Medicinas/filter?descripcion=" + this.des2.toUpperCase())
          .then((x) => {
            console.log(this.des2);
            let lista = [];
            this.lista = x.data;
            this.setListaMedicamento(this.lista);
            console.log(this.lista);
          })
          .catch((err) => console.log(err));
      }
    },
    ...mapMutations(["setListaExamenes", "setListaMedicamento"]),
  },
  computed: {
    ...mapState(["listaExamenes", "listaGMedicamentos"]),
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
