<template>
  <v-card class="content">
    <div class="tooltip">
      <img :src="this.especialidad.url" alt="" />
    </div>
    <span>{{ this.especialidad.nombre }}</span>
  </v-card>
</template>

<script>
export default {
  name: "CardEspecialidad",
  props: ["especialidad"],
  data() {
    return {      
      linkImg: "https://qullana.com.pe/wp-content/uploads/2020/08/esp02.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 1.2rem;
  background: $sky-blue;
  @include flex-center;
  flex-direction: column;
  //padding: 3%;
  span {
    padding-bottom: 5%;
    font-size: 1.1rem;
    font-weight: bold;
  }
  img {
    width: 60%;   
    padding: 5%;
  }
}
</style>