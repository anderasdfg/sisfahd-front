<template>
  <v-app>
    <div class="main">
      <div class="left">
        <p class="p-text-top">Bienvenidos al</p>
        <h1 class="h1-title">Hospital <br />Digital</h1>
        <button-reserva
          text="Reserva tu cita"
          onclick="location.href='#especialidad'"
        />
      </div>
      <div class="right">
        <img
          class="img-right"
          src="https://i.ibb.co/hCvzRNK/undraw-medicine-b1ol-1.png"
          alt=""
        />
        <v-btn class="boton-nav" outlined dark color="#4172F2" @click="logOut()"
          >Iniciar sesión</v-btn
        >
      </div>
      <div class="bottom">
        <h2 class="subtitle">Especialidades disponibles</h2>
        <div class="bottom-container">          
          <div class="items-especialidad" v-if="cargaEspecialidades">
            <v-skeleton-loader
              class="skeleton"
              height="300px"              
              type="list-item-avatar-three-line, actions"
            ></v-skeleton-loader>
            <v-skeleton-loader
            class="skeleton"
              height="300px"
              type="list-item-avatar-three-line, actions"
            ></v-skeleton-loader>
            <v-skeleton-loader
            class="skeleton"
              height="300px"
              type="list-item-avatar-three-line, actions"
            ></v-skeleton-loader>
          </div>
          <div class="items-especialidad" v-else>
            <div
              v-for="especialidad in itemsEspecialidad"
              :key="especialidad.id"
            >
              <button @click="buscarTurnos(especialidad)" class="item">
                <CardEspecialidad :especialidad="especialidad" />
              </button>             
            </div>
          </div>
          <a class="btn-vermas" href="#especialidad">
            Ver más <img src="https://i.ibb.co/JxVNCb9/more-1.png" alt="more" />
          </a>
        </div>
        <section class="content" id="especialidad">
          <div class="bottom-container scroll-content fadeRight">
            <div class="items-especialidad">
              <div v-for="item in especialidades" :key="item.id">
                <button @click="buscarTurnos(item)" class="item">
                  <CardEspecialidad :especialidad="item" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

import CardEspecialidad from "@/components/GestionarCitas/CardEspecialidad.vue";
import ButtonReserva from "../components/Elementos/ButtonReserva.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Principal",
  components: {
    CardEspecialidad,
    ButtonReserva,
  },
  data() {
    return {
      loadingEspecialidad: false,
      itemsEspecialidad: [],
      especialidades: [],
      selectEspecialidad: null,
      cargaEspecialidades: true,
    };
  },
  async created() {
    this.obtenerEspecialidades();
    this.obtenerTop3();
  },
  methods: {
    async obtenerTop3() {
      this.loadingEspecialidad = true;
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.itemsEspecialidad = x.data;
          this.loadingEspecialidad = false;
          this.itemsEspecialidad.splice(3);
          this.cargaEspecialidades = false;
        })
        .catch((err) => console.log(err));
    },
    async obtenerEspecialidades() {
      this.loadingEspecialidad = true;
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.especialidades = x.data;
          this.especialidades.splice(0, 3);
        })
        .catch((err) => console.log(err));
    },
    buscarTurnos(especialidad) {
      this.$router.push(`cupos/${especialidad.id}`);
    },
    ...mapActions(["logOut"]),
  },
};

window.addEventListener("scroll", function () {
  let elements = document.getElementsByClassName("scroll-content");
  let screenSize = window.innerHeight;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.getBoundingClientRect().top < screenSize) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  }
});
</script>

<style lang="scss">
@import "../styles/main.scss";
html {
  box-sizing: border-box;
}
.main {
  font-family: "Nunito", sans-serif;
  background-color: $sky-light;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  .left,
  .right {
    padding: 3% 5% 0 5%;
  }

  .left {
    padding-left: 8%;
    width: 40%;
    .p-text-top {
      font-size: 2.1em;
      font-weight: bold;
    }
    .h1-title {
      font-size: 4.5em;
      color: $blue;
    }
    .btn-main {
      color: white;
      background: $blue;
      height: 4rem;
      font-size: 1.5em;
      border-radius: 0.625rem;
      width: 60%;
      margin: 8% 0 0 0 !important;
    }
  }
  .right {
    width: 60%;
    display: flex;
    .img-right {
      width: 80%;
    }
    .boton-nav {
      align-self: flex-start;
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8%;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0 !important;
    .bottom-container {
      display: flex;
      flex-direction: row;
      .items-especialidad {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 85%;
        margin-bottom: 0;
        .item {
          margin: 2rem 9rem 2rem 2rem;
          width: 14rem;
        }
      }
      .btn-vermas {
        @include flex-center;
        font-weight: bold;
        font-size: 1.1em;
        img {
          width: 4rem;
          margin-left: 1rem;
        }
      }
    }
  }
}
.skeleton {
  margin-right: 10%;
  margin-top: 5%;
}
.content {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 1s;
}
.fadeRight {
  opacity: 0;
  transform: translate(10vh, 0vh);
  transition: all 1s;
}

.visible {
  opacity: 1;
  transform: translate(0, 0);
}
/*MediaQuery*/

@media (max-width: 700px) {
  html {
    overflow-y: visible;
  }
  .img-right {
    display: none;
  }
  .btn-main {
    width: 150% !important; //el important está para sobreescribir la herencia :c
  }
}
@media (max-width: 1400px) {
  .items-especialidad {
    width: 80% !important;
  }
  .item {
    width: 10rem !important;
    margin: 2rem 4rem 2rem 2rem !important;
  }
  .img-right {
    width: 70% !important;
  }
}
</style>
