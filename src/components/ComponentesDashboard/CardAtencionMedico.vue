<template>
  <div class="content">
    <div class="one">
      <img
        src="https://ma.com.pe/sites/default/files/noticias/que-obligaciones-tiene-el-medico-ocupacional-frente-al-covid-19.jpg"
        alt="icono"
        class="img-w"
      />
    </div>
    <div class="two">
      <h5>Cardiología</h5>
      <h3>Stefano García Luza</h3>
    </div>
    <div class="three">
     <v-progress-circular
      :rotate="360"
      :size="100"
      :width="20"
      :value="value"
      color="green"
    >
      3/4
    </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cardcito",
   //props: ["datos"],
   data: () => ({      
      value: 50,
  }),
};
</script>

<style lang="scss" scoped>
.content {  
  border-radius: 20px;  
  display: flex;  
  align-content: center;
  align-items: center;
  background: red;
  justify-content: space-around;  
}
.img-w {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
.three {
    padding: 1% 0
}
</style>