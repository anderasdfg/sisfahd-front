<template>
  <v-card>
    <h1 class="title-card">{{this.titulo}}</h1>
    <v-alert
      v-if="lista.length == 0" 
      style="margin-top: 15px"
      text
      outlined
      border="left"
      color="deep-orange"
      width="97%"
      class="ml-3"
      icon="info"
    >
      No se ha registrado ninguna observación
    </v-alert>
    <template v-else>
    <v-card-text>
    <v-card
      style="margin-top:1%;margin-bottom:1%;padding-bottom:1%;background-color:#EAEAEA"
    >
      <v-card
        elevation="0"
        style="background-color:#EAEAEA"
        height="10"
      >
      </v-card>
      <v-card
        tile
        elevation="0"
        color="#FAFAFA"
        class="mt-5 ml-5 mr-5 md-5"
        height="80"
        v-for="item in lista"
        :key="item"
      >
        <v-row style="margin-left:10px;heigh:100%" align="center">
          <v-col align="left">
            <span>{{ item }}</span>
          </v-col>
        </v-row>
      </v-card>
      <v-card
        elevation="0"
        style="background-color:#EAEAEA"
        height="10"
      >
      </v-card>
    
    </v-card>
    </v-card-text>
    </template>
    <div class="centrar">
      <button class="btn-volver" block @click="cerrarDialogo()">Volver</button>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "Listar",
  props: ["titulo", "lista"],
  methods:{
    cerrarDialogo() {
      this.$emit("emit-close-dialog");
    },
  }
};
</script>
<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.btn-volver{
  margin-bottom: 5%;
  margin-left: 5%;
  margin-right: 6%;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 50%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
.centrar{
  text-align: center;
}
</style>