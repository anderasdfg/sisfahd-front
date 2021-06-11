<template>
  <div class="main">
    <p class="title">Inicia tu <b>reserva de cita </b>seleccionando una especialidad:</p>
    <div class="principal">
      <div v-for="lista in listaPro" :key="lista">
        <CardEspecialidad class="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CardEspecialidad from "@/components/Especialidades/CardEspecialidad.vue";
export default {
  components: {
    CardEspecialidad,
  },
  data() {
    return {
      listaPro: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";
.main {
  font-family: "Nunito", sans-serif;
  background-color: $sky-light;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  @include flex-center;
  flex-direction: column;
  .title {
    font-size: 35px;
  }
  .principal {
    @include flex-center;
    flex-direction: row;
    flex-wrap: wrap;    

    .item {
      margin: 10%;
    }
  }
}
</style>