<template>
  <v-app>
    <div class="main">
      <div class="container-left">
        <span class="span-title">ESPECIALIDADES<br /></span>
        <div class="scroll">
          <v-sheet v-if="cargaEspecialidades" class="v-sheet-color">
            <v-skeleton-loader
              class="loader"              
              type="article"
            ></v-skeleton-loader>            
            <v-skeleton-loader
              class="loader"              
              type="article"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="loader"              
              type="article"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="loader"              
              type="article"
            ></v-skeleton-loader>
          </v-sheet>
          <div
            v-for="especialidad in especialidades"
            :key="especialidad.id"
            v-else
          >
            <button @click="obtenerTurnos(especialidad, fecha_busqueda)">
              <CardEspecialidadHorizontal :especialidad="especialidad" />
            </button>
          </div>
        </div>
      </div>
      <div class="container-right">
        <div class="top-right">
          <span class="span-title">FECHA<br /></span>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="fecha_busqueda"
                prepend-icon="mdi-calendar"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
                class="text-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="es-es"
              v-model="fecha_busqueda"
              @input="obtenerTurnos(null, fecha_busqueda)"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="contenido-turnos" v-if="seleccionaEspecialidad">
          <div v-for="turno in turnos" :key="turno.id" class="card-turno">
            <CardTurno :turno="turno" :usuario="user" />
          </div>
        </div>
        <div class="no-turnos" v-else>
          <img class="img-no-turnos" :src="this.imgBusqueda" alt="Enfermeros" />
          <span class="span-no-turnos">
            {{ this.mensajeBusqueda }}
          </span>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import CardEspecialidadHorizontal from "../../components/GestionarCitas/CardEspecialidadHorizontal.vue";
import CardTurno from "@/components/GestionarCitas/CardTurno.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Especialidades",
  components: {
    CardEspecialidadHorizontal,
    CardTurno,
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data() {
    return {
      especialidades: [],
      selectEspecialidad: "",
      selectDate: "",
      cupos: [],
      turnos: [],
      medico: "",
      menu: false,
      fecha_busqueda: new Date().toISOString().substr(0, 10),
      seleccionaEspecialidad: false,
      mensajeBusqueda: "Selecciona una especialidad para iniciar la búsqueda",
      imgBusqueda: "https://i.ibb.co/7g07xW2/undraw-medical-care-movn.png",
      menu2: false,
      cargaEspecialidades: true,    
    };
  },
  async created() {
    this.obtenerEspecialidades();
    await this.fetchUser();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["fetchUser"]),
    async obtenerEspecialidades() {
      this.loadingEspecialidad = true;
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.especialidades = x.data;
          this.cargaEspecialidades = false
        })
        .catch((err) => console.log(err));
    },
    async obtenerTurnos(especialidad, fecha) {
      this.turnos = [];
      this.cupos = [];
      if (especialidad != null) {
        this.selectEspecialidad = especialidad.id;
      } else {
        this.menu2 = false;
      }

      if (this.selectEspecialidad.length > 0) {
        await axios
          .get(
            `/Turno/turnos?idEspecialidad=${this.selectEspecialidad}&fecha=${fecha}`
          )
          .then((x) => {
            for (var i = 0; i < x.data.length; i++) {
              for (var y = 0; y < x.data[i].cupos.length; y++) {
                var cupo = {
                  estado: x.data[i].cupos[y].estado,
                  hora_inicio: x.data[i].cupos[y].hora_inicio,
                };

                var hoy = new Date();
                var fechaCupo = new Date(cupo.hora_inicio);
                fechaCupo = fechaCupo.setHours(fechaCupo.getHours() + 5);

                if (cupo.estado == "disponible" && fechaCupo > hoy.getTime()) {
                  this.cupos.push(cupo);
                }
              }
              if (this.cupos.length > 0) {
                this.turnos.push(x.data[i]);
              }
            }

            if (this.turnos.length > 0) {
              this.seleccionaEspecialidad = true;
            } else {
              this.seleccionaEspecialidad = false;
              this.mensajeBusqueda =
                `No se encontraron turnos para ${especialidad.nombre} en el horario solicitado`;
              this.imgBusqueda =
                "https://i.ibb.co/54hPb64/undraw-No-data-re-kwbl.png";
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/main.scss";
.main {
  display: flex;
  margin-top: 3%;
  margin-left: 7%;
}
.span-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: $blue;
  margin-bottom: 1%;
}
.container-left {
  width: 25%;

  .scroll {
    height: 75vh;
    overflow-y: scroll;
  }
}
.container-right {
  width: 75%;
  margin-left: 0.5%;
  .contenido-turnos {
    //height: 75vh;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;

    .card-turno {
      margin-left: 2%;
      //width: 60%;
    }
  }
  .no-turnos {
    @include flex-center;
    flex-direction: column;
    .img-no-turnos {
      margin-top: 3%;
      width: 50%;
      height: 50%;
    }
    .span-no-turnos {
      font-size: 1.5rem;
      margin-top: 1%;
      color: $blue;
    }
  }
}
::-webkit-scrollbar {
  -webkit-appearance: none;
}

::-webkit-scrollbar:vertical {
  width: 10px;
}

::-webkit-scrollbar-button:increment,
::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar:horizontal {
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}
.text-calendar {
  font-size: 1em;
}
.loader {
  margin-top: 5%;  
}
.v-sheet-color {
  background: $sky-light;
}
</style>