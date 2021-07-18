<template>
  <div class="content" v-if="this.especialidad != {}">
    <div class="one">
      <img :src="this.especialidad.datos.url" alt="icono" class="img-w" />
    </div>
    <div class="two">
      <h3 class="two-left">{{ this.especialidad.datos.nombre }}</h3>
    </div>
    <div class="three">
      <h1>{{this.especialidad.cantidad}}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CardEspecialidadMasPedida",
  props: ["especialidad"],
  data: () => ({

 
  }),
  async created() {
   
  }, 
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 20px;
  display: flex;
  align-content: center;
  align-items: center;
  background: white;
  justify-content: space-around;
  padding: 1% 0;
  background: #A2DBFA ;
}
.img-w {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
.three {
  padding: 1% 0;
}
.two-left {
  align-self: left;
}
</style>