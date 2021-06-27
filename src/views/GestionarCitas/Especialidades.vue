<template>
  <div class="main">
    <div class="container-left">
      <span class="span-title">ESPECIALIDADES<br /></span>
      <div class="scroll">
        <div v-for="especialidad in especialidades" :key="especialidad.id">
          <button @click="obtenerTurnos(especialidad)">
            <CardEspecialidadHorizontal :especialidad="especialidad" />
          </button>
        </div>
      </div>
    </div>
    <div class="container-right">
      <div class="top-right">Fecha: hoy akdadjla</div>
      <div class="contenido-turnos">
        <div v-for="turno in turnos" :key="turno.id" class="card-turno">
          <CardTurno :turno="turno" :usuario="user" />
        </div>
      </div>
    </div>
  </div>
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
  data() {
    return {
      especialidades: [],
      selectEspecialidad: "",
      selectDate: "",
      cupos: [],
      turnos: [],
      medico: "",
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
        })
        .catch((err) => console.log(err));
    },
    async obtenerTurnos(especialidad) {
      this.turnos = [];
      this.cupos = [];
      this.selectEspecialidad = especialidad.id;
      console.log(this.selectEspecialidad);
      this.selectDate = new Date()
        .toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//gi, "-");
      await axios
        .get(
          `/Turno/turnos?idEspecialidad=${this.selectEspecialidad}&fecha=${this.selectDate}`
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
          console.log(this.cupos);
          console.log(this.turnos);
        })
        .catch((err) => console.log(err));
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
.container-left {
  width: 25%;

  .scroll {
    height: 75vh;
    overflow-y: scroll;
  }
  .span-title {
    //margin-left: 1%;
    font-size: 1.2rem;
    font-weight: bold;
    color: $blue;
    margin-bottom: 1%;
  }
}
.container-right {
  width: 75%;
  margin-left: 0.5%;
  .contenido-turnos {
    height: 75vh;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;

    .card-turno {
      margin-left: 2%;
      //width: 60%;
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
</style>