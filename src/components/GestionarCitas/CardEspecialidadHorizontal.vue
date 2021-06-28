<template>
  <div class="content">
    <img :src="linkImg" alt="" />
    <span>{{ this.especialidad.nombre }}</span>
  </div>
</template>

<script>
export default {
  name: "CardEspecialidadHorizontal",
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
  display: flex;
  align-content: center;
  align-items: center;
  width: 300px;
  height: 130px;
  background-color: white;
  box-shadow: 0;
  margin: 1rem 0;
  span {
    padding-bottom: 5%;
    font-size: 1.1rem;
    font-weight: bold;
    
  }
  img {
    width: 30%;
  }
}
</style>