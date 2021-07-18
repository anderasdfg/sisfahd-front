<template>
  <div class="content" v-bind:style="{ background: datos.color}">
    <div class="left">
      <img
        :src="datos.imagen"
        alt="icono"
        class="img-w"
      />
    </div>
    <div class="right">
      <h3>{{datos.titulo}}</h3>
      <h1>{{datos.cantidad}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cardcito",
   props: ["datos"],
   data: () => ({
   
  }),
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1%;
  border-radius: 20px;  
  display: flex;
  width: 250px;
  align-content: center;

}
.img-w {
  width: 80%;
}

</style>