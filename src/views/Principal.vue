<template>
  <div class="main">
    <div class="left">
      <p class="p-text-top">Bienvenidos al</p>
      <h1 class="h1-title">Hospital <br />Digital</h1>
      <button class="btn-main">Reserva tu cita</button>
    </div>
    <div class="right">
      <img
        class="img-right"
        src="https://i.ibb.co/hCvzRNK/undraw-medicine-b1ol-1.png"
        alt=""
      />
    </div>
    <div class="bottom">
      <h2 class="subtitle">Especialidades más solicitadas</h2>
      <div class="bottom-container">
        <div class="items-especialidad">
          <div           
            v-for="especialidad in itemsEspecialidad"
            :key="especialidad.id"
          >
            <button @click="buscarTurnos(especialidad)" class="item">
              <CardEspecialidad :especialidad="especialidad" />
            </button>
            
          </div>
        </div>
        <button class="btn-vermas">
          Ver más <img src="https://i.ibb.co/JxVNCb9/more-1.png" alt="more" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import CardEspecialidad from "@/components/GestionarCitas/CardEspecialidad.vue";

export default {
  components: {
    CardEspecialidad,
  },
  data() {
    return {
      loadingEspecialidad: false,
      itemsEspecialidad: [],
      topEspecialidades: [],
      selectEspecialidad: null,
    };
  },
  async created() {
    this.obtenerEspecialidades();
  },
  methods: {
    async obtenerEspecialidades() {
      this.loadingEspecialidad = true;
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.itemsEspecialidad = x.data;
          this.loadingEspecialidad = false;
          this.itemsEspecialidad.splice(3);
        })
        .catch((err) => console.log(err));
    },
    buscarTurnos(especialidad) {            
      this.$router.push(`cupos/${especialidad.id}`)   
    }
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";
html {
  box-sizing: border-box;
  overflow-y: hidden;
}
.main {
  font-family: "Nunito", sans-serif;
  background-color: $sky-light;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

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
    .img-right {
      width: 80%;
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
